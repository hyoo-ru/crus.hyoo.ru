namespace $ {
	$mol_test({
		
		'Per app profiles'( $ ) {
			
			const realm = $hyoo_cras_realm.make({ $ })
			const base = realm.home().base()
			const profile1 = base.Profile( 'my_foo' )
			const profile2 = base.Profile( 'my_bar' )
			
			$mol_assert_unique( base.lord()!.base().land(), profile1, profile2 )
			$mol_assert_equal( base.lord(), profile1.lord(), profile2.lord() )
			$mol_assert_like( base.profiles(), [ 'my_bar', 'my_foo' ] )
			
		},

	})
}
