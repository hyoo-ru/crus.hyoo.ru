namespace $ {
	$mol_test({
		
		'Per app profiles'( $ ) {
			
			const realm = $hyoo_crus_realm.make({ $ })
			const base = realm.home()
			const hall = base.hall_by( $hyoo_crus_dict, { '': $hyoo_crus_rank.get } )!
			
			$mol_assert_unique( base.land(), hall )
			
		},

	})
}
