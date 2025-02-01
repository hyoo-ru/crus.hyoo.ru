namespace $ {
	
	export function $hyoo_crus_empire< Value extends typeof $hyoo_crus_node >( Value: Value ) {
		
		return class $hyoo_crus_empire extends $hyoo_crus_atom_link_to( $mol_const( $hyoo_crus_dict_to( Value ) ) ) {
			
			path( path: readonly $hyoo_crus_vary_type[], preset?: $hyoo_crus_rank_preset | $hyoo_crus_land ) {
				let current = this as $hyoo_crus_empire | null
				for( const key of path ) {
					current = current?.ensure( preset )?.dive( key, $hyoo_crus_empire, preset ) ?? null
				}
				return current?.cast( Value ) ?? null
			}
			
			keys( path: readonly $hyoo_crus_vary_type[] ) {
				let current = this.remote() as $hyoo_crus_dict | null
				for( const key of path ) {
					current = current?.dive( key, $hyoo_crus_empire )?.remote() ?? null
				}
				return current?.keys() ?? []
			}
			
			static toString() {
				return this === $hyoo_crus_empire ? '$hyoo_crus_empire<' + Value + '>' : super.toString()
			}
			
		}
		
	}
	
}
