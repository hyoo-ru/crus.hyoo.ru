namespace $ {
	
	const masters = $mol_state_arg.value( 'masters' )?.split( ',' ) ?? []
	$hyoo_crus_yard.masters = masters.map( host => 'http://' + host )
	
	$hyoo_crus_app.serve()

}
