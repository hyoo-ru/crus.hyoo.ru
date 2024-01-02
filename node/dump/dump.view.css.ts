namespace $.$$ {
	
	$mol_style_define( $hyoo_crus_node_dump, {
		
		font: {
			family: 'monospace',
		},
		
		whiteSpace: 'pre-wrap',
		
		align: {
			items: 'flex-start',
		},
		
		Trigger: {
			flex: {
				grow: 0,
			},
		},
		
		Add_key: {
			flex: {
				grow: 0,
			},
		},
		
		Add_value: {
			flex: {
				grow: 0,
			},
		},
		
		Tools: {
			flex: {
				//basis: `40rem`,
				grow: 1,
				shrink: 1,
				wrap: `wrap`,
			},
			// justify: {
			// 	content: `flex-end`,
			// },
		},
		
		Label: {
			justify: {
				// content: `space-between`,
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
		
		Value_text: {
			flex: {
				basis: `20rem`,
				shrink: 1,
			}
		},
		
		Value_str: {
			flex: {
				shrink: 1,
			}
		},
		
		Unit_time: {
			color: $mol_theme.shade,
			padding: $mol_gap.text,
		},
		
		Unit_tip: {
			color: $mol_theme.shade,
		},
		
		Unit_tag: {
			color: $mol_theme.shade,
		},
		
		Unit_value: {
			padding: $mol_gap.text,
			align: {
				self: 'flex-start',
			},
			color: $mol_theme.text,
			background: {
				color: $mol_theme.card,
			},
		},
		
		Unit_ref: {
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
