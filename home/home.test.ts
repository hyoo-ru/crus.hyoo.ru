namespace $ {
	$mol_test({
		
		async 'Per app profiles'( $ ) {
			
			const base = $.$hyoo_crus_glob.home()
			const hall = await $mol_wire_async( base ).hall_by( $hyoo_crus_dict, null )!
			
			$mol_assert_unique( base.land(), hall )
			
		},

	})
}
