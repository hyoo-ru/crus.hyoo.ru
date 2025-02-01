namespace $.$$ {
	
	$mol_style_define( $hyoo_crus_flex_field, {
		
		flex: {
			grow: 1,
			shrink: 1,
		},
		
		Link_new: {
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
			// padding: $mol_gap.text,
		},
		
		List_drop:{
			'[mol_drop_status]': {
				drag: {
					box: {
						shadow: [[ `inset`, `-1px`, 0, 0, 0, $mol_theme.focus ]],
					},
				},
			},
		},
		
		List_item_drop:{
			'[mol_drop_status]': {
				drag: {
					box: {
						shadow: [[ `inset`, `1px`, 0, 0, 0, $mol_theme.focus ]],
					},
				},
			},
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
