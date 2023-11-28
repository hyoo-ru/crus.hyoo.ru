namespace $.$$ {
	
	$mol_style_define( $hyoo_crowds_node_dump, {
		
		font: {
			family: 'monospace',
		},
		
		Node_inner: {
			Trigger: {
				align: {
					items: 'flex-start',
				}
			},
		},
		
		Head: {
			color: $mol_theme.control,
		},
		
		Unit_time: {
			color: $mol_theme.special,
		},
		
		Unit_tip: {
			color: $mol_theme.shade,
		},
		
		Unit_tag: {
			color: $mol_theme.shade,
		},
		
		Unit_value: {
			// padding: $mol_gap.text,
			align: {
				self: 'flex-start',
			},
			color: $mol_theme.text,
			background: {
				color: $mol_theme.card,
			},
		},
		
		// Value: {
		// 	color: $mol_theme.text,
		// },
		
		Content: {
			padding: {
				left: `2ch`,
			},
		},
		
	} )
	
}
