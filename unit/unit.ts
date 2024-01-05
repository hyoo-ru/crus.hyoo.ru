namespace $ {
	
	export enum $hyoo_crus_unit_kind {
		
		/** Public key. First writes wins. */
		pass = $hyoo_crus_part.pass,
		
		/** Rights sharing. More power wins. */
		gift = $hyoo_crus_part.gift,
		
		/** Changable data. Last writes wins. */
		gist = $hyoo_crus_part.gist,
		
	}
	
	export class $hyoo_crus_unit extends $mol_buffer {
		
		static size = 128
				
		constructor(
			buffer = new ArrayBuffer( $hyoo_crus_unit.size ),
			byteOffset = 0,
			byteLength = buffer.byteLength,
		) {
			super( buffer, byteOffset, byteLength )
		}
		
		kind() {
			
			const val = this.uint8( 0 )
			if( ( val & 1 ) === 0 ) return 'gist'
			
			const kind = $hyoo_crus_unit_kind[ val ] as keyof typeof $hyoo_crus_unit_kind
			if( kind ) return kind
			
			$mol_fail( new Error( `Unknown unit kind (${val})` ) )
		}
		
		choose< Res >( ways: {
			pass: ( unit: $hyoo_crus_pass )=> Res,
			gift: ( unit: $hyoo_crus_gift )=> Res,
			gist: ( unit: $hyoo_crus_gist )=> Res,
		} ) {
			const way = this.kind()
			const Unit = {
				gist: $hyoo_crus_gist,
				pass: $hyoo_crus_pass,
				gift: $hyoo_crus_gift,
			}[ way ]
			if( this instanceof Unit ) return ways[ way ]( this as any )
			const unit = new Unit( this.buffer, this.byteOffset, this.byteLength ) as any
			return ways[ way ]( unit )
		}
		
		narrow(): $hyoo_crus_unit {
			return this.choose< $hyoo_crus_unit >({
				gist: unit => unit,
				pass: unit => unit,
				gift: unit => unit,
			})
		}
		
		id6( offset: number, next?: string ) {
			if( next === undefined ) {
				const str = $mol_base64_ae_encode( new Uint8Array( this.buffer, offset, 6 ) )
				return str === 'AAAAAAAA' ? '' : str
			} else {
				this.asArray().set( $mol_base64_ae_decode( next || 'AAAAAAAA' ), offset )
				return next
			}
		}
		
		id12( offset: number, next?: string ) {
			if( next === undefined ) {
				const str = $mol_base64_ae_encode( new Uint8Array( this.buffer, offset, 12 ) )
				return str === 'AAAAAAAAAAAAAAAA' ? '' : str
			} else {
				this.asArray().set( $mol_base64_ae_decode( next || 'AAAAAAAAAAAAAAAA' ), offset )
				return next
			}
		}
		
		_peer!: string
		peer( next?: string ) {
			if( next === undefined && this._peer !== undefined ) return this._peer
			else return this._peer = this.id6( 2, next )
		}
		
		salt() {
			return new Uint8Array( this.buffer, this.byteOffset + 2, 12 )
		}
		
		sens( next?: ArrayLike< number > ) {
			const prev = new Uint8Array( this.buffer, this.byteOffset, 64 )
			if( next ) prev.set( next )
			return prev
		}
		
		mix( mixin: Uint8Array ) {
			for( let i = 0; i < mixin.length; ++i ) {
				this.uint8( 14 + i, this.uint8( 14 + i ) ^ mixin[i] )
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
		
	}
	
}
