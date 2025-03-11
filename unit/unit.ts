namespace $ {
	
	/** Kind of Unit */
	export enum $hyoo_crus_unit_kind {
		
		/** Rights sharing. More power wins. */
		gift = $hyoo_crus_slot_kind.gift,
		
		/** Changeable data. Last writes wins. */
		sand = $hyoo_crus_slot_kind.sand,
		
	}
	
	export let $hyoo_crus_unit_trusted = new WeakSet< $hyoo_crus_unit >()
	
	/** Minimal independent stable part of information. Actually it's edge between nodes in graph model */
	export class $hyoo_crus_unit extends $mol_buffer {
		
		static size = 128 as const
				
		/**
		 * Compare Units on timeline ( right - left )
		 * Priority: time > peer > tick
		 */
		static compare(
			left: $hyoo_crus_unit,
			right: $hyoo_crus_unit,
		) {
			return ( right.time() - left.time() )
				|| $hyoo_crus_link_compare( left.pass().hash(), right.pass().hash() )
				|| ( right.tick() - left.tick() )
		}

		constructor(
			buffer = new ArrayBuffer( $hyoo_crus_unit.size ),
			byteOffset = 0,
			byteLength = buffer.byteLength,
		) {
			super( buffer, byteOffset, byteLength )
		}
		
		kind(): keyof typeof $hyoo_crus_unit_kind {
			
			const val = this.uint8( 0 )
			if( !val ) $mol_fail( new Error( `Empty unit` ) )
			if( ( val & 1 ) === 0 ) return 'sand'
			
			const kind = $hyoo_crus_unit_kind[ val ] as keyof typeof $hyoo_crus_unit_kind
			if( kind ) return kind
			
			$mol_fail( new Error( `Unknown unit kind (${val})` ) )
		}
		
		choose< Res >( ways: {
			gift: ( unit: $hyoo_crus_gift )=> Res,
			sand: ( unit: $hyoo_crus_sand )=> Res,
		} ) {
			const way = this.kind()
			const Unit = {
				gift: $hyoo_crus_gift,
				sand: $hyoo_crus_sand,
			}[ way ]
			if( this instanceof Unit ) return ways[ way ]( this as any )
			const unit = new Unit( this.buffer, this.byteOffset, this.byteLength ) as any
			return ways[ way ]( unit )
		}
		
		narrow() {
			return this.choose< $hyoo_crus_gift | $hyoo_crus_sand >({
				sand: unit => unit,
				gift: unit => unit,
			})
		}
		
		path(): string {
			return this.narrow().path()
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
		
		id18( offset: number, next?: $hyoo_crus_link ) {
			if( next === undefined ) {
				return $hyoo_crus_link.from_bin( new Uint8Array( this.buffer, this.byteOffset + offset, 18 ) )
			} else {
				const bin = next.toBin()
				if( bin.byteLength !== 18 ) $mol_fail( new Error( `Wrong Link size (${ next })` ) )
				this.asArray().set( bin, this.byteOffset + offset )
				return next
			}
		}
		
		/** Seconds from UNIX epoch */
		time( next?: number ) {
			return this.uint32( 4, next )
		}
		
		moment( next?: $mol_time_moment ) {
			if( next ) this.time( Math.floor( next.valueOf() / 1000 ) )
			return new $mol_time_moment( this.time() * 1000 )
		}
		
		tick( next?: number ) {
			return this.uint16( 2, next )
		}
		
		time_tick( next?: number ) {
			if( !next ) return this.tick() + this.time() * 2**16
			this.tick( next % 2**16 )
			this.time( Math.floor( next / 2**16 ) )
			return next
		}
		
		pass_link( next?: $hyoo_crus_link ) {
			return this.id6( 8, next )
		}
		
		_pass!: $hyoo_crus_auth_pass
		pass( next?: $hyoo_crus_auth_pass ) {
			if( next === undefined ) return this._pass
			this.pass_link( next.peer() )
			return this._pass = next
		}
		
		salt() {
			return new Uint8Array( this.buffer, this.byteOffset, 16 )
		}
		
		sens( next?: ArrayLike< number > ) {
			const prev = new Uint8Array( this.buffer, this.byteOffset, 64 )
			if( next ) prev.set( next )
			return prev
		}
		
		sign( next?: ArrayLike< number > ) {
			const prev = new Uint8Array( this.buffer, this.byteOffset + 64, 64 )
			if( next ) prev.set( next )
			return prev
		}
		
		signed() {
			return this.sign().some( b => b )
		}
		
		work() {
			
			if( !this.signed() ) {
				return $hyoo_crus_rank_rate.just
			}
			
			const sign = this.sign()
			let int = sign[0] | ( sign[1] << 8 )
			
			let count = 0
			while( int & 1 ) {
				int >>>= 1
				++ count
			}
			
			return count
		}
		
		rank_min() {
			return $hyoo_crus_rank_rule
		}
		
		_land = null as null | $hyoo_crus_land
		
		dump() {
			return {}
		}
		
	}
	
}
