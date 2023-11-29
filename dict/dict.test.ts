namespace $.$$ {
	
	const auth1 = $hyoo_crowds_auth.from( '_4eLnQsSr5wj6XOzgS5bZa254pkEOf_hg1nReCSR4Zkd-E07aLSwj-II-rZt4ZubInw_f1rZiA0Qa92qR0Gq3I6xYWCkW9Aagc7-97L2P-gI84NaLwdabp_DrZEX3RJTY' )
	
	$mol_test({
		
		async 'Dictionary invariants'( $ ) {
			
			const area = $hyoo_crowds_area.make({ $ })
			const dict = area.Node( $hyoo_crowds_dict ).Item(0)
			$mol_assert_like( dict.keys(), [] )
			
			dict.dive( 123, $hyoo_crowds_reg )
			dict.dive( 'xxx', $hyoo_crowds_reg )
			$mol_assert_like( dict.keys(), [ 'xxx', 123 ] )
			$mol_assert_ok( dict.has( 123 ) )
			$mol_assert_ok( dict.has( 'xxx' ) )
			$mol_assert_not( dict.has( 'yyy' ) )
			$mol_assert_like( dict.dive( 123, $hyoo_crowds_reg ).value(), null )
			$mol_assert_like( dict.dive( 'xxx', $hyoo_crowds_reg ).value(), null )
			
			dict.dive( 123, $hyoo_crowds_reg ).value( 777 )
			$mol_assert_like( dict.dive( 123, $hyoo_crowds_reg ).value(), 777 )

			dict.dive( 'xxx', $hyoo_crowds_list ).items([ 'foo', 'bar' ])
			$mol_assert_like( dict.dive( 'xxx', $hyoo_crowds_list ).items(), [ 'foo', 'bar' ] )
			
			dict.has( 123, false )
			$mol_assert_like( dict.keys(), [ 'xxx' ] )

		},
		
		async 'Dictionary merge'( $ ) {
			
			const area1 = $hyoo_crowds_area.make({ $ })
			const area2 = $hyoo_crowds_area.make({ $ })
			
			const dict1 = area1.Node( $hyoo_crowds_dict ).Item(0)
			const dict2 = area2.Node( $hyoo_crowds_dict ).Item(0)

			dict1.dive( 123, $hyoo_crowds_reg ).value( 666 )
			area2.face.tick( area2.auth().peer() )
			dict2.dive( 123, $hyoo_crowds_reg ).value( 777 )
			area1.apply_unit( area2.delta_unit() )
			$mol_assert_like( dict1.dive( 123, $hyoo_crowds_reg ).value(), 777 )
			
			dict1.dive( 'xxx', $hyoo_crowds_list ).items([ 'foo' ])
			area2.face.tick( area2.auth().peer() )
			dict2.dive( 'xxx', $hyoo_crowds_list ).items([ 'bar' ])
			area1.apply_unit( area2.delta_unit() )
			$mol_assert_like( dict1.dive( 'xxx', $hyoo_crowds_list ).items(), [ 'bar', 'foo' ] )

		},
		
	})
	
}
