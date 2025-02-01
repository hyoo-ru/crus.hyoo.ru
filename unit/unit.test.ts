namespace $ {
	$mol_test({
		
		'unit type'() {
			const unit = new $hyoo_crus_unit
			$mol_assert_fail( ()=> unit.kind(), 'Empty unit' )
		},
		
		'auth unit type'() {
			
			const auth = new $hyoo_crus_pass
			auth.auth([ 0xFF, 0 ])
			
			$mol_assert_equal( auth.kind(), 'pass' )
			$mol_assert_equal( auth.lord(), new $hyoo_crus_link( 'NQYd2bFd_xC1dMzUx' ) )
			$mol_assert_equal( auth.peer(), new $hyoo_crus_link( 'NQYd2bFd' ) )
			
		},
		
		'gift unit type'() {
			
			const gift = new $hyoo_crus_gift
			gift.rank( $hyoo_crus_rank_rule )
			
			$mol_assert_equal( gift.kind(), 'gift' )
			$mol_assert_equal( gift.rank(), $hyoo_crus_rank_rule )
			
		},
		
		'data unit type'() {
			
			const unit = new $hyoo_crus_sand
			unit.hint( 'nil', 'term' )
			unit.data( new Uint8Array([ 0xFF, 0xFF ]) )
			
			$mol_assert_equal( unit.kind(), 'sand' )
			$mol_assert_equal( unit.size(), 2 )
			$mol_assert_equal( unit.data(), new Uint8Array([ 0xFF, 0xFF ]) )
			
		},
		
		// 'big data unit type'() {
			
		// 	const unit = new $hyoo_crus_sand
		// 	unit.hash( 0xa1a2a3a4a5a6a7a8b1b2b3b4b5b6b7b8n )
			
		// 	// $mol_assert_equal( unit.size(), 255 )
		// 	$mol_assert_equal( unit.hash(), 0xa1a2a3a4a5a6a7a8b1b2b3b4b5b6b7b8n )
			
		// },
		
		// 'unit peer'() {
			
		// 	const unit = new $hyoo_crus_unit
		// 	$mol_assert_equal( unit.peer(), $hyoo_crus_link._ )
			
		// 	unit.peer( new $hyoo_crus_link( 'ÆPv6æfj3' ) )
		// 	$mol_assert_equal( unit.peer(), new $hyoo_crus_link( 'ÆPv6æfj3' ) )
			
		// },
		
		'gift unit fields'() {
			
			const unit = new $hyoo_crus_gift
			
			$mol_assert_equal( unit.time(), 0 )
			$mol_assert_equal( unit.mate(), $hyoo_crus_link.hole )
			
			unit.time( 0xd1d2d3d4d5d6 )
			unit.mate( new $hyoo_crus_link( 'ÆPv6æfj3_9vX08ÆLx' ) )
			
			$mol_assert_equal( unit.time(), 0xd1d2d3d4d5d6 )
			$mol_assert_equal( unit.mate(), new $hyoo_crus_link( 'ÆPv6æfj3_9vX08ÆLx' ) )
			
		},
		
		'data unit fields'() {
			
			const unit = new $hyoo_crus_sand
			
			$mol_assert_equal( unit.time(), 0 )
			$mol_assert_equal( unit.head(), $hyoo_crus_link.hole )
			$mol_assert_equal( unit.self(), $hyoo_crus_link.hole )
			$mol_assert_equal( unit.lead(), $hyoo_crus_link.hole )
			
			unit.time( 0xd1d2d3d4d5d6 )
			unit.head( new $hyoo_crus_link( 'ÆPv6æfj3' ) )
			unit.self( new $hyoo_crus_link( 'Pv6æfj39' ) )
			unit.lead( new $hyoo_crus_link( 'v6æfj39v' ) )
			
			$mol_assert_equal( unit.time(), 0xd1d2d3d4d5d6 )
			$mol_assert_equal( unit.head(), new $hyoo_crus_link( 'ÆPv6æfj3' ) )
			$mol_assert_equal( unit.self(), new $hyoo_crus_link( 'Pv6æfj39' ) )
			$mol_assert_equal( unit.lead(), new $hyoo_crus_link( 'v6æfj39v' ) )
			
		},
		
		async 'sign / verify'( $ ) {
			
			const source = new $hyoo_crus_sand
			source.data( new Uint8Array([ 0xF1, 0xF2 ]) )
			
			const key = await $.$mol_crypto_auditor_pair()
			source.sign( new Uint8Array( await key.private.sign( source.sens() ) ) )
			
			$mol_assert_ok( await key.public.verify( source.sens(), source.sign() ) )
			
		},
		
	})
}
