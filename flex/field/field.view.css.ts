namespace $.$$ {
	
	$mol_style_define( $hyoo_crus_flex_field, {
		
		flex: {
			grow: 1,
			shrink: 1,
		},
		
		Ref_new: {
			Trigger: {
				justify: {
					content: 'center',
				},
			},
		},
		
		List: {
			flex: {
				wrap: 'wrap',
				shrink: 1,
			},
		},
		
		List_item_dump: {
			padding: $mol_gap.text,
		},
		
		$hyoo_crus_flex_form: {
			padding: $mol_gap.block,
			flex: {
				grow: 1,
			},
			background: {
				color: $mol_theme.card,
			},
		},
		
		List_item_add: {
			justify: {
				content: 'center',
			},
		},
		
	} )
	
}
