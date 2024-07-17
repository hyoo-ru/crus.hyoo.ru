namespace $ {
	
	function fork( base: $hyoo_crus_land ) {
		const land = $hyoo_crus_land.make({ $: base.$ })
		land.apply_land( base )
		return land
	}
	
	function sync( left: $hyoo_crus_land, right: $hyoo_crus_land ) {
		left.apply_land( right )
		right.apply_land( left )
	}
	
	$mol_test({
		
		'Basic list ops'( $ ) {
			
			const land = $hyoo_crus_land.make({ $ })
			const list = land.Node( $hyoo_crus_list_vary ).Item('')
			$mol_assert_equal( list.items_vary(), [] )
			
			list.items_vary([ 2, 3 ])
			$mol_assert_equal( list.items_vary(), [ 2, 3 ] )
			$mol_assert_equal( list.has( 1 ), false )
			
			list.add( 1 )
			$mol_assert_equal( list.items_vary(), [ 1, 2, 3 ] )
			$mol_assert_equal( list.has( 1 ), true )
			
			list.add( 3 )
			$mol_assert_equal( list.items_vary(), [ 1, 2, 3 ] )
			
			list.splice([ 2 ])
			$mol_assert_equal( list.items_vary(), [ 1, 2, 3, 2 ] )
			
			list.splice( [ 2 ], 0 )
			$mol_assert_equal( list.items_vary(), [ 2, 1, 2, 3, 2 ] )
			
			list.wipe( 2 )
			$mol_assert_equal( list.items_vary(), [ 2, 1, 3, 2 ] )
			
			list.move( 2, 1 )
			$mol_assert_equal( list.items_vary(), [ 2, 3, 1, 2 ] )
			
			list.move( 1, 3 )
			$mol_assert_equal( list.items_vary(), [ 2, 1, 3, 2 ] )
			
			list.cut( 2 )
			$mol_assert_equal( list.items_vary(), [ 1, 3 ] )
			$mol_assert_equal( list.has( 2 ), false )
			
			list.cut( 2 )
			$mol_assert_equal( list.items_vary(), [ 1, 3 ] )
			
		},
		
		'Different types'( $ ) {
			
			const land = $hyoo_crus_land.make({ $ })
			const list = land.Node( $hyoo_crus_list_vary ).Item('')
			
			list.items_vary([
				null,
				false,
				true,
				0n,
				4611686018427387904n,
				0,
				Math.PI,
				Number.NaN,
				Number.NEGATIVE_INFINITY,
				'',
				'1234567890123456789012345678901234567890',
				new Uint8Array([]),
				new Uint8Array([ 1, 2, 3 ]),
				new Uint8Array([ 1,2,3,4,5,6,7,8,9,0, 1,2,3,4,5,6,7,8,9,0, 1,2,3,4,5,6,7,8,9,0, 1,2,3,4,5,6,7,8,9,0 ]),
				list.ref(),
			])
			
			$mol_assert_equal( list.items_vary(), [
				false,
				true,
				0n,
				4611686018427387904n,
				0,
				Math.PI,
				Number.NaN,
				Number.NEGATIVE_INFINITY,
				'',
				'1234567890123456789012345678901234567890',
				new Uint8Array([]),
				new Uint8Array([ 1, 2, 3 ]),
				new Uint8Array([ 1,2,3,4,5,6,7,8,9,0, 1,2,3,4,5,6,7,8,9,0, 1,2,3,4,5,6,7,8,9,0, 1,2,3,4,5,6,7,8,9,0 ]),
				list.ref(),
			] )
			
		},
		
		'List merge'( $ ) {
			
			const land1 = $hyoo_crus_land.make({ $ })
			const land2 = $hyoo_crus_land.make({ $ })
			
			const list1 = land1.Node( $hyoo_crus_list_vary ).Item('')
			const list2 = land2.Node( $hyoo_crus_list_vary ).Item('')

			list1.items_vary([ 'foo', 'xxx' ])
			land2.faces.tick()
			list2.items_vary([ 'foo', 'yyy' ])
			land1.apply_unit_trust( land2.delta_unit() )
			$mol_assert_equal( list1.items_vary(), [ 'foo', 'yyy', 'foo', 'xxx' ] )

		},
		
		'Insert before removed before changed'( $ ) {
			
			const land = $hyoo_crus_land.make({ $ })
			const list = land.Node( $hyoo_crus_list_vary ).Item('')
			
			list.items_vary([ 'foo', 'bar' ])
			list.items_vary([ 'xxx', 'foo', 'bar' ])
			list.items_vary([ 'xxx', 'bars' ])
			
			$mol_assert_equal( list.items_vary(), [ 'xxx', 'bars' ] )
			
		},
		
		'Many moves'( $ ) {
			
			const land = $hyoo_crus_land.make({ $ })
			const list = land.Node( $hyoo_crus_list_vary ).Item('')
			
			list.items_vary([ 'foo', 'bar', 'lol' ])
			list.move( 2, 1 )
			list.move( 2, 1 )
			list.move( 0, 3 )
			list.move( 2, 1 )
			
			$mol_assert_equal( list.items_vary(), [ 'bar', 'foo', 'lol' ] )
			
		},
		
		'Reorder separated sublists'( $ ) {
			
			const land = $hyoo_crus_land.make({ $ })
			const list = land.Node( $hyoo_crus_list_vary ).Item('')
			
			list.items_vary([ 1, 2, 3, 4, 5, 6 ])
			
			list.move( 3, 5 )
			list.move( 3, 5 )
			list.move( 5, 4 )
			
			list.move( 0, 2 )
			list.move( 0, 2 )
			list.move( 2, 1 )
			
			$mol_assert_equal( list.items_vary(), [ 1, 3, 2, 4, 6, 5 ] )
			
		},
		
		'Insert after moved right'( $ ) {
			
			const base = $hyoo_crus_land.make({ $ })
			base.Data( $hyoo_crus_list_vary ).items_vary([ 1, 2, 3, 4 ])
			
			const left = fork( base )
			left.Data( $hyoo_crus_list_vary ).items_vary([ 1, 7, 2, 3, 4 ])
			
			const right = fork( base )
			right.Data( $hyoo_crus_list_vary ).move( 0, 2 )
			
			sync( left, right )
			$mol_assert_equal(
				left.Data( $hyoo_crus_list_vary ).items_vary(),
				right.Data( $hyoo_crus_list_vary ).items_vary(),
				[ 2, 1, 7, 3, 4 ],
			)
			
		},
		
		'Insert before moved left'( $ ) {
			
			const base = $hyoo_crus_land.make({ $ })
			base.Data( $hyoo_crus_list_vary ).items_vary([ 1, 2, 3, 4 ])
			
			const left = fork( base )
			left.Data( $hyoo_crus_list_vary ).move( 1, 0 )
			
			const right = fork( base )
			right.faces.sync( left.faces )
			right.Data( $hyoo_crus_list_vary ).items_vary([ 1, 7, 2, 3, 4 ])
			
			sync( left, right )
			$mol_assert_equal(
				left.Data( $hyoo_crus_list_vary ).items_vary(),
				right.Data( $hyoo_crus_list_vary ).items_vary(),
				[ 2, 1, 7, 3, 4 ],
			)
			
		},
		
		'Move left after inserted'( $ ) {
			
			const base = $hyoo_crus_land.make({ $ })
			base.Data( $hyoo_crus_list_vary ).items_vary([ 1, 2, 3, 4 ])
			
			const left = fork( base )
			left.Data( $hyoo_crus_list_vary ).items_vary([ 1, 7, 2, 3, 4 ])
			
			const right = fork( base )
			right.faces.sync( left.faces )
			right.Data( $hyoo_crus_list_vary ).move( 1, 0 )
			
			sync( left, right )
			$mol_assert_equal(
				left.Data( $hyoo_crus_list_vary ).items_vary(),
				right.Data( $hyoo_crus_list_vary ).items_vary(),
				[ 2, 1, 3, 7, 4 ], // extra change (3) => unexpected result (7 after 3)
			)
			
		},
		
		'Insert before moved right'( $ ) {
			
			const base = $hyoo_crus_land.make({ $ })
			base.Data( $hyoo_crus_list_vary ).items_vary([ 1, 2, 3, 4 ])
			
			const left = fork( base )
			left.Data( $hyoo_crus_list_vary ).move( 1, 4 )
			
			const right = fork( base )
			right.faces.sync( left.faces )
			right.Data( $hyoo_crus_list_vary ).items_vary([ 1, 7, 2, 3, 4 ])
			
			sync( left, right )
			$mol_assert_equal(
				left.Data( $hyoo_crus_list_vary ).items_vary(),
				right.Data( $hyoo_crus_list_vary ).items_vary(),
				[ 1, 7, 3, 4, 2 ],
			)
			
		},
		
		'Move right after inserted'( $ ) {
			
			const base = $hyoo_crus_land.make({ $ })
			base.Data( $hyoo_crus_list_vary ).items_vary([ 1, 2, 3, 4 ])
			
			const left = fork( base )
			left.Data( $hyoo_crus_list_vary ).items_vary([ 1, 7, 2, 3, 4 ])
			
			const right = fork( base )
			right.faces.sync( left.faces )
			right.Data( $hyoo_crus_list_vary ).move( 1, 4 )
			
			sync( left, right )
			$mol_assert_equal(
				left.Data( $hyoo_crus_list_vary ).items_vary(),
				right.Data( $hyoo_crus_list_vary ).items_vary(),
				[ 1, 3, 7, 4, 2 ], // extra change (3) => unexpected result (7 after 3)
			)
			
		},
		
		'Insert after wiped'( $ ) {
			
			const base = $hyoo_crus_land.make({ $ })
			base.Data( $hyoo_crus_list_vary ).items_vary([ 1, 2, 3, 4 ])
			
			const left = fork( base )
			left.Data( $hyoo_crus_list_vary ).items_vary([ 1, 3, 4 ])
			
			const right = fork( base )
			right.faces.sync( left.faces )
			right.Data( $hyoo_crus_list_vary ).items_vary([ 1, 2, 7, 3, 4 ])
			
			sync( left, right )
			$mol_assert_equal(
				left.Data( $hyoo_crus_list_vary ).items_vary(),
				right.Data( $hyoo_crus_list_vary ).items_vary(),
				[ 1, 7, 3, 4 ],
			)
			
		},
		
		'Wiped before inserted'( $ ) {
			
			const base = $hyoo_crus_land.make({ $ })
			base.Data( $hyoo_crus_list_vary ).items_vary([ 1, 2, 3, 4 ])
			
			const left = fork( base )
			left.Data( $hyoo_crus_list_vary ).items_vary([ 1, 2, 7, 3, 4 ])
			
			const right = fork( base )
			right.faces.sync( left.faces )
			right.Data( $hyoo_crus_list_vary ).items_vary([ 1, 3, 4 ])
			
			sync( left, right )
			$mol_assert_equal(
				left.Data( $hyoo_crus_list_vary ).items_vary(),
				right.Data( $hyoo_crus_list_vary ).items_vary(),
				[ 1, 7, 3, 4 ],
			)
			
		},
		
		'Insert before wiped'( $ ) {
			
			const base = $hyoo_crus_land.make({ $ })
			base.Data( $hyoo_crus_list_vary ).items_vary([ 1, 2, 3, 4 ])
			
			const left = fork( base )
			left.Data( $hyoo_crus_list_vary ).wipe( 2 )
			
			const right = fork( base )
			right.faces.sync( left.faces )
			right.Data( $hyoo_crus_list_vary ).items_vary([ 1, 2, 7, 3, 4 ])
			
			sync( left, right )
			$mol_assert_equal(
				left.Data( $hyoo_crus_list_vary ).items_vary(),
				right.Data( $hyoo_crus_list_vary ).items_vary(),
				[ 1, 2, 7, 4 ],
			)
			
		},
		
		'Wiped after inserted'( $ ) {
			
			const base = $hyoo_crus_land.make({ $ })
			base.Data( $hyoo_crus_list_vary ).items_vary([ 1, 2, 3, 4 ])
			
			const left = fork( base )
			left.Data( $hyoo_crus_list_vary ).items_vary([ 1, 2, 7, 3, 4 ])
			
			const right = fork( base )
			right.faces.sync( left.faces )
			right.Data( $hyoo_crus_list_vary ).wipe( 2 )
			
			sync( left, right )
			$mol_assert_equal(
				left.Data( $hyoo_crus_list_vary ).items_vary(),
				right.Data( $hyoo_crus_list_vary ).items_vary(),
				[ 1, 2, 7, 4 ],
			)
			
		},
		
		'Insert after moved out'( $ ) {
			
			const base = $hyoo_crus_land.make({ $ })
			base.Data( $hyoo_crus_list_vary ).items_vary([ 1, 2, 3, 4 ])
			
			const left = fork( base )
			left.sand_move( left.Data( $hyoo_crus_list_vary ).units()[1], '11111111', 0 )
			
			const right = fork( base )
			right.faces.sync( left.faces )
			right.Data( $hyoo_crus_list_vary ).items_vary([ 1, 2, 7, 3, 4 ])
			
			sync( left, right )
			$mol_assert_equal(
				left.Data( $hyoo_crus_list_vary ).items_vary(),
				right.Data( $hyoo_crus_list_vary ).items_vary(),
				[ 1, 7, 3, 4 ],
			)
			$mol_assert_equal(
				left.Node( $hyoo_crus_list_vary ).Item('11111111').items_vary(),
				right.Node( $hyoo_crus_list_vary ).Item('11111111').items_vary(),
				[ 2 ],
			)
			
		},
		
		'Move out before inserted'( $ ) {
			
			const base = $hyoo_crus_land.make({ $ })
			base.Data( $hyoo_crus_list_vary ).items_vary([ 1, 2, 3, 4 ])
			
			const left = fork( base )
			left.Data( $hyoo_crus_list_vary ).items_vary([ 1, 2, 7, 3, 4 ])
			
			const right = fork( base )
			right.faces.sync( left.faces )
			right.sand_move( right.Data( $hyoo_crus_list_vary ).units()[1], '11111111', 0 )
			
			sync( left, right )
			$mol_assert_equal(
				left.Data( $hyoo_crus_list_vary ).items_vary(),
				right.Data( $hyoo_crus_list_vary ).items_vary(),
				[ 1, 7, 3, 4 ],
			)
			$mol_assert_equal(
				left.Node( $hyoo_crus_list_vary ).Item('11111111').items_vary(),
				right.Node( $hyoo_crus_list_vary ).Item('11111111').items_vary(),
				[ 2 ],
			)
			
		},
		
		'Insert before changed'( $ ) {
			
			const base = $hyoo_crus_land.make({ $ })
			base.Data( $hyoo_crus_list_vary ).items_vary([ 1, 2, 3, 4 ])
			
			const left = fork( base )
			left.Data( $hyoo_crus_list_vary ).items_vary([ 1, 2, 7, 4 ])
			
			const right = fork( base )
			right.faces.sync( left.faces )
			right.Data( $hyoo_crus_list_vary ).items_vary([ 1, 2, 13, 3, 4 ])
			
			sync( left, right )
			$mol_assert_equal(
				left.Data( $hyoo_crus_list_vary ).items_vary(),
				right.Data( $hyoo_crus_list_vary ).items_vary(),
				[ 1, 2, 13, 7, 4 ],
			)
			
		},
		
		'Change after inserted'( $ ) {
			
			const base = $hyoo_crus_land.make({ $ })
			base.Data( $hyoo_crus_list_vary ).items_vary([ 1, 2, 3, 4 ])
			
			const left = fork( base )
			left.Data( $hyoo_crus_list_vary ).items_vary([ 1, 2, 13, 3, 4 ])
			
			const right = fork( base )
			right.faces.sync( left.faces )
			right.Data( $hyoo_crus_list_vary ).items_vary([ 1, 2, 7, 4 ])
			
			sync( left, right )
			$mol_assert_equal(
				left.Data( $hyoo_crus_list_vary ).items_vary(),
				right.Data( $hyoo_crus_list_vary ).items_vary(),
				[ 1, 2, 7, 13, 4 ],
			)
			
		},
		
		'Insert between moved'( $ ) {
			
			const base = $hyoo_crus_land.make({ $ })
			base.Data( $hyoo_crus_list_vary ).items_vary([ 1, 2, 3, 4, 5, 6 ])
			
			const left = fork( base )
			left.Data( $hyoo_crus_list_vary ).move( 1, 5 )
			left.Data( $hyoo_crus_list_vary ).move( 1, 5 )
			
			const right = fork( base )
			right.faces.sync( left.faces )
			right.Data( $hyoo_crus_list_vary ).items_vary([ 1, 2, 7, 3, 4, 5, 6 ])
			
			sync( left, right )
			$mol_assert_equal(
				left.Data( $hyoo_crus_list_vary ).items_vary(),
				right.Data( $hyoo_crus_list_vary ).items_vary(),
				[ 1, 4, 5, 2, 7, 3, 6 ],
			)
			
		},
		
		'Move near inserted'( $ ) {
			
			const base = $hyoo_crus_land.make({ $ })
			base.Data( $hyoo_crus_list_vary ).items_vary([ 1, 2, 3, 4, 5, 6 ])
			
			const left = fork( base )
			left.Data( $hyoo_crus_list_vary ).items_vary([ 1, 2, 7, 3, 4, 5, 6 ])
			
			const right = fork( base )
			right.faces.sync( left.faces )
			right.Data( $hyoo_crus_list_vary ).move( 1, 5 )
			right.Data( $hyoo_crus_list_vary ).move( 1, 5 )
			
			sync( left, right )
			$mol_assert_equal(
				left.Data( $hyoo_crus_list_vary ).items_vary(),
				right.Data( $hyoo_crus_list_vary ).items_vary(),
				[ 1, 4, 5, 2, 3, 7, 6 ],
			)
			
		},
		
	})
	
}
