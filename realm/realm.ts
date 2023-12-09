namespace $ {
	
	export class $hyoo_crowds_realm extends $mol_object {
		
		lords = new $mol_wire_dict< bigint, $hyoo_crowds_lord >()
		
		home() {
			return this.Lord( this.$.$hyoo_crowds_auth.current().lord() )
		}
		
		@ $mol_mem_key
		Lord( numb: bigint ) {
			
//			this.$.$mol_wait_timeout(1000)
			
			let lord = this.lords.get( numb )
			if( lord ) return lord
			
			lord = $hyoo_crowds_lord.make({
				realm: $mol_const( this ),
				numb: $mol_const( numb ),
			})
			
			this.lords.set( numb, lord )
			return lord
			
		}
		
		Node< Node extends typeof $hyoo_crowds_node > ( Node: Node, ref: $hyoo_crowds_ref ) {
			return this.Lord( ref.lord() ).Land( ref.land() ).Node( Node ).Item( ref.head() )
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
		// 		this.$.$hyoo_crowds_auth.current().toString(),
		// 		key.toString(),
		// 	)
			
		// }
		
	}
	
}
