namespace $ {
	
	export class $hyoo_crowds_realm extends $mol_object {
		
		land = new $mol_wire_dict< bigint /*lord*/, $hyoo_crowds_land >()
		
		home() {
			return this.Land( this.$.$hyoo_crowds_auth.current().lord() )
		}
		
		@ $mol_mem_key
		Land( lord: bigint ) {
			
			let land = this.land.get( lord )
			if( land ) return land
			
			land = $hyoo_crowds_land.make({
				realm: $mol_const( this ),
				lord: $mol_const( lord ),
			})
			
			this.land.set( lord, land )
			return land
			
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
