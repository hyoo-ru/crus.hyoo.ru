namespace $ {
	
	export class $hyoo_crowds_pass extends $hyoo_crowds_unit {
		
		work() {
			return this.uint8( 1 )
		}
		
		lord( next?: bigint ) {
			return this.uint64( 8, next )
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
