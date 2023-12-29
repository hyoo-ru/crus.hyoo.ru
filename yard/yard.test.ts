namespace $ {
	$mol_test_mocks.push( $=> {
		class $hyoo_cras_yard extends $.$hyoo_cras_yard {
			
			static load( land_ref: string ) {
				return []
			}
			
			static async save( land_ref: string, units: readonly $hyoo_cras_unit[] ) {}
			
		}
		$.$hyoo_cras_yard = $hyoo_cras_yard
	} )
}
