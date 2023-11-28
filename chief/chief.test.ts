namespace $ {
	$mol_test({
		
		'Per app profiles'( $ ) {
			
			const realm = $hyoo_crowds_realm.make({ $ })
			const chief = realm.land_auth().home()
			const profile1 = chief.Profile( 'my_foo' )
			const profile2 = chief.Profile( 'my_bar' )
			
			$mol_assert_unique( chief.land()!.home().area(), profile1, profile2 )
			$mol_assert_equal( chief.land(), profile1.land(), profile2.land() )
			$mol_assert_like( chief.profiles(), [ 'my_foo', 'my_bar' ] )
			
		},

	})
}
