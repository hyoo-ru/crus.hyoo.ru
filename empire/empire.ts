namespace $ {
	
	export function $hyoo_crus_empire< Value extends typeof $hyoo_crus_node >( Value: Value ) {
		
		return class Empire extends $hyoo_crus_atom_ref_to( $mol_const( $hyoo_crus_dict_to( Value ) ) ) {
			
			path( path: [ $hyoo_crus_vary_type, ... $hyoo_crus_vary_type[] ], preset?: $hyoo_crus_rank_preset ) {
				let current = this as Empire | null
				for( const key of path ) {
					current = current?.remote_ensure( preset )?.dive( key, Empire, preset ) ?? null
				}
				return current?.cast( Value ) ?? null
			}
			
			keys( path: [ $hyoo_crus_vary_type, ... $hyoo_crus_vary_type[] ] ) {
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
