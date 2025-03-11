namespace $.$$ {
	$mol_test({
		
		"Deep lands cascade"( $ ) {
			
			enum Type { Alarm = 'Alarm', Skip = 'Skip' }
			enum Place { SPb = 'SPb', Msk = 'Msk' }
			
			const Target = $hyoo_crus_dict.with({})
			const Targets = $hyoo_crus_empire( $hyoo_crus_list_link_to( ()=> Target ) )
			
			const land = $.$hyoo_crus_glob.home().land()
			const targets = land.Node( Targets ).Data()
			
			const start = new $mol_time_moment( '2024-01-01T12' )
			const before = start.shift( 'PT-1h' )
			const after = start.shift( 'PT1h' )
			
			const pub = [[ null, $hyoo_crus_rank_read ]] as $hyoo_crus_rank_preset
			const target = targets.path( [ Place.SPb, Type.Alarm, start ], pub )!.make( pub )!
			targets.path( [ Place.SPb, Type.Alarm, after ], pub )!.add( target.link() )
			targets.path( [ Place.SPb, Type.Skip, start ], pub )!.add( target.link() )
			targets.path( [ Place.Msk, Type.Alarm, start ], pub )!.add( target.link() )
			
			$mol_assert_equal( targets.keys([]), [ Place.Msk, Place.SPb ] )
			$mol_assert_equal( targets.keys([ Place.SPb ]), [ Type.Skip, Type.Alarm ] )
			$mol_assert_equal( targets.keys([ Place.SPb, Type.Alarm ]), [ after, start ] )
			
			$mol_assert_equal( targets.path([ Place.SPb, Type.Alarm, before ])?.remote_list() ?? [], [] )
			$mol_assert_equal( targets.path([ Place.SPb, Type.Alarm, start ])?.remote_list(), [ target ] )
			$mol_assert_equal( targets.path([ Place.SPb, Type.Alarm, after ])?.remote_list(), [ target ] )
			
		},
		
	})
}
