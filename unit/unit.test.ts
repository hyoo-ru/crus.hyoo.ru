namespace $ {
	$mol_test({
		
		'gift unit type'() {
			
			const gift = $hyoo_crus_unit_gift.make()
			gift.rank( $hyoo_crus_rank_rule )
			
			$mol_assert_equal( gift.kind(), 'gift' )
			$mol_assert_equal( gift.rank(), $hyoo_crus_rank_rule )
			
		},
		
		'data unit type'() {
			
			const unit = $hyoo_crus_unit_sand.make( 2 )
			unit.hint( 'nil', 'term' )
			unit.ball( new Uint8Array([ 0xFF, 0xFF ]) )
			
			$mol_assert_equal( unit.kind(), 'sand' )
			$mol_assert_equal( unit.size(), 2 )
			$mol_assert_equal( unit.ball(), new Uint8Array([ 0xFF, 0xFF ]) )
			
		},
		
		'gift unit fields'() {
			
			const unit = $hyoo_crus_unit_gift.make()
			
			$mol_assert_equal( unit.time(), 0 )
			$mol_assert_equal( unit.mate(), $hyoo_crus_link.hole )
			
			unit.time_tick( 0xd1d2d3d4d5d6 )
			unit.mate( new $hyoo_crus_link( 'ÆPv6æfj3_9vX08ÆLx' ) )
			
			$mol_assert_equal( unit.time_tick(), 0xd1d2d3d4d5d6 )
			$mol_assert_equal( unit.mate(), new $hyoo_crus_link( 'ÆPv6æfj3_9vX08ÆLx' ) )
			
		},
		
		'data unit fields'() {
			
			const unit = $hyoo_crus_unit_sand.make( 0 )
			
			$mol_assert_equal( unit.time(), 0 )
			$mol_assert_equal( unit.head(), $hyoo_crus_link.hole )
			$mol_assert_equal( unit.self(), $hyoo_crus_link.hole )
			$mol_assert_equal( unit.lead(), $hyoo_crus_link.hole )
			
			unit.time_tick( 0xd1d2d3d4d5d6 )
			unit.head( new $hyoo_crus_link( 'ÆPv6æfj3' ) )
			unit.self( new $hyoo_crus_link( 'Pv6æfj39' ) )
			unit.lead( new $hyoo_crus_link( 'v6æfj39v' ) )
			
			$mol_assert_equal( unit.time_tick(), 0xd1d2d3d4d5d6 )
			$mol_assert_equal( unit.head(), new $hyoo_crus_link( 'ÆPv6æfj3' ) )
			$mol_assert_equal( unit.self(), new $hyoo_crus_link( 'Pv6æfj39' ) )
			$mol_assert_equal( unit.lead(), new $hyoo_crus_link( 'v6æfj39v' ) )
			
		},
		
	})
}
