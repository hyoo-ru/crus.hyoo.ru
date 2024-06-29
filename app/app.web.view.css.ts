namespace $.$$ {
	
	const { url } = $mol_style_func
	
	$mol_style_define( $hyoo_crus_app, {
		
		background: {
			image: [[ url( 'hyoo/crus/logo/bg.webp' ) ]],
			size: [ 'cover' ],
			position: 'top',
		},
		
		Menu: {
			flex: {
				basis: `8rem`,
			},
		},
		
		Info: {
			margin: [ 0, 'auto' ],
			flex: {
				basis: `60rem`,
			},
		},
		
		Casting: {
			flex: {
				grow: 1,
			},
		},
		
	} )
	
}
