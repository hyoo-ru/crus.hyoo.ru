namespace $.$$ {
	$mol_test({
		
		"Deep cascade"( $ ) {
			
			const Target = $hyoo_crus_dict.with({})
			const Targets = $hyoo_crus_empire( $hyoo_crus_list_ref_to( ()=> Target ) )
			
			const realm = $hyoo_crus_realm.make({ $ })
			const land = realm.home().land()
			const targets = land.Node( Targets ).Item('')
			
			const pub = { '': $hyoo_crus_rank.get }
			const target = targets.path( [ 'SPb', 'Alarm', '2024-01-01T12' ], pub )!.remote_make( pub )!
			targets.path( [ 'SPb', 'Alarm', '2024-01-01T13' ], pub )!.add( target.ref() )
			
			$mol_assert_equal( targets.path([ 'SPb', 'Alarm', '2024-01-01T11' ])?.remote_list() ?? [], [] )
			$mol_assert_equal( targets.path([ 'SPb', 'Alarm', '2024-01-01T12' ])?.remote_list(), [ target ] )
			$mol_assert_equal( targets.path([ 'SPb', 'Alarm', '2024-01-01T13' ])?.remote_list(), [ target ] )
			$mol_assert_equal( targets.keys([ 'SPb', 'Alarm' ]), [ '2024-01-01T13', '2024-01-01T12' ] )
			
		},
		
	})
}
