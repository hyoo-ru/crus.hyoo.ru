namespace $ {
	$mol_test({
		
		'Change sequences'( $ ) {
			
			const area = $hyoo_crowds_area.make({ $ })
			const text = area.Root( $hyoo_crowds_text )
			$mol_assert_like( text.str(), '' )
			
			text.str( 'foo' )
			$mol_assert_like( text.str(), 'foo' )
			
			text.str( 'foo bar' )
			$mol_assert_like( text.str(), 'foo bar' )
			
			text.str( 'foo lol bar' )
			$mol_assert_like( text.str(), 'foo lol bar' )
			
			text.str( 'lol bar' )
			$mol_assert_like( text.str(), 'lol bar' )
			
			text.str( 'foo bar' )
			$mol_assert_like( text.str(), 'foo bar' )
			
		},
		
		async 'str: Offset <=> Point'( $ ) {
			
			const area = $hyoo_crowds_area.make({ $ })
			const text = area.Root( $hyoo_crowds_text )
			
			text.str( 'fooBar' )
			const [ first, second ] = text.units()
			
			$mol_assert_like( text.point_by_offset( 0 ), [ first.self(), 0 ] )
			$mol_assert_like( text.offset_by_point([ first.self(), 0 ]), [ first.self(), 0 ] )
			
			$mol_assert_like( text.point_by_offset( 3 ), [ first.self(), 3 ] )
			$mol_assert_like( text.offset_by_point([ first.self(), 3 ]), [ first.self(), 3 ] )
			$mol_assert_like( text.offset_by_point([ first.self(), 5 ]), [ first.self(), 5 ] )
			
			$mol_assert_like( text.point_by_offset( 5 ), [ second.self(), 2 ] )
			$mol_assert_like( text.offset_by_point([ second.self(), 2 ]), [ second.self(), 5 ] )
			
			$mol_assert_like( text.point_by_offset( 6 ), [ second.self(), 3 ] )
			$mol_assert_like( text.offset_by_point([ second.self(), 3 ]), [ second.self(), 6 ] )
			
			$mol_assert_like( text.point_by_offset( 7 ), [ 0, 1 ] )
			$mol_assert_like( text.offset_by_point([ 0, 1 ]), [ 0, 7 ] )
			
		},

		async 'text: Offset <=> Point'( $ ) {
			
			const area = $hyoo_crowds_area.make({ $ })
			const text = area.Root( $hyoo_crowds_text )
			
			text.text( 'foo bar\n666 777' )
			const [ first, second ] = text.nodes( $hyoo_crowds_text )
			
			$mol_assert_like( text.point_by_offset( 0 ), [ first.units()[0].self(), 0 ] )
			$mol_assert_like( text.offset_by_point([ first.units()[0].self(), 0 ]), [ first.units()[0].self(), 0 ] )
			
			$mol_assert_like( text.point_by_offset( 8 ), [ first.units()[2].self(), 1 ] )
			$mol_assert_like( text.offset_by_point([ first.units()[2].self(), 1 ]), [ first.units()[2].self(), 8 ] )
			
		},

		async 'Merge different sequences'( $ ) {
			
			const area1 = $hyoo_crowds_area.make({ $ })
			const area2 = $hyoo_crowds_area.make({ $ })
			
			const text1 = area1.Node( $hyoo_crowds_text ).Item(0)
			const text2 = area2.Node( $hyoo_crowds_text ).Item(0)
			
			text1.str( 'foo bar.' )
			area2.face.tick( area2.auth().peer() )
			text2.str( 'xxx yyy.' )
			
			const delta1 = area1.delta_unit()
			const delta2 = area2.delta_unit()
			
			area1.apply_unit( delta2 )
			area2.apply_unit( delta1 )
	
			$mol_assert_like(
				text1.str(),
				text2.str(),
				'xxx yyy.foo bar.',
			)
			
		},
		
		async 'Merge same insertions with different changes to same place'( $ ) {
			
			const base = $hyoo_crowds_area.make({ $ })
			base.Root( $hyoo_crowds_text ).str( '( )' )
			
			const left = $hyoo_crowds_area.make({ $ })
			left.apply_unit( base.delta_unit() )
			left.Root( $hyoo_crowds_text ).str( '( [ f ] )' )
			left.Root( $hyoo_crowds_text ).str( '( [ foo ] )' )
			
			const right = $hyoo_crowds_area.make({ $ })
			right.apply_unit( base.delta_unit() )
			right.face.tick( right.auth().peer() )
			right.Root( $hyoo_crowds_text ).str( '( [ f ] )' )
			right.Root( $hyoo_crowds_text ).str( '( [ fu ] )' )
			
			const left_delta = left.delta_unit( base.face )
			const right_delta = right.delta_unit( base.face )
			
			left.apply_unit( right_delta )
			right.apply_unit( left_delta )
	
			$mol_assert_like(
				left.Root( $hyoo_crowds_text ).str(),
				right.Root( $hyoo_crowds_text ).str(),
				'( [ fu ] [ foo ] )',
			)
			
		},
		
	})
}
