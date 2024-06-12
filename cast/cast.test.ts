namespace $ {
	
	$mol_test({
		
		'Atom <=> List'( $ ) {
			
			const land = $hyoo_crus_land.make({ $ })
			const reg = land.Node( $hyoo_crus_atom_vary ).Item('')
			const list = land.Node( $hyoo_crus_list_vary ).Item('')
			
			reg.vary( 1 )
			$mol_assert_equal( list.items_vary(), [1] )
			
			list.items_vary([ 1, 2 ])
			$mol_assert_equal( reg.vary(), 1 )
			
			list.add( 3 )
			$mol_assert_equal( reg.vary(), 3 )
			
			list.splice( [4], 0 )
			$mol_assert_equal( reg.vary(), 4 )
			
			reg.vary( 5 )
			$mol_assert_equal( list.items_vary(), [ 5, 3, 1, 2 ] )
			
		},
		
		'Atom <=> Dict'( $ ) {
			
			const land = $hyoo_crus_land.make({ $ })
			const reg = land.Node( $hyoo_crus_atom_vary ).Item('')
			const dict = land.Node( $hyoo_crus_dict ).Item('')
			
			reg.vary( 1 )
			$mol_assert_equal( dict.keys(), [1] )
			
			dict.dive( 2, $hyoo_crus_atom_vary, null )!.vary( 'foo' )
			$mol_assert_equal( reg.vary(), 2 )
			
			dict.has( 1, false )
			$mol_assert_equal( reg.vary(), 2 )
			
			reg.vary( 3 )
			$mol_assert_equal( dict.dive( 2, $hyoo_crus_atom_vary )?.vary() ?? null, null )
			$mol_assert_equal( dict.dive( 3, $hyoo_crus_atom_vary )!.vary(), 'foo' )
			
		},
		
	})
	
}
