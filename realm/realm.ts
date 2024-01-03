namespace $ {
	
	export class $hyoo_crus_realm extends $mol_object {
		
		lords = new $mol_wire_dict< symbol, $hyoo_crus_lord >()
		
		home() {
			return this.Lord( this.$.$hyoo_crus_auth.current().lord() )
		}
		
		@ $mol_mem_key
		Lord( numb: symbol ) {
			
			let lord = this.lords.get( numb )
			if( lord ) return lord
			
			lord = $hyoo_crus_lord.make({
				realm: $mol_const( this ),
				ref: $mol_const( numb ),
			})
			
			this.lords.set( numb, lord )
			return lord
			
		}
		
		Land( ref: symbol ) {
			const lord = this.Lord( Symbol.for( ref.description!.slice( 0, 16 ) ) )
			return lord.Land( ref.description!.slice( 16, 24 ) )
		}
		
		Node< Node extends typeof $hyoo_crus_node > ( ref: symbol, Node: Node ) {
			const land = this.Land( Symbol.for( ref.description!.slice( 0, 24 ) ) )
			return land.Node( Node ).Item( ref.description!.slice( 24, 32 ) )
		}
		
		// @ $mol_mem_key
		// key_public( lord: bigint ) {
		// 	const key = this.Land( lord ).Area( 0 ).pass.get( Number( lord >> 16n ) )?.auth()
		// 	return key ? $mol_crypto_key_public.from( key ) : null
		// }
		
		// @ $mol_mem_key
		// secret_mutual( dest: bigint ) {
			
		// 	const key = this.key_public( dest )
		// 	if( !key ) return null
			
		// 	return $mol_wire_sync( $mol_crypto_secret ).derive(
		// 		this.$.$hyoo_crus_auth.current().toString(),
		// 		key.toString(),
		// 	)
			
		// }
		
	}
	
}
