namespace $ {
	
	$mol_test({
		
		'Reg <=> List'( $ ) {
			
			const land = $hyoo_crowds_land.make({ $ })
			const reg = land.Node( $hyoo_crowds_reg ).Item(0)
			const list = land.Node( $hyoo_crowds_list ).Item(0)
			
			reg.value_vary( 1 )
			$mol_assert_like( list.items(), [1] )
			
			list.items([ 1, 2 ])
			$mol_assert_like( reg.value_vary(), 1 )
			
			list.add( 3 )
			$mol_assert_like( reg.value_vary(), 3 )
			
			list.splice( [4], 0 )
			$mol_assert_like( reg.value_vary(), 4 )
			
			reg.value_vary( 5 )
			$mol_assert_like( list.items(), [ 5, 3, 1, 2 ] )
			
		},
		
		'Reg <=> Dict'( $ ) {
			
			const land = $hyoo_crowds_land.make({ $ })
			const reg = land.Node( $hyoo_crowds_reg ).Item(0)
			const dict = land.Node( $hyoo_crowds_dict ).Item(0)
			
			reg.value_vary( 1 )
			$mol_assert_like( dict.keys(), [1] )
			
			dict.dive( 2, $hyoo_crowds_reg ).value_vary( 'foo' )
			$mol_assert_like( reg.value_vary(), 2 )
			
			dict.has( 1, false )
			$mol_assert_like( reg.value_vary(), 2 )
			
			reg.value_vary( 3 )
			$mol_assert_like( dict.dive( 2, $hyoo_crowds_reg ).value_vary(), null )
			$mol_assert_like( dict.dive( 3, $hyoo_crowds_reg ).value_vary(), 'foo' )
			
		},
		
	})
	
}
