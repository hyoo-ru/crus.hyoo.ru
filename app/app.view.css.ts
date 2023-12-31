namespace $.$$ {
	
	const { url, hsla, linear_gradient } = $mol_style_func
	
	$mol_style_define( $hyoo_crus_app, {
		
		Casting: {
			flex: {
				grow: 1,
			},
		},
		
		background: {
			image: [
				[ linear_gradient([ 'to right', [ hsla( 0, 0, 0, 1 ), hsla( 0, 0, 0, .5 ) ] ]) ],
				[ url( 'https://i.imgur.com/oPsM5Ye.jpeg' ) ],
			],
			size: [ 'cover' ],
		},
		
	} )
	
}
