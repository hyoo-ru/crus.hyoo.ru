namespace $ {
	
	export enum $hyoo_cras_unit_kind {
		/** Changable data. Last writes wins. */
		gist = 0b0000_0000,
		/** Public key. First writes wins. */
		pass = 0b1111_1111,
		/** Rights sharing. More power wins. */
		gift = 0b1111_1101,
	}
	
	export class $hyoo_cras_unit extends $mol_buffer {
		
		static size = 128
				
		constructor(
			buffer = new ArrayBuffer( $hyoo_cras_unit.size ),
			byteOffset = 0,
			byteLength = buffer.byteLength,
		) {
			super( buffer, byteOffset, byteLength )
		}
		
		kind() {
			return ( $hyoo_cras_unit_kind[ this.uint8( 0 ) ] ?? 'gist' ) as keyof typeof $hyoo_cras_unit_kind
		}
		
		choose< Res >( ways: {
			pass: ( unit: $hyoo_cras_pass )=> Res,
			gift: ( unit: $hyoo_cras_gift )=> Res,
			gist: ( unit: $hyoo_cras_gist )=> Res,
		} ) {
			const way = this.kind()
			const Unit = {
				gist: $hyoo_cras_gist,
				pass: $hyoo_cras_pass,
				gift: $hyoo_cras_gift,
			}[ way ]
			return ways[ way ]( new Unit( this.buffer, this.byteOffset, this.byteLength ) as any )
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
		
	}
	
}
