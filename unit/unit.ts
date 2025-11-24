namespace $ {
	
	/** Kind of Unit */
	export enum $hyoo_crus_unit_kind {
		
		/** Unit of data. */
		sand = $hyoo_crus_slot_kind.sand,
		
		/** Rights/Keys sharing. */
		gift = $hyoo_crus_slot_kind.gift,
		
		/** Sign for hash list. */
		seal = $hyoo_crus_slot_kind.seal,
		
		/** Public key. */
		pass = $hyoo_crus_slot_kind.pass,
		
	}
	
	export let $hyoo_crus_unit_trusted = new WeakSet< $hyoo_crus_unit_base >()
	
	export function $hyoo_crus_unit_trusted_grant( unit: $hyoo_crus_unit ) {
		if( unit instanceof $hyoo_crus_auth_pass ) return
		$hyoo_crus_unit_trusted.add( unit )
	}
	
	export function $hyoo_crus_unit_trusted_check( unit: $hyoo_crus_unit ) {
		if( unit instanceof $hyoo_crus_auth_pass ) return true
		return $hyoo_crus_unit_trusted.has( unit )
	}
	
	export type $hyoo_crus_unit = $hyoo_crus_unit_base | $hyoo_crus_auth_pass
	
	/** Order units: lord / seal / gift / sand */
	export function $hyoo_crus_unit_sort( units: readonly $hyoo_crus_unit[] ) {
		
		const nodes = new Map< string, $hyoo_crus_unit >()
		const graph = new $mol_graph< string, number >()
		
		for( const unit of units ) {
			
			const self = unit.hash().str
			nodes.set( self, unit )
			
			if( unit instanceof $hyoo_crus_auth_pass ) continue
			
			unit.choose({
				gift: gift => {
					graph.link( self, unit.lord().str, 1 )
					graph.link( self, '', 1 )
					graph.link( gift.mate().str, self, 1 )
				},
				sand: sand => {
					graph.link( self, unit.lord().str, 1 )
					graph.link( self, '', 1 )
				},
				seal: seal => {
					graph.link( self, unit.lord().str, 0 )
					graph.link( self, '', 0 )
					for( const hash of seal.hash_list() ) {
						graph.link( hash.str, self, 1 )
					}
				}
			})
			
		}
		
		graph.acyclic( e => e )
		
		return [ ... graph.sorted ].map( key => nodes.get( key )! ).filter( Boolean )

	}
	
	/** Minimal independent stable part of information. */
	export class $hyoo_crus_unit_base extends $mol_buffer {
		
		/**
		 * Compare Seals on timeline ( right - left )
		 * Priority: time > lord > tick
		 */
		static compare(
			left: $hyoo_crus_unit_base | undefined,
			right: $hyoo_crus_unit_base | undefined,
		) {
			
			if( !left && !right ) return 0
			if( !left ) return +1
			if( !right ) return -1
			
			return ( right.time() - left.time() )
				|| $hyoo_crus_link_compare( left.lord(), right.lord() )
				|| ( right.tick() - left.tick() )
			
		}
		
		static narrow( buf: ArrayBuffer ) {
			const kind = $hyoo_crus_unit_kind[ new $mol_buffer( buf ).uint8( 0 ) ] as keyof typeof $hyoo_crus_unit_kind
			const Type = {
				sand: $hyoo_crus_unit_sand,
				gift: $hyoo_crus_unit_gift,
				seal: $hyoo_crus_unit_seal,
				pass: $hyoo_crus_auth_pass,
			}[ kind ]
			return new Type( buf )
		}

		constructor(
			buffer: ArrayBuffer,
			byteOffset = 0,
			byteLength = buffer.byteLength,
		) {
			super( buffer, byteOffset, byteLength )
		}
		
		kind( next?: keyof typeof $hyoo_crus_unit_kind ): Exclude< keyof typeof $hyoo_crus_unit_kind, 'pass' > {
			
			const val = this.uint8( 0, next && $hyoo_crus_unit_kind[ next ] )
			
			const kind = $hyoo_crus_unit_kind[ val ] as Exclude< keyof typeof $hyoo_crus_unit_kind, 'pass' >
			if( kind ) return kind
			
			$mol_fail( new Error( `Unknown unit kind (${val})` ) )
		}
		
		choose< Res >( ways: {
			gift: ( unit: $hyoo_crus_unit_gift )=> Res,
			sand: ( unit: $hyoo_crus_unit_sand )=> Res,
			seal: ( unit: $hyoo_crus_unit_seal )=> Res,
		} ) {
			return ways[ this.kind() ]( this as any )
		}
		
		path(): string {
			throw new Error( 'Unimplemented' )
		}
		
		id6( offset: number, next?: $hyoo_crus_link ) {
			if( next === undefined ) {
				return $hyoo_crus_link.from_bin( new Uint8Array( this.buffer, this.byteOffset + offset, 6 ) )
			} else {
				const bin = next.toBin()
				if( bin.byteLength !== 6 ) $mol_fail( new Error( `Wrong Link size (${ next })` ) )
				this.asArray().set( bin, this.byteOffset + offset )
				return next
			}
		}
		
		id12( offset: number, next?: $hyoo_crus_link ) {
			if( next === undefined ) {
				return $hyoo_crus_link.from_bin( new Uint8Array( this.buffer, this.byteOffset + offset, 12 ) )
			} else {
				const bin = next.toBin()
				if( bin.byteLength !== 12 ) $mol_fail( new Error( `Wrong Link size (${ next })` ) )
				this.asArray().set( bin, this.byteOffset + offset )
				return next
			}
		}
		
		/** Seconds from UNIX epoch */
		time( next?: number ) {
			return this.uint32( 4, next )
		}
		
		moment() {
			return new $mol_time_moment( Number( this.time() * 1000 ) )
		}
		
		/** Step in transaction */
		tick( next?: number ) {
			return this.uint16( 2, next )
		}
		
		/** Monotonic Real+Logic Time */
		time_tick( next?: number ) {
			if( !next ) return this.tick() + this.time() * 2**16
			this.tick( next % 2**16 )
			this.time( Math.floor( next / 2**16 ) )
			return next
		}
		
		_lord = null as $hyoo_crus_link | null
		lord( next?: $hyoo_crus_link ) {
			if( next ) return this._lord = this.id12( 8, next )
			return this._lord ?? ( this._lord = this.id12( 8 ) )
		}
		
		/** Unique number for encryption */
		salt() {
			return new Uint8Array( this.buffer, this.byteOffset + 2, 16 ) /* tick(2), time(4), lord(10) */
		}
		
		hash() {
			return $hyoo_crus_link.hash_bin( this.asArray() )
		}
		
		tier_min() {
			return $hyoo_crus_rank_tier.rule
		}
		
		_land = null as null | $hyoo_crus_land
		
		dump() {
			return {}
		}
		
	}
	
}
