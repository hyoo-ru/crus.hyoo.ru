namespace $ {
	
	export class $hyoo_crus_realm extends $mol_object {
		
		lords = new $mol_wire_dict< typeof $hyoo_crus_ref.Value, $hyoo_crus_lord >()
		
		@ $mol_mem
		yard() {
			return this.$.$hyoo_crus_yard.make({
				realm: $mol_const( this ),
			})
		}
		
		home() {
			return this.Lord( this.$.$hyoo_crus_auth.current().lord() )
		}
		
		@ $mol_mem_key
		Lord( numb: typeof $hyoo_crus_ref.Value ) {
			
			let lord = this.lords.get( numb )
			if( lord ) return lord
			
			lord = $hyoo_crus_lord.make({
				realm: $mol_const( this ),
				ref: $mol_const( numb ),
			})
			
			this.lords.set( numb, lord )
			return lord
			
		}
		
		Land( ref: typeof $hyoo_crus_ref.Value ) {
			const lord = this.Lord( $hyoo_crus_ref_home( ref ) )
			return lord.Land( $hyoo_crus_ref_land( ref ) )
		}
		
		Node< Node extends typeof $hyoo_crus_node > ( ref: typeof $hyoo_crus_ref.Value, Node: Node ) {
			const land = this.Land( $hyoo_crus_ref_root( ref ) )
			return land.Node( Node ).Item( $hyoo_crus_ref_head( ref ) )
		}
		
		@ $mol_action
		apply_pack( pack: $hyoo_crus_pack ) {
			
			const { faces, units, rocks } = pack.parts()
			
			for( const land of Reflect.ownKeys( units ) as typeof $hyoo_crus_ref.Value[] ) {
				
				const errors = this.Land( land ).apply_unit( units[ land ] ).filter( Boolean )
				
				for( const error of errors ) this.$.$mol_log3_warn({
					place: `${this}.apply_pack()`,
					message: error,
					hint: 'Send it to developer',
				})
				
			}
			
			for( const [ hash, rock ] of rocks ) {
				if( !rock ) continue
				this.$.$hyoo_crus_mine.save( rock )
			}

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
