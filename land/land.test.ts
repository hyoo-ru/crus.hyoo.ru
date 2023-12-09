namespace $ {
	
	const auth1 = $hyoo_cras_auth.from( '_4eLnQsSr5wj6XOzgS5bZa254pkEOf_hg1nReCSR4Zkd-E07aLSwj-II-rZt4ZubInw_f1rZiA0Qa92qR0Gq3I6xYWCkW9Aagc7-97L2P-gI84NaLwdabp_DrZEX3RJTY' )
	const auth2 = $hyoo_cras_auth.from( '_5THYp_Njx6-cAU53dRwdv3z8RBAVK7Z2L3OeZmTp8sCsMNXmdssFljy2fxIMDX_oxTFRrRCvAH7s92kUOVn5YYTPGuZ5fQFOAEeRNGGQ47JVCK3Cy_XDSUDvklZ-3Ix4' )
	
	$mol_test({
		
		'Join'( $ ) {
			
			const land = $hyoo_cras_land.make({ $ })
			$mol_assert_like( land.joined_list(), [] )
			$mol_assert_like( land.lord_rang( land.lord_numb() ), $hyoo_cras_rang.law )
			
			land.join()
			$mol_assert_like( land.joined_list(), [ land.lord_numb() ] )
			
		},
		
		'Give rights'( $ ) {
			
			const land1 = $hyoo_cras_land.make({ $ })
			const land2 = $hyoo_cras_land.make({ $, lord_numb: ()=> land1.lord_numb(), auth: ()=> auth1 })
			
			$mol_assert_like( land1.lord_rang( land1.lord_numb() ), $hyoo_cras_rang.law )
			$mol_assert_like( land1.lord_rang( auth1.lord() ), $hyoo_cras_rang.get )
			
			$mol_assert_fail( ()=> land2.give( auth2.lord(), $hyoo_cras_rang.add ), 'Need add rang to join' )
			$mol_assert_like( land1.lord_rang( auth1.lord() ), $hyoo_cras_rang.get )
			
			land1.give( auth1.lord(), $hyoo_cras_rang.get )
			$mol_assert_like( land1.lord_rang( auth1.lord() ), $hyoo_cras_rang.get )
			
			land1.give( auth1.lord(), $hyoo_cras_rang.add )
			$mol_assert_like( land1.lord_rang( auth1.lord() ), $hyoo_cras_rang.add )
			
			land1.give( auth1.lord(), $hyoo_cras_rang.get )
			$mol_assert_like( land1.lord_rang( auth1.lord() ), $hyoo_cras_rang.get )
			
			land1.give( auth1.lord(), $hyoo_cras_rang.mod )
			$mol_assert_like( land1.lord_rang( auth1.lord() ), $hyoo_cras_rang.mod )
			
			land1.give( auth1.lord(), $hyoo_cras_rang.add )
			$mol_assert_like( land1.lord_rang( auth1.lord() ), $hyoo_cras_rang.add )
			
			land1.give( auth1.lord(), $hyoo_cras_rang.law )
			$mol_assert_like( land1.lord_rang( auth1.lord() ), $hyoo_cras_rang.law )
			
			land1.give( auth1.lord(), $hyoo_cras_rang.mod )
			$mol_assert_like( land1.lord_rang( auth1.lord() ), $hyoo_cras_rang.mod )
			
			land2.apply_unit( land1.delta_unit() )
			$mol_assert_fail( ()=> land2.give( auth2.lord(), $hyoo_cras_rang.add ), 'Need law rang to change rang' )
			
		},
		
		'Post Data and pick Delta'( $ ) {
			
			const land1 = $hyoo_cras_land.make({ $ })
			const land2 = $hyoo_cras_land.make({ $, lord_numb: ()=> land1.lord_numb(), auth: ()=> auth1 })
			
			$mol_assert_like( land1.delta_unit(), [] )
			
			land1.post( 0, 0, 1, new Uint8Array([ 1 ]) )
			$mol_assert_like( land1.delta_unit().length, 2 )
			
			const face = new $hyoo_cras_face( land1.face )
			
			land1.post( 1, 0, 2, new Uint8Array([ 2 ]) )
			$mol_assert_like( land1.delta_unit().length, 3 )
			$mol_assert_like( land1.delta_unit( face ).length, 1 )
			
			land2.apply_unit( land1.delta_unit() )
			
			$mol_assert_fail( ()=> land2.post( 2, 0, 3, new Uint8Array([ 3 ]) ), 'Need add rang to join' )
			$mol_assert_like( land2.delta_unit().length, 3 )
			$mol_assert_like( land2.delta_unit( face ).length, 1 )
			
			land1.give( auth1.lord(), $hyoo_cras_rang.add )
			land2.apply_unit( land1.delta_unit() )
			$mol_assert_fail( ()=> land2.post( 2, 0, 3, new Uint8Array([ 3 ]) ), 'Need mod rang to post any data' )
			$mol_assert_like( land2.delta_unit().length, 5 )
			$mol_assert_like( land2.delta_unit( face ).length, 3 )
			
			land2.post( 2, 0, auth1.peer(), new Uint8Array([ 4 ]) )
			$mol_assert_like( land2.delta_unit().length, 6 )
			$mol_assert_like( land2.delta_unit( face ).length, 4 )
			
			land1.give( auth1.lord(), $hyoo_cras_rang.mod )
			land2.apply_unit( land1.delta_unit() )
			land2.post( 2, 0, 3, new Uint8Array([ 3 ]) )
			$mol_assert_like( land2.delta_unit().length, 7 )
			$mol_assert_like( land2.delta_unit( face ).length, 5 )
			
			land1.give( auth1.lord(), $hyoo_cras_rang.add )
			land2.apply_unit( land1.delta_unit() )
			$mol_assert_like( land2.delta_unit().length, 6 )
			
			land1.give( auth1.lord(), $hyoo_cras_rang.get )
			land2.apply_unit( land1.delta_unit() )
			$mol_assert_like( land2.delta_unit().length, 4 )
			
		},
		
		'Self restriction for Add Rang'( $ ) {
			
			const land1 = $hyoo_cras_land.make({ $ })
			const land2 = $hyoo_cras_land.make({ $, lord_numb: ()=> land1.lord_numb(), auth: ()=> auth2 })
			
			$mol_assert_like( land1.delta_unit(), [] )
			
			land1.give( auth2.lord(), $hyoo_cras_rang.add )
			land2.apply_unit( land1.delta_unit() )
			$mol_assert_like( land2.delta_unit().length, 2 )
			
			const gist1 = land2.post( 0, 0, 0, 'foo' )
			$mol_assert_like( gist1.self(), auth2.peer() )
			$mol_assert_like( land2.delta_unit().length, 4 )
			
			const gist2 = land2.post( 0, 0, 0, 'bar' )
			$mol_assert_like( gist2.self(), auth2.peer() )
			$mol_assert_like( land2.delta_unit().length, 4 )
			
		},
		
		'Home Area no encryption'( $ ) {
			
			const land = $hyoo_cras_land.make({ $ })
			$mol_assert_not( land.secret() )
			
			$mol_assert_fail( ()=> land.encrypt(), 'Home Area never encrypted' )
			$mol_assert_not( land.secret() )
			
		},
		
		async 'Area encryption'( $ ) {
			
			const land = $mol_wire_async( $hyoo_cras_land.make({ $, numb: ()=> 1 }) )
			$mol_assert_not( await land.secret() )
			
			await land.encrypt()
			$mol_assert_ok( await land.secret() )
			
			const gist = await land.post( 0, 0, 0, new Uint8Array([ 1, 2, 3 ]) )
			
			$mol_assert_equal( gist.data().length, 7 )
			$mol_assert_like(
				await land.gist_decode( gist ),
				new Uint8Array([ 1, 2, 3 ]),
			)
			
		},
		
		'Area fork & merge'( $ ) {
			
			const realm = $hyoo_cras_realm.make({ $ })
			const base = realm.home().base().land()
			const left = base.fork()
			
			base.Root( $hyoo_cras_list ).items([ 'foo', 'xxx' ])
			$mol_assert_like( base.Root( $hyoo_cras_list ).items(), [ 'foo', 'xxx' ] )
			$mol_assert_like( left.Root( $hyoo_cras_list ).items(), [ 'foo', 'xxx' ] )
			
			left.face.sync( base.face )
			left.Root( $hyoo_cras_list ).items([ 'foo', 'yyy' ])
			$mol_assert_like( left.Root( $hyoo_cras_list ).items(), [ 'foo', 'yyy' ] )
			
			const right = base.fork()
			right.face.sync( left.face )
			right.Root( $hyoo_cras_list ).items([ 'foo', 'zzz' ])
			$mol_assert_like( right.Root( $hyoo_cras_list ).items(), [ 'foo', 'zzz' ] )
			
			const both = base.fork()
			$mol_assert_like( both.Root( $hyoo_cras_list ).items(), [ 'foo', 'xxx' ] )
			
			both.cloves()!.items([ right.ref() ])
			$mol_assert_like( both.Root( $hyoo_cras_list ).items(), [ 'foo', 'zzz' ] )
			
			both.cloves()!.items([ left.ref() ])
			$mol_assert_like( both.Root( $hyoo_cras_list ).items(), [ 'foo', 'yyy' ] )
			
			both.cloves()!.items([ right.ref(), left.ref() ])
			$mol_assert_like( both.Root( $hyoo_cras_list ).items(), [ 'foo', 'yyy' ] )
			
			both.cloves()!.items([ left.ref(), right.ref() ])
			$mol_assert_like( both.Root( $hyoo_cras_list ).items(), [ 'foo', 'zzz' ] )
			
		},
		
		// async 'Merge text changes'() {
			
		// 	const base = new $hyoo_cras_land( 1n, 1 )
		// 	base.chief.as( $hyoo_crowd_text ).str( 'Hello World and fun!' )
			
		// 	const left = base.fork( await $hyoo_crowd_peer.generate() )
		// 	const right = base.fork( await $hyoo_crowd_peer.generate() )
		// 	right.clock_data.tick( right.peer().id )
			
		// 	left.chief.as( $hyoo_crowd_text ).str( 'Hello Alice and fun!' )
		// 	right.chief.as( $hyoo_crowd_text ).str( 'Bye World and fun!' )
			
		// 	const left_delta = left.delta()
		// 	const right_delta = right.delta()
			
		// 	left.apply( right_delta )
		// 	right.apply( left_delta )

		// 	$mol_assert_equal(
		// 		left.chief.as( $hyoo_crowd_text ).str(),
		// 		right.chief.as( $hyoo_crowd_text ).str(),
		// 		'Bye Alice and fun!',
		// 	)

		// },
		
		// async 'Write into token'() {
			
		// 	const store = new $hyoo_cras_land( 1n, 1 )
		// 	store.chief.as( $hyoo_crowd_text ).str( 'foobar' )
		// 	store.chief.as( $hyoo_crowd_text ).write( 'xyz', 3 )
			
		// 	$mol_assert_like( store.chief.as( $hyoo_crowd_list ).list(), [ 'fooxyzbar' ] )
			
		// },
		
		// async 'Write into token with split'() {
			
		// 	const store = new $hyoo_cras_land( 1n, 1 )
		// 	store.chief.as( $hyoo_crowd_text ).str( 'foobar' )
		// 	store.chief.as( $hyoo_crowd_text ).write( 'XYZ', 2, 4 )
			
		// 	$mol_assert_like( store.chief.as( $hyoo_crowd_list ).list(), [ 'fo', 'XYZar' ] )
			
		// },
		
		// async 'Write over few tokens'() {
			
		// 	const store = new $hyoo_cras_land( 1n, 1 )
		// 	store.chief.as( $hyoo_crowd_text ).str( 'xxx foo bar yyy' )
		// 	store.chief.as( $hyoo_crowd_text ).write( 'X Y Z', 6, 9 )
			
		// 	$mol_assert_like( store.chief.as( $hyoo_crowd_list ).list(), [ 'xxx', ' fo', 'X', ' Y', ' Zar', ' yyy' ] )
			
		// },
		
		// async 'Write whole token'() {
			
		// 	const store = new $hyoo_cras_land( 1n, 1 )
		// 	store.chief.as( $hyoo_crowd_text ).str( 'xxxFoo yyy' )
		// 	store.chief.as( $hyoo_crowd_text ).write( 'bar', 3, 7 )
			
		// 	$mol_assert_like( store.chief.as( $hyoo_crowd_list ).list(), [ 'xxxbaryyy' ] )
			
		// },
		
		// async 'Write whole text'() {
			
		// 	const store = new $hyoo_cras_land( 1n, 1 )
		// 	store.chief.as( $hyoo_crowd_text ).str( 'foo bar' )
		// 	store.chief.as( $hyoo_crowd_text ).write( 'xxx', 0, 7 )
			
		// 	$mol_assert_like( store.chief.as( $hyoo_crowd_list ).list(), [ 'xxx' ] )
			
		// },
		
		// async 'Write at the end'() {
			
		// 	const store = new $hyoo_cras_land( 1n, 1 )
		// 	store.chief.as( $hyoo_crowd_text ).str( 'foo' )
		// 	store.chief.as( $hyoo_crowd_text ).write( 'bar' )
			
		// 	$mol_assert_like( store.chief.as( $hyoo_crowd_list ).list(), [ 'foobar' ] )
			
		// },
		
		// async 'Write between tokens'() {
			
		// 	const store = new $hyoo_cras_land( 1n, 1 )
		// 	store.chief.as( $hyoo_crowd_text ).str( 'foo bar' )
		// 	store.chief.as( $hyoo_crowd_text ).write( 'xxx', 4 )
			
		// 	$mol_assert_like( store.chief.as( $hyoo_crowd_list ).list(), [ 'foo', ' xxxbar' ] )
			
		// },

	})
}
