namespace $ {
	
	$mol_test({
		
		'Basic list ops'( $ ) {
			
			const area = $hyoo_crowds_area.make({ $ })
			const list = area.Node( $hyoo_crowds_list ).Item(0)
			$mol_assert_like( list.items(), [] )
			
			list.items([ 1, 2 ])
			$mol_assert_like( list.items(), [ 1, 2 ] )
			$mol_assert_not( list.has( 3 ) )
			
			list.add( 3 )
			$mol_assert_like( list.items(), [ 1, 2, 3 ] )
			$mol_assert_ok( list.has( 3 ) )
			
			list.add( 3 )
			$mol_assert_like( list.items(), [ 1, 2, 3 ] )
			
			list.splice([ 2 ])
			$mol_assert_like( list.items(), [ 1, 2, 3, 2 ] )
			
			list.splice( [ 2 ], 0 )
			$mol_assert_like( list.items(), [ 2, 1, 2, 3, 2 ] )
			
			list.wipe( 2 )
			$mol_assert_like( list.items(), [ 2, 1, 3, 2 ] )
			
			list.move( 2, 1 )
			$mol_assert_like( list.items(), [ 2, 3, 1, 2 ] )
			
			list.move( 1, 3 )
			$mol_assert_like( list.items(), [ 2, 1, 3, 2 ] )
			
			list.cut( 2 )
			$mol_assert_like( list.items(), [ 1, 3 ] )
			$mol_assert_not( list.has( 2 ) )
			
			list.cut( 2 )
			$mol_assert_like( list.items(), [ 1, 3 ] )
			
		},
		
		'Different types'( $ ) {
			
			const area = $hyoo_crowds_area.make({ $ })
			const list = area.Node( $hyoo_crowds_list ).Item(0)
			
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
			
			$mol_assert_like( list.items(), [
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
		
		async 'List merge'( $ ) {
			
			const area1 = $hyoo_crowds_area.make({ $ })
			const area2 = $hyoo_crowds_area.make({ $ })
			
			const list1 = area1.Node( $hyoo_crowds_list ).Item(0)
			const list2 = area2.Node( $hyoo_crowds_list ).Item(0)

			list1.items([ 'foo', 123, 'xxx', 'bar' ])
			area2.face.tick( area2.auth().peer() )
			list2.items([ 'foo', 123, 'yyy', 'bar' ])
			area1.apply_unit( area2.delta_unit() )
			$mol_assert_like( list1.items(), [ 'foo', 123, 'yyy', 'bar', 'xxx', 'bar' ] )

		},
		
		async 'Insert before removed before changed'( $ ) {
			
			const area = $hyoo_crowds_area.make({ $ })
			const list = area.Node( $hyoo_crowds_list ).Item(0)
			
			list.items([ 'foo', 'bar' ])
			list.items([ 'xxx', 'foo', 'bar' ])
			list.items([ 'xxx', 'bars' ])
			
			$mol_assert_like( list.items(), [ 'xxx', 'bars' ] )
			
		},
		
		async 'Many moves'( $ ) {
			
			const area = $hyoo_crowds_area.make({ $ })
			const list = area.Node( $hyoo_crowds_list ).Item(0)
			
			list.items([ 'foo', 'bar', 'lol' ])
			list.move( 2, 1 )
			list.move( 2, 1 )
			list.move( 0, 3 )
			list.move( 2, 1 )
			
			$mol_assert_like( list.items(), [ 'bar', 'foo', 'lol' ] )
			
		},
		
		async 'Reorder separated sublists'( $ ) {
			
			const area = $hyoo_crowds_area.make({ $ })
			const list = area.Node( $hyoo_crowds_list ).Item(0)
			
			list.items([ 1, 2, 3, 4, 5, 6 ])
			
			list.move( 3, 5 )
			list.move( 3, 5 )
			list.move( 5, 4 )
			
			list.move( 0, 2 )
			list.move( 0, 2 )
			list.move( 2, 1 )
			
			$mol_assert_like( list.items(), [ 1, 3, 2, 4, 6, 5 ] )
			
		},
		
	})
	
}
