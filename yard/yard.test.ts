namespace $ {
	
	$mol_test_mocks.push( $=> {
		class $hyoo_crus_yard extends $.$hyoo_crus_yard {
			
			load( land: $hyoo_crus_land ) {
				return []
			}
			
			async save( land: $hyoo_crus_land, units: readonly $hyoo_crus_unit[] ) {}
			
			ports() { 
				return []
			}
			
		}
		$.$hyoo_crus_yard = $hyoo_crus_yard
	} )
	
	$hyoo_crus_yard.masters = [
		`http://localhost:9090/`,
		$mol_dom_context.document.location.origin,
	]
	
}
