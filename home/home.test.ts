namespace $ {
	$mol_test({
		
		'Per app profiles'( $ ) {
			
			const realm = $hyoo_crus_realm.make({ $ })
			const base = realm.home()
			const profile1 = base.room( 'my_foo', $hyoo_crus_dict, $hyoo_crus_rank_public )!
			const profile2 = base.room( 'my_bar', $hyoo_crus_dict, $hyoo_crus_rank_public )!
			
			$mol_assert_unique( base.land(), profile1, profile2 )
			$mol_assert_equal( base.Rooms?.keys(), [ 'my_bar', 'my_foo' ] )
			
		},

	})
}
