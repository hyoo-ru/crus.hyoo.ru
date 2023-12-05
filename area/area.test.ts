namespace $ {
	
	const auth1 = $hyoo_crowds_auth.from( '_4eLnQsSr5wj6XOzgS5bZa254pkEOf_hg1nReCSR4Zkd-E07aLSwj-II-rZt4ZubInw_f1rZiA0Qa92qR0Gq3I6xYWCkW9Aagc7-97L2P-gI84NaLwdabp_DrZEX3RJTY' )
	const auth2 = $hyoo_crowds_auth.from( '_5THYp_Njx6-cAU53dRwdv3z8RBAVK7Z2L3OeZmTp8sCsMNXmdssFljy2fxIMDX_oxTFRrRCvAH7s92kUOVn5YYTPGuZ5fQFOAEeRNGGQ47JVCK3Cy_XDSUDvklZ-3Ix4' )
	
	$mol_test({
		
		'Join'( $ ) {
			
			const area = $hyoo_crowds_area.make({ $ })
			$mol_assert_like( area.joined_list(), [] )
			$mol_assert_like( area.lord_rang( area.lord() ), $hyoo_crowds_rang.law )
			
			area.join()
			$mol_assert_like( area.joined_list(), [ area.lord() ] )
			
		},
		
		'Give rights'( $ ) {
			
			const area = $hyoo_crowds_area.make({ $ })
			const area1 = $hyoo_crowds_area.make({ $, lord: ()=> area.lord(), auth: ()=> auth1 })
			
			$mol_assert_like( area.lord_rang( area.lord() ), $hyoo_crowds_rang.law )
			$mol_assert_like( area.lord_rang( auth1.lord() ), $hyoo_crowds_rang.get )
			
			$mol_assert_fail( ()=> area1.give( auth2.lord(), $hyoo_crowds_rang.add ), 'Need add rang to join' )
			$mol_assert_like( area.lord_rang( auth1.lord() ), $hyoo_crowds_rang.get )
			
			area.give( auth1.lord(), $hyoo_crowds_rang.get )
			$mol_assert_like( area.lord_rang( auth1.lord() ), $hyoo_crowds_rang.get )
			
			area.give( auth1.lord(), $hyoo_crowds_rang.add )
			$mol_assert_like( area.lord_rang( auth1.lord() ), $hyoo_crowds_rang.add )
			
			area.give( auth1.lord(), $hyoo_crowds_rang.get )
			$mol_assert_like( area.lord_rang( auth1.lord() ), $hyoo_crowds_rang.get )
			
			area.give( auth1.lord(), $hyoo_crowds_rang.mod )
			$mol_assert_like( area.lord_rang( auth1.lord() ), $hyoo_crowds_rang.mod )
			
			area.give( auth1.lord(), $hyoo_crowds_rang.add )
			$mol_assert_like( area.lord_rang( auth1.lord() ), $hyoo_crowds_rang.add )
			
			area.give( auth1.lord(), $hyoo_crowds_rang.law )
			$mol_assert_like( area.lord_rang( auth1.lord() ), $hyoo_crowds_rang.law )
			
			area.give( auth1.lord(), $hyoo_crowds_rang.mod )
			$mol_assert_like( area.lord_rang( auth1.lord() ), $hyoo_crowds_rang.mod )
			
			area1.apply_unit( area.delta_unit() )
			$mol_assert_fail( ()=> area1.give( auth2.lord(), $hyoo_crowds_rang.add ), 'Need law rang to change rang' )
			
		},
		
		'Post Data and pick Delta'( $ ) {
			
			const area = $hyoo_crowds_area.make({ $ })
			const area1 = $hyoo_crowds_area.make({ $, lord: ()=> area.lord(), auth: ()=> auth1 })
			
			$mol_assert_like( area.delta_unit(), [] )
			
			area.post( 0, 0, 1, new Uint8Array([ 1 ]) )
			$mol_assert_like( area.delta_unit().length, 2 )
			
			const face = new $hyoo_crowds_face( area.face )
			
			area.post( 1, 0, 2, new Uint8Array([ 2 ]) )
			$mol_assert_like( area.delta_unit().length, 3 )
			$mol_assert_like( area.delta_unit( face ).length, 1 )
			
			area1.apply_unit( area.delta_unit() )
			
			$mol_assert_fail( ()=> area1.post( 2, 0, 3, new Uint8Array([ 3 ]) ), 'Need add rang to join' )
			$mol_assert_like( area1.delta_unit().length, 3 )
			$mol_assert_like( area1.delta_unit( face ).length, 1 )
			
			area.give( auth1.lord(), $hyoo_crowds_rang.add )
			area1.apply_unit( area.delta_unit() )
			$mol_assert_fail( ()=> area1.post( 2, 0, 3, new Uint8Array([ 3 ]) ), 'Need mod rang to post any data' )
			$mol_assert_like( area1.delta_unit().length, 5 )
			$mol_assert_like( area1.delta_unit( face ).length, 3 )
			
			area1.post( 2, 0, auth1.peer(), new Uint8Array([ 4 ]) )
			$mol_assert_like( area1.delta_unit().length, 6 )
			$mol_assert_like( area1.delta_unit( face ).length, 4 )
			
			area.give( auth1.lord(), $hyoo_crowds_rang.mod )
			area1.apply_unit( area.delta_unit() )
			area1.post( 2, 0, 3, new Uint8Array([ 3 ]) )
			$mol_assert_like( area1.delta_unit().length, 7 )
			$mol_assert_like( area1.delta_unit( face ).length, 5 )
			
			area.give( auth1.lord(), $hyoo_crowds_rang.add )
			area1.apply_unit( area.delta_unit() )
			$mol_assert_like( area1.delta_unit().length, 6 )
			
			area.give( auth1.lord(), $hyoo_crowds_rang.get )
			area1.apply_unit( area.delta_unit() )
			$mol_assert_like( area1.delta_unit().length, 4 )
			
		},
		
		'Self restriction for Add Rang'( $ ) {
			
			const area1 = $hyoo_crowds_area.make({ $ })
			const area2 = $hyoo_crowds_area.make({ $, lord: ()=> area1.lord(), auth: ()=> auth2 })
			
			$mol_assert_like( area1.delta_unit(), [] )
			
			area1.give( auth2.lord(), $hyoo_crowds_rang.add )
			area2.apply_unit( area1.delta_unit() )
			$mol_assert_like( area2.delta_unit().length, 2 )
			
			const gist1 = area2.post( 0, 0, 0, 'foo' )
			$mol_assert_like( gist1.self(), auth2.peer() )
			$mol_assert_like( area2.delta_unit().length, 4 )
			
			const gist2 = area2.post( 0, 0, 0, 'bar' )
			$mol_assert_like( gist2.self(), auth2.peer() )
			$mol_assert_like( area2.delta_unit().length, 4 )
			
		},
		
		'Home Area no encryption'( $ ) {
			
			const area = $hyoo_crowds_area.make({ $ })
			$mol_assert_not( area.secret() )
			
			$mol_assert_fail( ()=> area.encrypt(), 'Home Area never encrypted' )
			$mol_assert_not( area.secret() )
			
		},
		
		async 'Area encryption'( $ ) {
			
			const area = $mol_wire_async( $hyoo_crowds_area.make({ $, numb: ()=> 1 }) )
			$mol_assert_not( await area.secret() )
			
			await area.encrypt()
			$mol_assert_ok( await area.secret() )
			
			const gist = await area.post( 0, 0, 0, new Uint8Array([ 1, 2, 3 ]) )
			
			$mol_assert_equal( gist.data().length, 7 )
			$mol_assert_like(
				await area.gist_decode( gist ),
				new Uint8Array([ 1, 2, 3 ]),
			)
			
		},
		
		// async 'Insert after removed out'() {
			
		// 	const base = new $hyoo_crowds_land( 1n, 1 )
		// 	base.node( '1_1', $hyoo_crowd_text ).str( 'FooBarZak' )
			
		// 	const left = base.fork( await $hyoo_crowd_peer.generate() )
		// 	left.node( '1_1', $hyoo_crowd_text ).str( 'FooBarXxxZak' )
			
		// 	const right = base.fork( await $hyoo_crowd_peer.generate() )
		// 	right.clock_data.tick( right.peer().id )
		// 	right.insert( right.node( '1_1', $hyoo_crowd_node ).units()[1], '2_2', 0 )
			
		// 	const left_delta = left.delta( base.clocks )
		// 	const right_delta = right.delta( base.clocks )
			
		// 	left.apply( right_delta )
		// 	right.apply( left_delta )
	
		// 	$mol_assert_like(
		// 		left.node( '1_1', $hyoo_crowd_text ).str(),
		// 		right.node( '1_1', $hyoo_crowd_text ).str(),
		// 		'FooZakXxx',
		// 	)
			
		// 	$mol_assert_like(
		// 		left.node( '2_2', $hyoo_crowd_text ).str(),
		// 		left.node( '2_2', $hyoo_crowd_text ).str(),
		// 		'Bar',
		// 	)
			
		// },
		
		// async 'Insert before changed'() {
			
		// 	const base = new $hyoo_crowds_land( 1n, 1 )
		// 	base.chief.as( $hyoo_crowd_text ).str( 'XxxYyyZzz' )
			
		// 	const left = base.fork( await $hyoo_crowd_peer.generate() )
		// 	left.chief.as( $hyoo_crowd_text ).str( 'XxxFooYyyZzz' )
			
		// 	const right = base.fork( await $hyoo_crowd_peer.generate() )
		// 	right.clock_data.tick( right.peer().id )
		// 	right.chief.as( $hyoo_crowd_text ).str( 'XxxBarZzz' )
			
		// 	const left_delta = left.delta( base.clocks )
		// 	const right_delta = right.delta( base.clocks )
			
		// 	left.apply( right_delta )
		// 	right.apply( left_delta )
	
		// 	$mol_assert_like(
		// 		left.chief.as( $hyoo_crowd_text ).str(),
		// 		right.chief.as( $hyoo_crowd_text ).str(),
		// 		'XxxBarFooZzz',
		// 	)
			
		// },
		
		// async 'Insert between moved'() {
			
		// 	const base = new $hyoo_crowds_land( 1n, 1 )
		// 	base.chief.as( $hyoo_crowd_list ).list([ 111, 222, 333, 444, 555, 666 ])
			
		// 	const left = base.fork( await $hyoo_crowd_peer.generate() )
		// 	left.chief.as( $hyoo_crowd_list ).list([ 111, 222, 777, 333, 444, 555, 666 ])
			
		// 	const right = base.fork( await $hyoo_crowd_peer.generate() )
		// 	right.clock_data.tick( right.peer().id )
		// 	right.insert( right.chief.units()[1], '0_0', 5 )
		// 	right.insert( right.chief.units()[1], '0_0', 5 )
			
		// 	const left_delta = left.delta( base.clocks )
		// 	const right_delta = right.delta( base.clocks )
			
		// 	left.apply( right_delta )
		// 	right.apply( left_delta )
	
		// 	$mol_assert_like(
		// 		left.chief.as( $hyoo_crowd_list ).list(),
		// 		right.chief.as( $hyoo_crowd_list ).list(),
		// 		[ 111, 444, 555, 222, 333, 777, 666 ],
		// 	)
			
		// },
		
		// async 'Merge text changes'() {
			
		// 	const base = new $hyoo_crowds_land( 1n, 1 )
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
			
		// 	const store = new $hyoo_crowds_land( 1n, 1 )
		// 	store.chief.as( $hyoo_crowd_text ).str( 'foobar' )
		// 	store.chief.as( $hyoo_crowd_text ).write( 'xyz', 3 )
			
		// 	$mol_assert_like( store.chief.as( $hyoo_crowd_list ).list(), [ 'fooxyzbar' ] )
			
		// },
		
		// async 'Write into token with split'() {
			
		// 	const store = new $hyoo_crowds_land( 1n, 1 )
		// 	store.chief.as( $hyoo_crowd_text ).str( 'foobar' )
		// 	store.chief.as( $hyoo_crowd_text ).write( 'XYZ', 2, 4 )
			
		// 	$mol_assert_like( store.chief.as( $hyoo_crowd_list ).list(), [ 'fo', 'XYZar' ] )
			
		// },
		
		// async 'Write over few tokens'() {
			
		// 	const store = new $hyoo_crowds_land( 1n, 1 )
		// 	store.chief.as( $hyoo_crowd_text ).str( 'xxx foo bar yyy' )
		// 	store.chief.as( $hyoo_crowd_text ).write( 'X Y Z', 6, 9 )
			
		// 	$mol_assert_like( store.chief.as( $hyoo_crowd_list ).list(), [ 'xxx', ' fo', 'X', ' Y', ' Zar', ' yyy' ] )
			
		// },
		
		// async 'Write whole token'() {
			
		// 	const store = new $hyoo_crowds_land( 1n, 1 )
		// 	store.chief.as( $hyoo_crowd_text ).str( 'xxxFoo yyy' )
		// 	store.chief.as( $hyoo_crowd_text ).write( 'bar', 3, 7 )
			
		// 	$mol_assert_like( store.chief.as( $hyoo_crowd_list ).list(), [ 'xxxbaryyy' ] )
			
		// },
		
		// async 'Write whole text'() {
			
		// 	const store = new $hyoo_crowds_land( 1n, 1 )
		// 	store.chief.as( $hyoo_crowd_text ).str( 'foo bar' )
		// 	store.chief.as( $hyoo_crowd_text ).write( 'xxx', 0, 7 )
			
		// 	$mol_assert_like( store.chief.as( $hyoo_crowd_list ).list(), [ 'xxx' ] )
			
		// },
		
		// async 'Write at the end'() {
			
		// 	const store = new $hyoo_crowds_land( 1n, 1 )
		// 	store.chief.as( $hyoo_crowd_text ).str( 'foo' )
		// 	store.chief.as( $hyoo_crowd_text ).write( 'bar' )
			
		// 	$mol_assert_like( store.chief.as( $hyoo_crowd_list ).list(), [ 'foobar' ] )
			
		// },
		
		// async 'Write between tokens'() {
			
		// 	const store = new $hyoo_crowds_land( 1n, 1 )
		// 	store.chief.as( $hyoo_crowd_text ).str( 'foo bar' )
		// 	store.chief.as( $hyoo_crowd_text ).write( 'xxx', 4 )
			
		// 	$mol_assert_like( store.chief.as( $hyoo_crowd_list ).list(), [ 'foo', ' xxxbar' ] )
			
		// },

	})
}
