namespace $ {
	$mol_test({
		
		'unit type'() {
			const unit = new $hyoo_cras_unit
			$mol_assert_equal( unit.kind(), 'gist' )
		},
		
		'auth unit type'() {
			
			const auth = new $hyoo_cras_pass
			auth.auth([ 0xFF, 0, 0xFC, 0xFB, 0xFA, 0xF9, 0xF8, 0xF7, 0xF6, 0xF5, 0xF4, 0xF3, 0xF2, 0xF1 ])
			
			$mol_assert_like( auth.kind(), 'pass' )
			$mol_assert_like( auth.lord(), 0xF1F2F3F4F5F6F7F8F9FAFbFCn )
			$mol_assert_like( auth.peer(), 0xF7F8F9FAFBFC )
			
		},
		
		'gift unit type'() {
			
			const gift = new $hyoo_cras_gift
			gift.rang( $hyoo_cras_rang.law )
			
			$mol_assert_like( gift.kind(), 'gift' )
			$mol_assert_like( gift.rang(), $hyoo_cras_rang.law )
			
		},
		
		'data unit type'() {
			
			const unit = new $hyoo_cras_gist
			unit.data( new Uint8Array([ 0xFF, 0xFF ]) )
			
			$mol_assert_like( unit.kind(), 'gist' )
			$mol_assert_like( unit.size(), 2 )
			$mol_assert_like( unit.data(), new Uint8Array([ 0xFF, 0xFF ]) )
			
		},
		
		// 'big data unit type'() {
			
		// 	const unit = new $hyoo_cras_gist
		// 	unit.hash( 0xa1a2a3a4a5a6a7a8b1b2b3b4b5b6b7b8n )
			
		// 	// $mol_assert_like( unit.size(), 255 )
		// 	$mol_assert_like( unit.hash(), 0xa1a2a3a4a5a6a7a8b1b2b3b4b5b6b7b8n )
			
		// },
		
		'unit peer'() {
			
			const unit = new $hyoo_cras_unit
			$mol_assert_equal( unit.peer(), 0 )
			
			unit.peer( 0xf1f2f3f4f5f6 )
			$mol_assert_equal( unit.peer(), 0xf1f2f3f4f5f6 )
			
		},
		
		'gift unit fields'() {
			
			const unit = new $hyoo_cras_gift
			
			$mol_assert_equal( unit.time(), 0 )
			$mol_assert_equal( unit.dest(), 0n )
			
			unit.time( 0xd1d2d3d4d5d6 )
			unit.dest( 0xa1a2a3a4a5a6a7a8n )
			
			$mol_assert_equal( unit.time(), 0xd1d2d3d4d5d6 )
			$mol_assert_equal( unit.dest(), 0xa1a2a3a4a5a6a7a8n )
			
		},
		
		'data unit fields'() {
			
			const unit = new $hyoo_cras_gist
			
			$mol_assert_equal( unit.time(), 0 )
			$mol_assert_equal( unit.head(), 0 )
			$mol_assert_equal( unit.self(), 0 )
			$mol_assert_equal( unit.lead(), 0 )
			
			unit.time( 0xd1d2d3d4d5d6 )
			unit.head( 0xa1a2a3a4a5a6 )
			unit.self( 0xb1b2b3b4b5b6 )
			unit.lead( 0xc1c2c3c4c5c6 )
			
			$mol_assert_equal( unit.time(), 0xd1d2d3d4d5d6 )
			$mol_assert_equal( unit.head(), 0xa1a2a3a4a5a6 )
			$mol_assert_equal( unit.self(), 0xb1b2b3b4b5b6 )
			$mol_assert_equal( unit.lead(), 0xc1c2c3c4c5c6 )
			
		},
		
		async 'sign / verify'( $ ) {
			
			const source = new $hyoo_cras_gist
			source.data( new Uint8Array([ 0xF1, 0xF2 ]) )
			
			const key = await $.$mol_crypto_auditor_pair()
			source.sign( new Uint8Array( await key.private.sign( source.sens() ) ) )
			
			$mol_assert_ok( await key.public.verify( source.sens(), source.sign() ) )
			
		},
		
	})
}
