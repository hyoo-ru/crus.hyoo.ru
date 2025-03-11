namespace $ {
	$mol_test({
		
		'Change sequences'( $ ) {
			
			const land = $hyoo_crus_land.make({ $ })
			const text = land.Data( $hyoo_crus_text )
			const list = land.Data( $hyoo_crus_list_vary )
			$mol_assert_equal( text.str(), '' )
			$mol_assert_equal( list.items_vary(), [] )
			
			text.str( 'foo' )
			$mol_assert_equal( text.str(), 'foo' )
			$mol_assert_equal( list.items_vary(), [ 'foo' ] )
			
			text.str( 'foo bar' )
			$mol_assert_equal( text.str(), 'foo bar' )
			$mol_assert_equal( list.items_vary(), [ 'foo', ' bar' ] )
			
			text.str( 'foo lol bar' )
			$mol_assert_equal( text.str(), 'foo lol bar' )
			$mol_assert_equal( list.items_vary(), [ 'foo', ' lol', ' bar' ] )
			
			text.str( 'lol bar' )
			$mol_assert_equal( text.str(), 'lol bar' )
			$mol_assert_equal( list.items_vary(), [ 'lol', ' bar' ] )
			
			text.str( 'foo bar' )
			$mol_assert_equal( text.str(), 'foo bar' )
			$mol_assert_equal( list.items_vary(), [ 'foo', ' bar' ] )
			
			text.str( 'foo  bar' )
			$mol_assert_equal( text.str(), 'foo  bar' )
			$mol_assert_equal( list.items_vary(), [ 'foo', ' ', ' bar' ] )
			
			text.str( 'foo  BarBar' )
			$mol_assert_equal( text.str(), 'foo  BarBar' )
			$mol_assert_equal( list.items_vary(), [ 'foo', ' ', ' Bar', 'Bar' ] )
			
		},
		
		async 'str: Offset <=> Point'( $ ) {
			
			const land = $hyoo_crus_land.make({ $ })
			const text = land.Data( $hyoo_crus_text )
			
			text.str( 'fooBar' )
			const [ first, second ] = text.units()
			
			$mol_assert_equal( text.point_by_offset( 0 ), [ first.self(), 0 ] )
			$mol_assert_equal( text.offset_by_point([ first.self(), 0 ]), [ first.self(), 0 ] )
			
			$mol_assert_equal( text.point_by_offset( 3 ), [ first.self(), 3 ] )
			$mol_assert_equal( text.offset_by_point([ first.self(), 3 ]), [ first.self(), 3 ] )
			$mol_assert_equal( text.offset_by_point([ first.self(), 5 ]), [ first.self(), 5 ] )
			
			$mol_assert_equal( text.point_by_offset( 5 ), [ second.self(), 2 ] )
			$mol_assert_equal( text.offset_by_point([ second.self(), 2 ]), [ second.self(), 5 ] )
			
			$mol_assert_equal( text.point_by_offset( 6 ), [ second.self(), 3 ] )
			$mol_assert_equal( text.offset_by_point([ second.self(), 3 ]), [ second.self(), 6 ] )
			
			$mol_assert_equal( text.point_by_offset( 7 ), [ $hyoo_crus_link.hole, 1 ] )
			$mol_assert_equal( text.offset_by_point([ $hyoo_crus_link.hole, 1 ]), [ $hyoo_crus_link.hole, 7 ] )
			
		},

		async 'text: Offset <=> Point'( $ ) {
			
			const land = $hyoo_crus_land.make({ $ })
			const text = land.Data( $hyoo_crus_text )
			
			text.text( 'foo bar\n666 777' )
			const [ first, second ] = text.nodes( $hyoo_crus_text )
			
			$mol_assert_equal( text.point_by_offset( 0 ), [ first.units()[0].self(), 0 ] )
			$mol_assert_equal( text.offset_by_point([ first.units()[0].self(), 0 ]), [ first.units()[0].self(), 0 ] )
			
			$mol_assert_equal( text.point_by_offset( 8 ), [ first.units()[2].self(), 1 ] )
			$mol_assert_equal( text.offset_by_point([ first.units()[2].self(), 1 ]), [ first.units()[2].self(), 8 ] )
			
		},

		async 'Merge different sequences'( $ ) {
			
			const land1 = $hyoo_crus_land.make({ $ })
			const land2 = $hyoo_crus_land.make({ $ })
			
			const text1 = land1.Node( $hyoo_crus_text ).Data()
			const text2 = land2.Node( $hyoo_crus_text ).Data()
			
			text1.str( 'foo bar.' )
			land2.faces.sync( land1.faces )
			text2.str( 'xxx yyy.' )
			
			const delta1 = land1.delta_units()
			const delta2 = land2.delta_units()
			
			land1.apply_units( delta2 )
			land2.apply_units( delta1 )
	
			$mol_assert_equal(
				text1.str(),
				text2.str(),
				'xxx yyy.foo bar.',
			)
			
		},
		
		async 'Merge same insertions with different changes to same place'( $ ) {
			
			const base = $hyoo_crus_land.make({ $ })
			base.Data( $hyoo_crus_text ).str( '( )' )
			
			const left = $hyoo_crus_land.make({ $ })
			left.apply_units( base.delta_units() )
			left.Data( $hyoo_crus_text ).str( '( [ f ] )' )
			left.Data( $hyoo_crus_text ).str( '( [ foo ] )' )
			
			const right = $hyoo_crus_land.make({ $ })
			right.apply_units( base.delta_units() )
			right.faces.sync( left.faces )
			right.Data( $hyoo_crus_text ).str( '( [ f ] )' )
			right.Data( $hyoo_crus_text ).str( '( [ fu ] )' )
			
			const left_delta = left.delta_units( base.faces )
			const right_delta = right.delta_units( base.faces )
			
			left.apply_units( right_delta )
			right.apply_units( left_delta )
	
			$mol_assert_equal(
				left.Data( $hyoo_crus_text ).str(),
				right.Data( $hyoo_crus_text ).str(),
				'( [ fu ] [ foo ] )',
			)
			
		},
		
	})
}
