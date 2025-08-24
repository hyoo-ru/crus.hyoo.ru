namespace $ {
	
	/** Kind of Unit */
	export enum $hyoo_crus_unit_kind {
		
		/** Public key. First writes wins. */
		pass = $hyoo_crus_part.pass,
		
		/** Rights sharing. More power wins. */
		gift = $hyoo_crus_part.gift,
		
		/** Changeable data. Last writes wins. */
		sand = $hyoo_crus_part.sand,
		
	}
	
	export let $hyoo_crus_unit_trusted = new WeakSet< $hyoo_crus_unit >()
	
	/** Minimal independent stable part of information. Actually it's edge between nodes in graph model */
	export class $hyoo_crus_unit extends $mol_buffer {
		
		static size = 128 as const
				
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
			pass: ( unit: $hyoo_crus_pass )=> Res,
			gift: ( unit: $hyoo_crus_gift )=> Res,
			sand: ( unit: $hyoo_crus_sand )=> Res,
		} ) {
			const way = this.kind()
			const Unit = {
				pass: $hyoo_crus_pass,
				gift: $hyoo_crus_gift,
				sand: $hyoo_crus_sand,
			}[ way ]
			if( this instanceof Unit ) return ways[ way ]( this as any )
			const unit = new Unit( this.buffer, this.byteOffset, this.byteLength ) as any
			return ways[ way ]( unit )
		}
		
		narrow() {
			return this.choose< $hyoo_crus_pass | $hyoo_crus_gift | $hyoo_crus_sand >({
				sand: unit => unit,
				pass: unit => unit,
				gift: unit => unit,
			})
		}
		
		key(): string {
			return this.narrow().key()
		}
		
		id6( offset: number, next?: string ) {
			if( next === undefined ) {
				const str = $mol_base64_ae_encode( new Uint8Array( this.buffer, this.byteOffset + offset, 6 ) )
				return str === 'AAAAAAAA' ? '' : str
			} else {
				this.asArray().set( $mol_base64_ae_decode( next || 'AAAAAAAA' ), this.byteOffset + offset )
				return next
			}
		}
		
		id12( offset: number, next?: $hyoo_crus_ref ) {
			if( next === undefined ) {
				return $hyoo_crus_ref_decode( new Uint8Array( this.buffer, this.byteOffset + offset, 12 ) )
			} else {
				this.asArray().set( $hyoo_crus_ref_encode( next ), this.byteOffset + offset )
				return next
			}
		}
		
		_peer!: string
		peer( next?: string ) {
			if( next === undefined && this._peer !== undefined ) return this._peer
			else return this._peer = this.id6( 2, next )
		}
		
		salt() {
			return new Uint8Array( this.buffer, this.byteOffset + 2, 16 )
		}
		
		sens( next?: ArrayLike< number > ) {
			const prev = new Uint8Array( this.buffer, this.byteOffset, 64 )
			if( next ) prev.set( next )
			return prev
		}
		
		mix( mixin: Uint8Array< ArrayBuffer > ) {
			for( let i = 0; i < mixin.length; ++i ) {
				this.uint8( 2 + i, this.uint8( 2 + i ) ^ mixin[i] )
			}
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
