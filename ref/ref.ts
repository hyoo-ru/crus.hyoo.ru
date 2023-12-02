namespace $ {
	
	/** Reference to node that identified by Lord+Numb+Head. */
	export class $hyoo_crowds_ref extends $mol_buffer {
		
		static size = 8 + 4 + 6
		
		static make< This extends typeof $hyoo_crowds_ref >(
			this: This,
			lord = 0n /*8B*/,
			numb = 0 /*4B*/,
			head = 0 /*6B*/,
		) {
			const ref = this.from( new Uint8Array( this.size ) )
			ref.lord( lord )
			ref.numb( numb )
			ref.head( head )
			return ref
		}
		
		lord( next?: bigint ) { return this.uint64( 0, next ) }
		numb( next?: number ) { return this.byteLength >= 12 ? this.uint32( 8, next ) : 0 }
		head( next?: number ) { return this.byteLength >= 18 ? this.uint48( 12, next ) : 0 }
		
		toString() {
			// return (
			// 	$mol_base64_ae_encode( new Uint8Array( this.buffer, 0, 8 ) ).replace( /A+$/, '' )
			// 	+ '_' + $mol_base64_ae_encode( new Uint8Array( this.buffer, 8, 4 ) ).replace( /A+$/, '' )
			// 	+ '_' + $mol_base64_ae_encode( new Uint8Array( this.buffer, 12, 6 ) ).replace( /A+$/, '' )
			// ).replace( /_+$/, '' )
			return $mol_base64_ae_encode( this.asArray() ).replace( /A+$/, '' )
			// return `${ this.lord().toString(36) }_${ this.numb().toString(36) }_${ this.head().toString(36) }`
		}
		
		toJSON() {
			return this.toString()
		}
		
		[Symbol.toPrimitive]() {
			return this.toString()
		}
		
		;[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {} ,
				$mol_dev_format_native( this ) ,
				' ',
				this.toString(),
			)
		}
		
	}
	
}
