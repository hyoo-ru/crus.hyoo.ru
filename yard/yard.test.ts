namespace $ {
	$mol_test_mocks.push( $=> {
		class $hyoo_crus_yard extends $.$hyoo_crus_yard {
			
			static load( land_ref: string ) {
				return []
			}
			
			static async save( land_ref: string, units: readonly $hyoo_crus_unit[] ) {}
			
		}
		$.$hyoo_crus_yard = $hyoo_crus_yard
	} )
}
