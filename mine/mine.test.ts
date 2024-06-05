namespace $ {
	$mol_test_mocks.push( $=> {
		class $hyoo_crus_mine_mock extends $.$hyoo_crus_mine {
			
			@ $mol_mem_key
			static rock( hash: Uint8Array, next?: Uint8Array ) {
				return next ?? null
			}
			
			@ $mol_mem_key
			static units( land: $hyoo_crus_land, next?: readonly $hyoo_crus_unit[] ) {
				return next ?? []
			}
				
			static async units_load( land: $hyoo_crus_land ) {
				return []
			}
			
			static async units_save( land: $hyoo_crus_land, units: readonly $hyoo_crus_unit[] ) {}
			
		}
		$.$hyoo_crus_mine = $hyoo_crus_mine_mock
	} )
}
