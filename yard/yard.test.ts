namespace $ {
	
	$mol_test_mocks.push( $=> {
		class $hyoo_crus_yard_mock extends $.$hyoo_crus_yard {
			
			master() {
				return null
			}
			
		}
		$.$hyoo_crus_yard = $hyoo_crus_yard_mock
	} )
	
	$hyoo_crus_yard.masters = [
		`http://localhost:9090/`,
		$mol_dom_context.document.location.origin +'/',
	]
	
}
