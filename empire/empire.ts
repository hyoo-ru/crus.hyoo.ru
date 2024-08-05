namespace $ {
	
	export function $hyoo_crus_empire< Value extends typeof $hyoo_crus_node >( Value: Value ) {
		
		return class Empire extends $hyoo_crus_atom_ref_to( $mol_const( $hyoo_crus_dict_to( Value ) ) ) {
			
			path( path: readonly $hyoo_crus_vary_type[], preset?: $hyoo_crus_rank_preset | $hyoo_crus_land ) {
				let current = this as Empire | null
				for( const key of path ) {
					current = current?.ensure( preset )?.dive( key, Empire, preset ) ?? null
				}
				return current?.cast( Value ) ?? null
			}
			
			keys( path: readonly $hyoo_crus_vary_type[] ) {
				let current = this.remote() as $hyoo_crus_dict | null
				for( const key of path ) {
					current = current?.dive( key, Empire )?.remote() ?? null
				}
				return current?.keys() ?? []
			}
			
			static toString() {
				return '$hyoo_crus_empire<' + Value + '>'
			}

		}
		
	}
	
}
