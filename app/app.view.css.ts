namespace $.$$ {
	
	const { url, hsla, linear_gradient } = $mol_style_func
	
	$mol_style_define( $hyoo_crus_app, {
		
		background: {
			image: [
				// [ linear_gradient([ 'to right', [ hsla( 0, 0, 0, 1 ), hsla( 0, 0, 0, 1 ), hsla( 0, 0, 0, .5 ) ] ]) ],
				[ url( 'hyoo/crus/logo/bg.webp' ) ],
			],
			size: [ 'cover' ],
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
