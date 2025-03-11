namespace $ {
	$mol_test({
		
		'Per app profiles'( $ ) {
			
			const base = $.$hyoo_crus_glob.home()
			const hall = base.hall_by( $hyoo_crus_dict, null )!
			
			$mol_assert_unique( base.land(), hall )
			
		},

	})
}
