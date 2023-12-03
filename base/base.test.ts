namespace $ {
	$mol_test({
		
		'Per app profiles'( $ ) {
			
			const realm = $hyoo_crowds_realm.make({ $ })
			const base = realm.home().base()
			const profile1 = base.Profile( 'my_foo' )
			const profile2 = base.Profile( 'my_bar' )
			
			$mol_assert_unique( base.land()!.base().area(), profile1, profile2 )
			$mol_assert_equal( base.land(), profile1.land(), profile2.land() )
			$mol_assert_like( base.profiles(), [ 'my_bar', 'my_foo' ] )
			
		},

	})
}
