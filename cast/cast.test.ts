namespace $ {
	
	$mol_test({
		
		'Reg <=> List'( $ ) {
			
			const land = $hyoo_crus_land.make({ $ })
			const reg = land.Node( $hyoo_crus_reg ).Item('')
			const list = land.Node( $hyoo_crus_list ).Item('')
			
			reg.value_vary( 1 )
			$mol_assert_equal( list.items(), [1] )
			
			list.items([ 1, 2 ])
			$mol_assert_equal( reg.value_vary(), 1 )
			
			list.add( 3 )
			$mol_assert_equal( reg.value_vary(), 3 )
			
			list.splice( [4], 0 )
			$mol_assert_equal( reg.value_vary(), 4 )
			
			reg.value_vary( 5 )
			$mol_assert_equal( list.items(), [ 5, 3, 1, 2 ] )
			
		},
		
		'Reg <=> Dict'( $ ) {
			
			const land = $hyoo_crus_land.make({ $ })
			const reg = land.Node( $hyoo_crus_reg ).Item('')
			const dict = land.Node( $hyoo_crus_dict ).Item('')
			
			reg.value_vary( 1 )
			$mol_assert_equal( dict.keys(), [1] )
			
			dict.dive( 2, $hyoo_crus_reg ).value_vary( 'foo' )
			$mol_assert_equal( reg.value_vary(), 2 )
			
			dict.has( 1, false )
			$mol_assert_equal( reg.value_vary(), 2 )
			
			reg.value_vary( 3 )
			$mol_assert_equal( dict.dive( 2, $hyoo_crus_reg ).value_vary(), null )
			$mol_assert_equal( dict.dive( 3, $hyoo_crus_reg ).value_vary(), 'foo' )
			
		},
		
	})
	
}
