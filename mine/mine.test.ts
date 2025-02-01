namespace $ {
	$mol_test_mocks.push( $=> {
		class $hyoo_crus_mine_mock extends $.$hyoo_crus_mine {
			
			@ $mol_mem_key
			static rock( hash: $hyoo_crus_link, next?: Uint8Array ) {
				return next ?? null
			}
			
			@ $mol_mem_key
			static units( land: $hyoo_crus_link, next?: readonly $hyoo_crus_unit[] ) { $hyoo_crus_land
				return next ?? []
			}
				
			static async units_load( land: $hyoo_crus_link ) {
				return []
			}
			
			static async units_save( land: $hyoo_crus_link, units: readonly $hyoo_crus_unit[] ) {}
			
		}
		$.$hyoo_crus_mine = $hyoo_crus_mine_mock
	} )
}
