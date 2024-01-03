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
			const list = land.Node( $hyoo_crus_list ).Item('')
			$mol_assert_equal( list.items(), [] )
			
			list.items([ 2, 3 ])
			$mol_assert_equal( list.items(), [ 2, 3 ] )
			$mol_assert_equal( list.has( 1 ), false )
			
			list.add( 1 )
			$mol_assert_equal( list.items(), [ 1, 2, 3 ] )
			$mol_assert_equal( list.has( 1 ), true )
			
			list.add( 3 )
			$mol_assert_equal( list.items(), [ 1, 2, 3 ] )
			
			list.splice([ 2 ])
			$mol_assert_equal( list.items(), [ 1, 2, 3, 2 ] )
			
			list.splice( [ 2 ], 0 )
			$mol_assert_equal( list.items(), [ 2, 1, 2, 3, 2 ] )
			
			list.wipe( 2 )
			$mol_assert_equal( list.items(), [ 2, 1, 3, 2 ] )
			
			list.move( 2, 1 )
			$mol_assert_equal( list.items(), [ 2, 3, 1, 2 ] )
			
			list.move( 1, 3 )
			$mol_assert_equal( list.items(), [ 2, 1, 3, 2 ] )
			
			list.cut( 2 )
			$mol_assert_equal( list.items(), [ 1, 3 ] )
			$mol_assert_equal( list.has( 2 ), false )
			
			list.cut( 2 )
			$mol_assert_equal( list.items(), [ 1, 3 ] )
			
		},
		
		'Different types'( $ ) {
			
			const land = $hyoo_crus_land.make({ $ })
			const list = land.Node( $hyoo_crus_list ).Item('')
			
			list.items([
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
			
			$mol_assert_equal( list.items(), [
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
				new Uint8Array([ 1, 2, 3 ]),
				new Uint8Array([ 1,2,3,4,5,6,7,8,9,0, 1,2,3,4,5,6,7,8,9,0, 1,2,3,4,5,6,7,8,9,0, 1,2,3,4,5,6,7,8,9,0 ]),
				list.ref(),
			] )
			
		},
		
		'List merge'( $ ) {
			
			const land1 = $hyoo_crus_land.make({ $ })
			const land2 = $hyoo_crus_land.make({ $ })
			
			const list1 = land1.Node( $hyoo_crus_list ).Item('')
			const list2 = land2.Node( $hyoo_crus_list ).Item('')

			list1.items([ 'foo', 'xxx' ])
			land2.face.tick( land2.auth().peer() )
			list2.items([ 'foo', 'yyy' ])
			land1.apply_unit( land2.delta_unit() )
			$mol_assert_equal( list1.items(), [ 'foo', 'yyy', 'foo', 'xxx' ] )

		},
		
		'Insert before removed before changed'( $ ) {
			
			const land = $hyoo_crus_land.make({ $ })
			const list = land.Node( $hyoo_crus_list ).Item('')
			
			list.items([ 'foo', 'bar' ])
			list.items([ 'xxx', 'foo', 'bar' ])
			list.items([ 'xxx', 'bars' ])
			
			$mol_assert_equal( list.items(), [ 'xxx', 'bars' ] )
			
		},
		
		'Many moves'( $ ) {
			
			const land = $hyoo_crus_land.make({ $ })
			const list = land.Node( $hyoo_crus_list ).Item('')
			
			list.items([ 'foo', 'bar', 'lol' ])
			list.move( 2, 1 )
			list.move( 2, 1 )
			list.move( 0, 3 )
			list.move( 2, 1 )
			
			$mol_assert_equal( list.items(), [ 'bar', 'foo', 'lol' ] )
			
		},
		
		'Reorder separated sublists'( $ ) {
			
			const land = $hyoo_crus_land.make({ $ })
			const list = land.Node( $hyoo_crus_list ).Item('')
			
			list.items([ 1, 2, 3, 4, 5, 6 ])
			
			list.move( 3, 5 )
			list.move( 3, 5 )
			list.move( 5, 4 )
			
			list.move( 0, 2 )
			list.move( 0, 2 )
			list.move( 2, 1 )
			
			$mol_assert_equal( list.items(), [ 1, 3, 2, 4, 6, 5 ] )
			
		},
		
		'Insert after moved right'( $ ) {
			
			const base = $hyoo_crus_land.make({ $ })
			base.Root( $hyoo_crus_list ).items([ 1, 2, 3, 4 ])
			
			const left = fork( base )
			left.Root( $hyoo_crus_list ).items([ 1, 7, 2, 3, 4 ])
			
			const right = fork( base )
			right.Root( $hyoo_crus_list ).move( 0, 2 )
			
			sync( left, right )
			$mol_assert_equal(
				left.Root( $hyoo_crus_list ).items(),
				right.Root( $hyoo_crus_list ).items(),
				[ 2, 1, 7, 3, 4 ],
			)
			
		},
		
		'Insert before moved left'( $ ) {
			
			const base = $hyoo_crus_land.make({ $ })
			base.Root( $hyoo_crus_list ).items([ 1, 2, 3, 4 ])
			
			const left = fork( base )
			left.Root( $hyoo_crus_list ).move( 1, 0 )
			
			const right = fork( base )
			right.face.sync( left.face )
			right.Root( $hyoo_crus_list ).items([ 1, 7, 2, 3, 4 ])
			
			sync( left, right )
			$mol_assert_equal(
				left.Root( $hyoo_crus_list ).items(),
				right.Root( $hyoo_crus_list ).items(),
				[ 2, 1, 7, 3, 4 ],
			)
			
		},
		
		'Move left after inserted'( $ ) {
			
			const base = $hyoo_crus_land.make({ $ })
			base.Root( $hyoo_crus_list ).items([ 1, 2, 3, 4 ])
			
			const left = fork( base )
			left.Root( $hyoo_crus_list ).items([ 1, 7, 2, 3, 4 ])
			
			const right = fork( base )
			right.face.sync( left.face )
			right.Root( $hyoo_crus_list ).move( 1, 0 )
			
			sync( left, right )
			$mol_assert_equal(
				left.Root( $hyoo_crus_list ).items(),
				right.Root( $hyoo_crus_list ).items(),
				[ 2, 1, 3, 7, 4 ], // extra change (3) => unexpected result (7 after 3)
			)
			
		},
		
		'Insert before moved right'( $ ) {
			
			const base = $hyoo_crus_land.make({ $ })
			base.Root( $hyoo_crus_list ).items([ 1, 2, 3, 4 ])
			
			const left = fork( base )
			left.Root( $hyoo_crus_list ).move( 1, 4 )
			
			const right = fork( base )
			right.face.sync( left.face )
			right.Root( $hyoo_crus_list ).items([ 1, 7, 2, 3, 4 ])
			
			sync( left, right )
			$mol_assert_equal(
				left.Root( $hyoo_crus_list ).items(),
				right.Root( $hyoo_crus_list ).items(),
				[ 1, 7, 3, 4, 2 ],
			)
			
		},
		
		'Move right after inserted'( $ ) {
			
			const base = $hyoo_crus_land.make({ $ })
			base.Root( $hyoo_crus_list ).items([ 1, 2, 3, 4 ])
			
			const left = fork( base )
			left.Root( $hyoo_crus_list ).items([ 1, 7, 2, 3, 4 ])
			
			const right = fork( base )
			right.face.sync( left.face )
			right.Root( $hyoo_crus_list ).move( 1, 4 )
			
			sync( left, right )
			$mol_assert_equal(
				left.Root( $hyoo_crus_list ).items(),
				right.Root( $hyoo_crus_list ).items(),
				[ 1, 3, 7, 4, 2 ], // extra change (3) => unexpected result (7 after 3)
			)
			
		},
		
		'Insert after wiped'( $ ) {
			
			const base = $hyoo_crus_land.make({ $ })
			base.Root( $hyoo_crus_list ).items([ 1, 2, 3, 4 ])
			
			const left = fork( base )
			left.Root( $hyoo_crus_list ).items([ 1, 3, 4 ])
			
			const right = fork( base )
			right.face.sync( left.face )
			right.Root( $hyoo_crus_list ).items([ 1, 2, 7, 3, 4 ])
			
			sync( left, right )
			$mol_assert_equal(
				left.Root( $hyoo_crus_list ).items(),
				right.Root( $hyoo_crus_list ).items(),
				[ 1, 7, 3, 4 ],
			)
			
		},
		
		'Wiped before inserted'( $ ) {
			
			const base = $hyoo_crus_land.make({ $ })
			base.Root( $hyoo_crus_list ).items([ 1, 2, 3, 4 ])
			
			const left = fork( base )
			left.Root( $hyoo_crus_list ).items([ 1, 2, 7, 3, 4 ])
			
			const right = fork( base )
			right.face.sync( left.face )
			right.Root( $hyoo_crus_list ).items([ 1, 3, 4 ])
			
			sync( left, right )
			$mol_assert_equal(
				left.Root( $hyoo_crus_list ).items(),
				right.Root( $hyoo_crus_list ).items(),
				[ 1, 7, 3, 4 ],
			)
			
		},
		
		'Insert before wiped'( $ ) {
			
			const base = $hyoo_crus_land.make({ $ })
			base.Root( $hyoo_crus_list ).items([ 1, 2, 3, 4 ])
			
			const left = fork( base )
			left.Root( $hyoo_crus_list ).wipe( 2 )
			
			const right = fork( base )
			right.face.sync( left.face )
			right.Root( $hyoo_crus_list ).items([ 1, 2, 7, 3, 4 ])
			
			sync( left, right )
			$mol_assert_equal(
				left.Root( $hyoo_crus_list ).items(),
				right.Root( $hyoo_crus_list ).items(),
				[ 1, 2, 7, 4 ],
			)
			
		},
		
		'Wiped after inserted'( $ ) {
			
			const base = $hyoo_crus_land.make({ $ })
			base.Root( $hyoo_crus_list ).items([ 1, 2, 3, 4 ])
			
			const left = fork( base )
			left.Root( $hyoo_crus_list ).items([ 1, 2, 7, 3, 4 ])
			
			const right = fork( base )
			right.face.sync( left.face )
			right.Root( $hyoo_crus_list ).wipe( 2 )
			
			sync( left, right )
			$mol_assert_equal(
				left.Root( $hyoo_crus_list ).items(),
				right.Root( $hyoo_crus_list ).items(),
				[ 1, 2, 7, 4 ],
			)
			
		},
		
		'Insert after moved out'( $ ) {
			
			const base = $hyoo_crus_land.make({ $ })
			base.Root( $hyoo_crus_list ).items([ 1, 2, 3, 4 ])
			
			const left = fork( base )
			left.gist_move( left.Root( $hyoo_crus_list ).units()[1], '11111111', 0 )
			
			const right = fork( base )
			right.face.sync( left.face )
			right.Root( $hyoo_crus_list ).items([ 1, 2, 7, 3, 4 ])
			
			sync( left, right )
			$mol_assert_equal(
				left.Root( $hyoo_crus_list ).items(),
				right.Root( $hyoo_crus_list ).items(),
				[ 1, 7, 3, 4 ],
			)
			$mol_assert_equal(
				left.Node( $hyoo_crus_list ).Item('11111111').items(),
				right.Node( $hyoo_crus_list ).Item('11111111').items(),
				[ 2 ],
			)
			
		},
		
		'Move out before inserted'( $ ) {
			
			const base = $hyoo_crus_land.make({ $ })
			base.Root( $hyoo_crus_list ).items([ 1, 2, 3, 4 ])
			
			const left = fork( base )
			left.Root( $hyoo_crus_list ).items([ 1, 2, 7, 3, 4 ])
			
			const right = fork( base )
			right.face.sync( left.face )
			right.gist_move( right.Root( $hyoo_crus_list ).units()[1], '11111111', 0 )
			
			sync( left, right )
			$mol_assert_equal(
				left.Root( $hyoo_crus_list ).items(),
				right.Root( $hyoo_crus_list ).items(),
				[ 1, 7, 3, 4 ],
			)
			$mol_assert_equal(
				left.Node( $hyoo_crus_list ).Item('11111111').items(),
				right.Node( $hyoo_crus_list ).Item('11111111').items(),
				[ 2 ],
			)
			
		},
		
		'Insert before changed'( $ ) {
			
			const base = $hyoo_crus_land.make({ $ })
			base.Root( $hyoo_crus_list ).items([ 1, 2, 3, 4 ])
			
			const left = fork( base )
			left.Root( $hyoo_crus_list ).items([ 1, 2, 7, 4 ])
			
			const right = fork( base )
			right.face.sync( left.face )
			right.Root( $hyoo_crus_list ).items([ 1, 2, 13, 3, 4 ])
			
			sync( left, right )
			$mol_assert_equal(
				left.Root( $hyoo_crus_list ).items(),
				right.Root( $hyoo_crus_list ).items(),
				[ 1, 2, 13, 7, 4 ],
			)
			
		},
		
		'Change after inserted'( $ ) {
			
			const base = $hyoo_crus_land.make({ $ })
			base.Root( $hyoo_crus_list ).items([ 1, 2, 3, 4 ])
			
			const left = fork( base )
			left.Root( $hyoo_crus_list ).items([ 1, 2, 13, 3, 4 ])
			
			const right = fork( base )
			right.face.sync( left.face )
			right.Root( $hyoo_crus_list ).items([ 1, 2, 7, 4 ])
			
			sync( left, right )
			$mol_assert_equal(
				left.Root( $hyoo_crus_list ).items(),
				right.Root( $hyoo_crus_list ).items(),
				[ 1, 2, 7, 13, 4 ],
			)
			
		},
		
		'Insert between moved'( $ ) {
			
			const base = $hyoo_crus_land.make({ $ })
			base.Root( $hyoo_crus_list ).items([ 1, 2, 3, 4, 5, 6 ])
			
			const left = fork( base )
			left.Root( $hyoo_crus_list ).move( 1, 5 )
			left.Root( $hyoo_crus_list ).move( 1, 5 )
			
			const right = fork( base )
			right.face.sync( left.face )
			right.Root( $hyoo_crus_list ).items([ 1, 2, 7, 3, 4, 5, 6 ])
			
			sync( left, right )
			$mol_assert_equal(
				left.Root( $hyoo_crus_list ).items(),
				right.Root( $hyoo_crus_list ).items(),
				[ 1, 4, 5, 2, 7, 3, 6 ],
			)
			
		},
		
		'Move near inserted'( $ ) {
			
			const base = $hyoo_crus_land.make({ $ })
			base.Root( $hyoo_crus_list ).items([ 1, 2, 3, 4, 5, 6 ])
			
			const left = fork( base )
			left.Root( $hyoo_crus_list ).items([ 1, 2, 7, 3, 4, 5, 6 ])
			
			const right = fork( base )
			right.face.sync( left.face )
			right.Root( $hyoo_crus_list ).move( 1, 5 )
			right.Root( $hyoo_crus_list ).move( 1, 5 )
			
			sync( left, right )
			$mol_assert_equal(
				left.Root( $hyoo_crus_list ).items(),
				right.Root( $hyoo_crus_list ).items(),
				[ 1, 4, 5, 2, 3, 7, 6 ],
			)
			
		},
		
	})
	
}
