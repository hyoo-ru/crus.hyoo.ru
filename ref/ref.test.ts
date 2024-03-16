namespace $.$$ {
	$mol_test({
		
		"Ref validation"( $ ) {
			
			$mol_assert_fail(
				()=> $hyoo_crus_ref( 'qwertyui_asdfghjk123' ),
				'Wrong ref (qwertyui_asdfghjk123)',
			)
			
		},
		
		"Pick ref home only"( $ ) {
			
			$mol_assert_equal(
				$hyoo_crus_ref_land( $hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0' ) ),
				$hyoo_crus_ref_land( $hyoo_crus_ref( 'qwertyui_asdfghjk' ) ),
				$hyoo_crus_ref( 'qwertyui_asdfghjk' ),
			)
			
		},
		
		"Pick ref head only"( $ ) {
			
			$mol_assert_equal(
				$hyoo_crus_ref_head( $hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0' ) ),
				'zxcvbnm0',
			)
			
			$mol_assert_equal(
				$hyoo_crus_ref_head( $hyoo_crus_ref( 'qwertyui_asdfghjk' ) ),
				'',
			)
			
		},
		
		"Ref encoding"( $ ) {
			
			const node = $hyoo_crus_ref_encode( $hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0' ) )
			const root = $hyoo_crus_ref_encode( $hyoo_crus_ref( 'qwertyui_asdfghjk' ) )
			const rel_node = $hyoo_crus_ref_encode( $hyoo_crus_ref( '__zxcvbnm0' ) )
			const rel_root = $hyoo_crus_ref_encode( $hyoo_crus_ref( '__' ) )
			
			$mol_assert_equal( node.length, 18 )
			$mol_assert_equal( root.length, 12 )
			$mol_assert_equal( rel_node.length, 18 )
			$mol_assert_equal( rel_node.length, 18 )
			
			$mol_assert_equal( $hyoo_crus_ref_decode( node ), $hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0' ) )
			$mol_assert_equal( $hyoo_crus_ref_decode( root ), $hyoo_crus_ref( 'qwertyui_asdfghjk' ) )
			$mol_assert_equal( $hyoo_crus_ref_decode( rel_node ), $hyoo_crus_ref( '__zxcvbnm0' ) )
			$mol_assert_equal( $hyoo_crus_ref_decode( rel_root ), $hyoo_crus_ref( '' ) )
			
		},
		
		"Relate ref to base"( $ ) {
			
			$mol_assert_equal(
				$hyoo_crus_ref_relate(
					$hyoo_crus_ref( 'QWERTYUI_ASDFGHJK' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0' ),
				),
				$hyoo_crus_ref_relate(
					$hyoo_crus_ref( 'QWERTYUI_ASDFGHJK_ZXCVBNM0' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0' ),
				),
				$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0' ),
			)
			
			$mol_assert_equal(
				$hyoo_crus_ref_relate(
					$hyoo_crus_ref( 'qwertyui_asdfghjk' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0' ),
				),
				$hyoo_crus_ref_relate(
					$hyoo_crus_ref( 'qwertyui_asdfghjk_12345678' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0' ),
				),
				$hyoo_crus_ref( '__zxcvbnm0' ),
			)
			
			$mol_assert_equal(
				$hyoo_crus_ref_relate(
					$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk' ),
				),
				$hyoo_crus_ref_relate(
					$hyoo_crus_ref( 'qwertyui_asdfghjk' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk' ),
				),
				$hyoo_crus_ref( '' ),
			)
			
		},
		
		"Resolve ref from base"( $ ) {
			
			$mol_assert_equal(
				$hyoo_crus_ref_resolve(
					$hyoo_crus_ref( 'QWERTYUI_ASDFGHJK_ZXCVBNM0' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0' ),
				),
				$hyoo_crus_ref_resolve(
					$hyoo_crus_ref( 'QWERTYUI_ASDFGHJK' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0' ),
				),
				$hyoo_crus_ref_resolve(
					$hyoo_crus_ref( 'qwertyui_asdfghjk' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0' ),
				),
				$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0' ),
			)
			
			$mol_assert_equal(
				$hyoo_crus_ref_resolve(
					$hyoo_crus_ref( 'qwertyui_asdfghjk' ),
					$hyoo_crus_ref( '__12345678' ),
				),
				$hyoo_crus_ref_resolve(
					$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0' ),
					$hyoo_crus_ref( '__12345678' ),
				),
				$hyoo_crus_ref( 'qwertyui_asdfghjk_12345678' ),
			)
			
			$mol_assert_equal(
				$hyoo_crus_ref_resolve(
					$hyoo_crus_ref( 'qwertyui_asdfghjk' ),
					$hyoo_crus_ref( '' ),
				),
				$hyoo_crus_ref_resolve(
					$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0' ),
					$hyoo_crus_ref( '' ),
				),
				$hyoo_crus_ref( 'qwertyui_asdfghjk' ),
			)
			
		},
		
	})
}

