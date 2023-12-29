namespace $ {
	
	export class $hyoo_crus_pass extends $hyoo_crus_unit {
		
		work() {
			return this.uint8( 1 )
		}
		
		lord( next?: bigint ) {
			if( next !== undefined ) {
				this.uint48( 2, Number( next & 0xFFFFFFFFFFFFn ) )
				this.uint48( 8, Number( next >> 48n ) )
			}
			return BigInt( this.uint48( 2 ) ) + ( BigInt( this.uint48( 8 ) ) << 48n )
		}
		
		auth( next?: ArrayLike< number > ) {
			const prev = new Uint8Array( this.buffer, this.byteOffset, 64 )
			if( next ) prev.set( next )
			return prev
		}
		
		[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {} ,
				$mol_dev_format_native( this ) ,
				' ',
				this.peer().toString(16),
				' 🔑 ',
				this.lord().toString(16) ,
			)
		}
		
	}
	

}
