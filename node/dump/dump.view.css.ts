namespace $.$$ {
	
	$mol_style_define( $hyoo_crowds_node_dump, {
		
		font: {
			family: 'monospace',
		},
		
		whiteSpace: 'pre-wrap',
		
		align: {
			items: 'flex-start',
		},
		
		Label: {
			justify: {
				content: `space-between`,
			},
		},
		
		Node_inner: {
			flex: {
				grow: 1,
			},
			align: {
				items: 'stretch',
			},
			Trigger: {
				align: {
					items: 'flex-start',
				}
			},
		},
		
		Head: {
			// color: $mol_theme.special,
		},
		
		Unit_time: {
			color: $mol_theme.shade,
			padding: $mol_gap.text,
		},
		
		Unit_tip: {
			color: $mol_theme.shade,
			padding: $mol_gap.text,
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