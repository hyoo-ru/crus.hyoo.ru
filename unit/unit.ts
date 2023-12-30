namespace $ {
	
	export enum $hyoo_crus_unit_kind {
		/** Changable data. Last writes wins. */
		gist = 0b0000_0000,
		/** Public key. First writes wins. */
		pass = 0b1111_1111,
		/** Rights sharing. More power wins. */
		gift = 0b1111_1101,
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
			return ( $hyoo_crus_unit_kind[ this.uint8( 0 ) ] ?? 'gist' ) as keyof typeof $hyoo_crus_unit_kind
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
		
		narrow() {
			return this.choose< $hyoo_crus_unit >({
				gist: unit => unit,
				pass: unit => unit,
				gift: unit => unit,
			})
		}
		
		peer( next?: number ) {
			return this.uint48( 2, next )
		}
		
		salt() {
			return new Uint8Array( this.buffer, this.byteOffset + 2, 12 )
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
		
	}
	
}
