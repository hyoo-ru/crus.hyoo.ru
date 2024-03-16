namespace $ {
	$mol_test({
		
		'Per app profiles'( $ ) {
			
			const realm = $hyoo_crus_realm.make({ $ })
			const base = realm.home().base()
			const profile1 = base.Profile( 'my_foo', null )!
			const profile2 = base.Profile( 'my_bar', null )!
			
			$mol_assert_unique( base.land(), profile1, profile2 )
			$mol_assert_equal( base.profiles(), [ 'my_bar', 'my_foo' ] )
			
		},

	})
}
