namespace $ {
	$mol_test_mocks.push( $=> {
		class $hyoo_crus_yard extends $.$hyoo_crus_yard {
			
			static load( land: $hyoo_crus_land ) {
				return []
			}
			
			static async save( land: $hyoo_crus_land, units: readonly $hyoo_crus_unit[] ) {}
			
		}
		$.$hyoo_crus_yard = $hyoo_crus_yard
	} )
}
