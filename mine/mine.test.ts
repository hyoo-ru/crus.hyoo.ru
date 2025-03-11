namespace $ {
	$mol_test_mocks.push( $=> {
		class $hyoo_crus_mine_mock extends $.$hyoo_crus_mine {
			
			@ $mol_mem_key
			static ball( hash: $hyoo_crus_link, next?: Uint8Array ) {
				return next ?? null
			}
			
			@ $mol_mem
			units( next?: $hyoo_crus_unit[] ) {
				return next ?? []
			}
				
			async units_load() {
				return [] as $hyoo_crus_unit[]
			}
			
			async units_save( units: $hyoo_crus_unit[] ) {}
			
		}
		$.$hyoo_crus_mine = $hyoo_crus_mine_mock
	} )
}
