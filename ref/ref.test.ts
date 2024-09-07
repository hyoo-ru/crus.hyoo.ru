namespace $.$$ {
	$mol_test({
		
		"Ref validation"( $ ) {
			
			$mol_assert_fail(
				()=> $hyoo_crus_ref( 'qwertyui_asdfghjk123' ),
				'Wrong ref (qwertyui_asdfghjk123)',
			)
			
		},
		
		"Pick ref lord only"( $ ) {
			
			$mol_assert_equal(
				$hyoo_crus_ref_lord( $hyoo_crus_ref( 'qwertyui_asdfghjk_qazwsxed_zxcvbnm0' ) ),
				$hyoo_crus_ref_lord( $hyoo_crus_ref( 'qwertyui_asdfghjk_qazwsxed' ) ),
				$hyoo_crus_ref_lord( $hyoo_crus_ref( 'qwertyui_asdfghjk' ) ),
				$hyoo_crus_ref( 'qwertyui_asdfghjk' ),
			)
			
		},
		
		"Pick ref land only"( $ ) {
			
			$mol_assert_equal(
				$hyoo_crus_ref_land( $hyoo_crus_ref( 'qwertyui_asdfghjk__zxcvbnm0' ) ),
				$hyoo_crus_ref_land( $hyoo_crus_ref( 'qwertyui_asdfghjk' ) ),
				$hyoo_crus_ref( 'qwertyui_asdfghjk' ),
			)
			
			$mol_assert_equal(
				$hyoo_crus_ref_land( $hyoo_crus_ref( 'qwertyui_asdfghjk_qazwsxed_zxcvbnm0' ) ),
				$hyoo_crus_ref_land( $hyoo_crus_ref( 'qwertyui_asdfghjk_qazwsxed' ) ),
				$hyoo_crus_ref( 'qwertyui_asdfghjk_qazwsxed' ),
			)
			
		},
		
		"Pick ref head only"( $ ) {
			
			$mol_assert_equal(
				$hyoo_crus_ref_head( $hyoo_crus_ref( 'qwertyui_asdfghjk_qazwsxed_zxcvbnm0' ) ),
				$hyoo_crus_ref_head( $hyoo_crus_ref( 'qwertyui_asdfghjk__zxcvbnm0' ) ),
				'zxcvbnm0',
			)
			
			$mol_assert_equal(
				$hyoo_crus_ref_head( $hyoo_crus_ref( 'qwertyui_asdfghjk_qazwsxed' ) ),
				$hyoo_crus_ref_head( $hyoo_crus_ref( 'qwertyui_asdfghjk' ) ),
				'',
			)
			
		},
		
		"Ref encoding"( $ ) {
			
			const node = $hyoo_crus_ref_encode( $hyoo_crus_ref( 'qwertyui_asdfghjk_qazwsxed_zxcvbnm0' ) )
			const land = $hyoo_crus_ref_encode( $hyoo_crus_ref( 'qwertyui_asdfghjk_qazwsxed' ) )
			const lord = $hyoo_crus_ref_encode( $hyoo_crus_ref( 'qwertyui_asdfghjk' ) )
			
			const rel_node = $hyoo_crus_ref_encode( $hyoo_crus_ref( '___zxcvbnm0' ) )
			const rel_root = $hyoo_crus_ref_encode( $hyoo_crus_ref( '' ) )
			
			$mol_assert_equal( node.length, 24 )
			$mol_assert_equal( land.length, 18 )
			$mol_assert_equal( lord.length, 12 )
			
			$mol_assert_equal( rel_node.length, 24 )
			$mol_assert_equal( rel_root.length, 12 )
			
			$mol_assert_equal( $hyoo_crus_ref_decode( node ), $hyoo_crus_ref( 'qwertyui_asdfghjk_qazwsxed_zxcvbnm0' ) )
			$mol_assert_equal( $hyoo_crus_ref_decode( land ), $hyoo_crus_ref( 'qwertyui_asdfghjk_qazwsxed' ) )
			$mol_assert_equal( $hyoo_crus_ref_decode( lord ), $hyoo_crus_ref( 'qwertyui_asdfghjk' ) )
			
			$mol_assert_equal( $hyoo_crus_ref_decode( rel_node ), $hyoo_crus_ref( '___zxcvbnm0' ) )
			$mol_assert_equal( $hyoo_crus_ref_decode( rel_root ), $hyoo_crus_ref( '' ) )
			
		},
		
		"Relate ref to base"( $ ) {
			
			$mol_assert_equal(
				$hyoo_crus_ref_relate(
					$hyoo_crus_ref( 'QWERTYUI_ASDFGHJK' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk__zxcvbnm0' ),
				),
				$hyoo_crus_ref_relate(
					$hyoo_crus_ref( 'QWERTYUI_ASDFGHJK__ZXCVBNM0' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk__zxcvbnm0' ),
				),
				$hyoo_crus_ref( 'qwertyui_asdfghjk__zxcvbnm0' ),
			)
			
			$mol_assert_equal(
				$hyoo_crus_ref_relate(
					$hyoo_crus_ref( 'qwertyui_asdfghjk_qazwsxed' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk_qazwsxed_zxcvbnm0' ),
				),
				$hyoo_crus_ref_relate(
					$hyoo_crus_ref( 'qwertyui_asdfghjk_qazwsxed_12345678' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk_qazwsxed_zxcvbnm0' ),
				),
				$hyoo_crus_ref_relate(
					$hyoo_crus_ref( 'qwertyui_asdfghjk' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk__zxcvbnm0' ),
				),
				$hyoo_crus_ref_relate(
					$hyoo_crus_ref( 'qwertyui_asdfghjk__12345678' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk__zxcvbnm0' ),
				),
				$hyoo_crus_ref( '___zxcvbnm0' ),
			)
			
			$mol_assert_equal(
				$hyoo_crus_ref_relate(
					$hyoo_crus_ref( 'qwertyui_asdfghjk_qazwsxed_zxcvbnm0' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk_qazwsxed' ),
				),
				$hyoo_crus_ref_relate(
					$hyoo_crus_ref( 'qwertyui_asdfghjk_qazwsxed' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk_qazwsxed' ),
				),
				$hyoo_crus_ref_relate(
					$hyoo_crus_ref( 'qwertyui_asdfghjk__zxcvbnm0' ),
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
					$hyoo_crus_ref( 'QWERTYUI_ASDFGHJK__ZXCVBNM0' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk__zxcvbnm0' ),
				),
				$hyoo_crus_ref_resolve(
					$hyoo_crus_ref( 'QWERTYUI_ASDFGHJK' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk__zxcvbnm0' ),
				),
				$hyoo_crus_ref_resolve(
					$hyoo_crus_ref( 'qwertyui_asdfghjk' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk__zxcvbnm0' ),
				),
				$hyoo_crus_ref( 'qwertyui_asdfghjk__zxcvbnm0' ),
			)
			
			$mol_assert_equal(
				$hyoo_crus_ref_resolve(
					$hyoo_crus_ref( 'qwertyui_asdfghjk' ),
					$hyoo_crus_ref( '___12345678' ),
				),
				$hyoo_crus_ref_resolve(
					$hyoo_crus_ref( 'qwertyui_asdfghjk__zxcvbnm0' ),
					$hyoo_crus_ref( '___12345678' ),
				),
				$hyoo_crus_ref( 'qwertyui_asdfghjk__12345678' ),
			)
			
			$mol_assert_equal(
				$hyoo_crus_ref_resolve(
					$hyoo_crus_ref( 'qwertyui_asdfghjk_qazwsxed' ),
					$hyoo_crus_ref( '___12345678' ),
				),
				$hyoo_crus_ref_resolve(
					$hyoo_crus_ref( 'qwertyui_asdfghjk_qazwsxed_zxcvbnm0' ),
					$hyoo_crus_ref( '___12345678' ),
				),
				$hyoo_crus_ref( 'qwertyui_asdfghjk_qazwsxed_12345678' ),
			)
			
			$mol_assert_equal(
				$hyoo_crus_ref_resolve(
					$hyoo_crus_ref( 'qwertyui_asdfghjk' ),
					$hyoo_crus_ref( '' ),
				),
				$hyoo_crus_ref_resolve(
					$hyoo_crus_ref( 'qwertyui_asdfghjk__zxcvbnm0' ),
					$hyoo_crus_ref( '' ),
				),
				$hyoo_crus_ref( 'qwertyui_asdfghjk' ),
			)
			
			$mol_assert_equal(
				$hyoo_crus_ref_resolve(
					$hyoo_crus_ref( 'qwertyui_asdfghjk_qazwsxed' ),
					$hyoo_crus_ref( '' ),
				),
				$hyoo_crus_ref_resolve(
					$hyoo_crus_ref( 'qwertyui_asdfghjk_qazwsxed_zxcvbnm0' ),
					$hyoo_crus_ref( '' ),
				),
				$hyoo_crus_ref( 'qwertyui_asdfghjk_qazwsxed' ),
			)
			
		},
		
	})
}

