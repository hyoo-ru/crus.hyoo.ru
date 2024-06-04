namespace $ {
	
	$mol_test_mocks.push( $=> {
		class $hyoo_crus_yard extends $.$hyoo_crus_yard {
			
			ports() { 
				return []
			}
			
		}
		$.$hyoo_crus_yard = $hyoo_crus_yard
	} )
	
	$hyoo_crus_yard.masters = [
		`http://localhost:9090/`,
		$mol_dom_context.document.location.origin +'/',
	]
	
}
