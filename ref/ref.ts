// namespace $ {
	
// 	/** Reference to node that identified by Lord+Numb+Head. */
// 	export class $hyoo_crus_ref extends $mol_buffer {
		
// 		static size = 12 + 6 + 6
		
// 		static make< This extends typeof $hyoo_crus_ref >(
// 			this: This,
// 			lord = 0n /*12B*/,
// 			land = 0 /*6B*/,
// 			head = 0 /*6B*/,
// 		) {
// 			const ref = this.from( new Uint8Array( this.size ) )
// 			ref.lord( lord )
// 			ref.land( land )
// 			ref.head( head )
// 			return ref
// 		}
		
// 		lord( next?: bigint ) {
// 			if( next !== undefined ) {
// 				this.uint64( 0, next & 0xFFFFFFFFFFFFFFFFn )
// 				this.uint32( 8, Number( next >> 64n ) )
// 			}
// 			return this.uint64( 0 ) + ( BigInt( this.uint32( 8 ) ) << 64n )
// 		}
// 		land( next?: number ) { return this.byteLength >= 18 ? this.uint48( 12, next ) : 0 }
// 		head( next?: number ) { return this.byteLength >= 24 ? this.uint48( 18, next ) : 0 }
		
// 		toString() {
// 			// return (
// 			// 	$mol_base64_ae_encode( new Uint8Array( this.buffer, 0, 8 ) ).replace( /A+$/, '' )
// 			// 	+ '_' + $mol_base64_ae_encode( new Uint8Array( this.buffer, 8, 4 ) ).replace( /A+$/, '' )
// 			// 	+ '_' + $mol_base64_ae_encode( new Uint8Array( this.buffer, 12, 6 ) ).replace( /A+$/, '' )
// 			// ).replace( /_+$/, '' )
// 			return $mol_base64_ae_encode( this.asArray() ).replace( /(AAAAAAAA)+$/, '' )
// 			// return `${ this.lord().toString(36) }_${ this.numb().toString(36) }_${ this.head().toString(36) }`
// 		}
		
// 		toJSON() {
// 			return this.toString()
// 		}
		
// 		[Symbol.toPrimitive]() {
// 			return this.toString()
// 		}
		
// 		;[ $mol_dev_format_head ]() {
// 			return $mol_dev_format_span( {} ,
// 				$mol_dev_format_native( this ) ,
// 				' ',
// 				this.toString(),
// 			)
// 		}
		
// 	}
	
// }
