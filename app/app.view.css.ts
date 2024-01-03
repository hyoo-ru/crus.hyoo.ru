namespace $.$$ {
	
	const { url } = $mol_style_func
	
	$mol_style_define( $hyoo_crus_app, {
		
		background: {
			image: [[ url( 'hyoo/crus/logo/bg.webp' ) ]],
			size: [ 'cover' ],
			position: 'bottom',
		},
		
		Menu: {
			flex: {
				basis: `8rem`,
			},
		},
		
		Intro: {
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
