namespace $ {
	
	const auth1 = $hyoo_crus_auth.from( '_4eLnQsSr5wj6XOzgS5bZa254pkEOf_hg1nReCSR4Zkd-E07aLSwj-II-rZt4ZubInw_f1rZiA0Qa92qR0Gq3I6xYWCkW9Aagc7-97L2P-gI84NaLwdabp_DrZEX3RJTY' )
	const auth2 = $hyoo_crus_auth.from( '_5THYp_Njx6-cAU53dRwdv3z8RBAVK7Z2L3OeZmTp8sCsMNXmdssFljy2fxIMDX_oxTFRrRCvAH7s92kUOVn5YYTPGuZ5fQFOAEeRNGGQ47JVCK3Cy_XDSUDvklZ-3Ix4' )
	
	$mol_test({
		
		'Give rights'( $ ) {
			
			const land0 = $hyoo_crus_land.make({ $ })
			const land1 = $hyoo_crus_land.make({ $, link: ()=> land0.link(), auth: ()=> auth1 })
			
			$mol_assert_equal( land0.lord_rank( land0.link() ), $hyoo_crus_rank_rule )
			$mol_assert_equal( land0.lord_rank( auth1.pass().lord() ), $hyoo_crus_rank_read )
			
			$mol_assert_fail( ()=> land1.give( auth2.pass(), $hyoo_crus_rank_post( 'just' ) ), 'Too low Tier' )
			$mol_assert_equal( land0.pass_rank( auth1.pass() ), $hyoo_crus_rank_read )
			
			land0.give( auth1.pass(), $hyoo_crus_rank_read )
			$mol_assert_equal( land0.pass_rank( auth1.pass() ), $hyoo_crus_rank_read )
			
			land0.give( auth1.pass(), $hyoo_crus_rank_read )
			$mol_assert_equal( land0.pass_rank( auth1.pass() ), $hyoo_crus_rank_read )
			
			land0.give( auth1.pass(), $hyoo_crus_rank_post( 'just' ) )
			$mol_assert_equal( land0.pass_rank( auth1.pass() ), $hyoo_crus_rank_post( 'just' ) )
			
			land0.give( auth1.pass(), $hyoo_crus_rank_pull( 'just' ) )
			$mol_assert_equal( land0.pass_rank( auth1.pass() ), $hyoo_crus_rank_pull( 'just' ) )
			
			land0.give( auth1.pass(), $hyoo_crus_rank_rule )
			$mol_assert_equal( land0.pass_rank( auth1.pass() ), $hyoo_crus_rank_rule )
			
			land0.give( auth1.pass(), $hyoo_crus_rank_post( 'just' ) )
			$mol_assert_equal( land0.pass_rank( auth1.pass() ), $hyoo_crus_rank_post( 'just' ) )
			
			land1.diff_apply( land0.diff_units(), 'skip_load' )
			$mol_assert_equal( land1.pass_rank( auth1.pass() ), $hyoo_crus_rank_post( 'just' ) )
			$mol_assert_fail( ()=> land1.give( auth2.pass(), $hyoo_crus_rank_post( 'just' ) ), 'Too low Tier' )
			
		},
		
		'Post Data and pick Delta'( $ ) {
			
			const land1 = $hyoo_crus_land.make({ $ })
			const land2 = $hyoo_crus_land.make({ $, link: ()=> land1.link(), auth: ()=> auth2 })
			
			$mol_assert_equal( land1.diff_units(), [] )
			
			land1.post( $hyoo_crus_link.hole, $hyoo_crus_link.hole, new $hyoo_crus_link( 'AA111111' ), new Uint8Array([ 1 ]) )
			$mol_assert_equal( land1.diff_units().length, 3 )
			
			const face = land1.faces.clone()
			
			land1.post( new $hyoo_crus_link( 'AA111111' ), $hyoo_crus_link.hole, new $hyoo_crus_link( 'AA222222' ), new Uint8Array([ 2 ]) )
			$mol_assert_equal( land1.diff_units().length, 4 )
			$mol_assert_equal( land1.diff_units( face ).length, 1 )
			
			land2.diff_apply( land1.diff_units() )
			
			$mol_assert_fail( ()=> land2.post( new $hyoo_crus_link( 'AA222222' ), $hyoo_crus_link.hole, new $hyoo_crus_link( 'AA333333' ), new Uint8Array([ 3 ]) ), 'Too low Tier' )
			$mol_assert_equal( land2.diff_units().length, 4 )
			$mol_assert_equal( land2.diff_units( face ).length, 1 )
			
			land1.give( auth2.pass(), $hyoo_crus_rank_post( 'just' ) )
			land2.diff_apply( land1.diff_units() )
			land2.post( new $hyoo_crus_link( 'AA222222' ), $hyoo_crus_link.hole, new $hyoo_crus_link( 'AA333333' ), new Uint8Array([ 5 ]) )
			$mol_assert_equal( land2.diff_units().length, 7 )
			$mol_assert_equal( land2.diff_units( face ).length, 4 )
			
			land1.give( auth2.pass(), $hyoo_crus_rank_read )
			land2.diff_apply( land1.diff_units() )
			$mol_assert_equal( land2.diff_units().length, 6 )
			
		},
		
		async 'Land encryption'( $ ) {
			
			const land = $mol_wire_async( $hyoo_crus_land.make({ $ }) )
			$mol_assert_equal( await land.encrypted(), false )
			
			await land.encrypted( true )
			$mol_assert_equal( await land.encrypted(), true )
			
			const sand = await land.post( $hyoo_crus_link.hole, $hyoo_crus_link.hole, $hyoo_crus_link.hole, new Uint8Array([ 1, 2, 3 ]) )
			
			$mol_assert_equal( ( await land.sand_encode( sand ) ).data().length, 16 )
			$mol_assert_equal(
				await land.sand_decode( sand ),
				new Uint8Array([ 1, 2, 3 ]),
			)
			$mol_assert_equal( ( await land.sand_ordered({ head: $hyoo_crus_link.hole, peer: $hyoo_crus_link.hole }) ).length, 1 )
			
			await land.post( $hyoo_crus_link.hole, $hyoo_crus_link.hole, sand.self(), null )
			$mol_assert_equal( ( await land.sand_ordered({ head: $hyoo_crus_link.hole, peer: $hyoo_crus_link.hole }) ).length, 1 )
		},
		
		'Land fork & merge'( $ ) {
			
			const home = $.$hyoo_crus_glob.home().land()
			const left = home.fork()
			
			home.Data( $hyoo_crus_list_vary ).items_vary([ 'foo', 'xxx' ])
			$mol_assert_equal( home.Data( $hyoo_crus_list_vary ).items_vary(), [ 'foo', 'xxx' ] )
			$mol_assert_equal( left.Data( $hyoo_crus_list_vary ).items_vary(), [ 'foo', 'xxx' ] )
			
			left.faces.sync( home.faces )
			left.Data( $hyoo_crus_list_vary ).items_vary([ 'foo', 'yyy' ])
			$mol_assert_equal( left.Data( $hyoo_crus_list_vary ).items_vary(), [ 'foo', 'yyy' ] )
			
			const right = home.fork()
			right.faces.sync( left.faces )
			right.Data( $hyoo_crus_list_vary ).items_vary([ 'foo', 'zzz' ])
			$mol_assert_equal( right.Data( $hyoo_crus_list_vary ).items_vary(), [ 'foo', 'zzz' ] )
			
			const both = home.fork()
			$mol_assert_equal( both.Data( $hyoo_crus_list_vary ).items_vary(), [ 'foo', 'xxx' ] )
			
			both.Tine().items_vary([ right.link() ])
			$mol_assert_equal( both.Data( $hyoo_crus_list_vary ).items_vary(), [ 'foo', 'zzz' ] )
			
			both.Tine().items_vary([ left.link() ])
			$mol_assert_equal( both.Data( $hyoo_crus_list_vary ).items_vary(), [ 'foo', 'yyy' ] )
			
			both.Tine().items_vary([ right.link(), left.link() ])
			$mol_assert_equal( both.Data( $hyoo_crus_list_vary ).items_vary(), [ 'foo', 'yyy' ] )
			
			both.Tine().items_vary([ left.link(), right.link() ])
			$mol_assert_equal( both.Data( $hyoo_crus_list_vary ).items_vary(), [ 'foo', 'zzz' ] )
			
		},
		
		'Inner Lins is relative to Land'( $ ) {
			
			const Alice = $.$hyoo_crus_glob.home().land()
			const Bella = Alice.fork()
			
			const alice_val = Alice.Node( $hyoo_crus_atom_str ).Item( new $hyoo_crus_link( 'qwertyui' ) )
			const bella_val = Bella.Node( $hyoo_crus_atom_str ).Item( new $hyoo_crus_link( 'qwertyui' ) )
			
			alice_val.val( 'Alice' )
			bella_val.val( 'Bella' )
			
			const alice_link = Alice.Node( $hyoo_crus_atom_link ).Item( new $hyoo_crus_link( 'asdfghjk' ) )
			const bella_link = Bella.Node( $hyoo_crus_atom_link ).Item( new $hyoo_crus_link( 'asdfghjk' ) )
			
			alice_link.val( alice_val.link() )
			$mol_assert_equal( alice_link.val(), alice_val.link() )
			$mol_assert_unique( alice_link.val(), bella_link.val() )
			$mol_assert_equal( bella_link.val(), bella_val.link() )
			
		},
		
		async 'Land Area inherits rights'( $ ) {
			
			const area = await $mol_wire_async( ()=> {
				const base = $.$hyoo_crus_glob.land_grab([[ null, $hyoo_crus_rank_post( 'just' ) ]])
				base.saving()
				return base.area_make()
		 	} )()
			
			$mol_assert_equal( area.pass_rank( area.auth().pass() ), $hyoo_crus_rank_rule )
			$mol_assert_equal( area.lord_rank( $hyoo_crus_link.hole ), $hyoo_crus_rank_post( 'just' ) )
			
		},
		
		// async 'Merge text changes'() {
			
		// 	const base = new $hyoo_crus_land( 1n, 1 )
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
			
		// 	const store = new $hyoo_crus_land( 1n, 1 )
		// 	store.chief.as( $hyoo_crowd_text ).str( 'foobar' )
		// 	store.chief.as( $hyoo_crowd_text ).write( 'xyz', 3 )
			
		// 	$mol_assert_equal( store.chief.as( $hyoo_crowd_list ).list(), [ 'fooxyzbar' ] )
			
		// },
		
		// async 'Write into token with split'() {
			
		// 	const store = new $hyoo_crus_land( 1n, 1 )
		// 	store.chief.as( $hyoo_crowd_text ).str( 'foobar' )
		// 	store.chief.as( $hyoo_crowd_text ).write( 'XYZ', 2, 4 )
			
		// 	$mol_assert_equal( store.chief.as( $hyoo_crowd_list ).list(), [ 'fo', 'XYZar' ] )
			
		// },
		
		// async 'Write over few tokens'() {
			
		// 	const store = new $hyoo_crus_land( 1n, 1 )
		// 	store.chief.as( $hyoo_crowd_text ).str( 'xxx foo bar yyy' )
		// 	store.chief.as( $hyoo_crowd_text ).write( 'X Y Z', 6, 9 )
			
		// 	$mol_assert_equal( store.chief.as( $hyoo_crowd_list ).list(), [ 'xxx', ' fo', 'X', ' Y', ' Zar', ' yyy' ] )
			
		// },
		
		// async 'Write whole token'() {
			
		// 	const store = new $hyoo_crus_land( 1n, 1 )
		// 	store.chief.as( $hyoo_crowd_text ).str( 'xxxFoo yyy' )
		// 	store.chief.as( $hyoo_crowd_text ).write( 'bar', 3, 7 )
			
		// 	$mol_assert_equal( store.chief.as( $hyoo_crowd_list ).list(), [ 'xxxbaryyy' ] )
			
		// },
		
		// async 'Write whole text'() {
			
		// 	const store = new $hyoo_crus_land( 1n, 1 )
		// 	store.chief.as( $hyoo_crowd_text ).str( 'foo bar' )
		// 	store.chief.as( $hyoo_crowd_text ).write( 'xxx', 0, 7 )
			
		// 	$mol_assert_equal( store.chief.as( $hyoo_crowd_list ).list(), [ 'xxx' ] )
			
		// },
		
		// async 'Write at the end'() {
			
		// 	const store = new $hyoo_crus_land( 1n, 1 )
		// 	store.chief.as( $hyoo_crowd_text ).str( 'foo' )
		// 	store.chief.as( $hyoo_crowd_text ).write( 'bar' )
			
		// 	$mol_assert_equal( store.chief.as( $hyoo_crowd_list ).list(), [ 'foobar' ] )
			
		// },
		
		// async 'Write between tokens'() {
			
		// 	const store = new $hyoo_crus_land( 1n, 1 )
		// 	store.chief.as( $hyoo_crowd_text ).str( 'foo bar' )
		// 	store.chief.as( $hyoo_crowd_text ).write( 'xxx', 4 )
			
		// 	$mol_assert_equal( store.chief.as( $hyoo_crowd_list ).list(), [ 'foo', ' xxxbar' ] )
			
		// },

	})
}
