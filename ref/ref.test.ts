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
				$hyoo_crus_ref_home( $hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0_12345678' ) ),
				$hyoo_crus_ref_home( $hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0' ) ),
				$hyoo_crus_ref_home( $hyoo_crus_ref( 'qwertyui_asdfghjk' ) ),
				$hyoo_crus_ref( 'qwertyui_asdfghjk' ),
			)
			
		},
		
		"Pick ref root only"( $ ) {
			
			$mol_assert_equal(
				$hyoo_crus_ref_root( $hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0_12345678' ) ),
				$hyoo_crus_ref_root( $hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0' ) ),
				$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0' ),
			)
			
			$mol_assert_equal(
				$hyoo_crus_ref_root( $hyoo_crus_ref( 'qwertyui_asdfghjk' ) ),
				$hyoo_crus_ref( 'qwertyui_asdfghjk' ),
			)
			
		},
		
		"Pick ref head only"( $ ) {
			
			$mol_assert_equal(
				$hyoo_crus_ref_head( $hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0_12345678' ) ),
				'12345678',
			)
			
			$mol_assert_equal(
				$hyoo_crus_ref_head( $hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0' ) ),
				$hyoo_crus_ref_head( $hyoo_crus_ref( 'qwertyui_asdfghjk' ) ),
				'',
			)
			
		},
		
		"Ref encoding"( $ ) {
			
			const full = $hyoo_crus_ref_encode( $hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0_12345678' ) )
			const root = $hyoo_crus_ref_encode( $hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0' ) )
			const home = $hyoo_crus_ref_encode( $hyoo_crus_ref( 'qwertyui_asdfghjk' ) )
			const rel_full = $hyoo_crus_ref_encode( $hyoo_crus_ref( '___12345678' ) )
			const rel_root = $hyoo_crus_ref_encode( $hyoo_crus_ref( '___' ) )
			
			$mol_assert_equal( full.length, 24 )
			$mol_assert_equal( root.length, 18 )
			$mol_assert_equal( home.length, 12 )
			$mol_assert_equal( rel_full.length, 24 )
			
			$mol_assert_equal( $hyoo_crus_ref_decode( full ), $hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0_12345678' ) )
			$mol_assert_equal( $hyoo_crus_ref_decode( root ), $hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0' ) )
			$mol_assert_equal( $hyoo_crus_ref_decode( home ), $hyoo_crus_ref( 'qwertyui_asdfghjk' ) )
			$mol_assert_equal( $hyoo_crus_ref_decode( rel_full ), $hyoo_crus_ref( '___12345678' ) )
			$mol_assert_equal( $hyoo_crus_ref_decode( rel_root ), $hyoo_crus_ref( '' ) )
			
		},
		
		"Relate ref to base"( $ ) {
			
			$mol_assert_equal(
				$hyoo_crus_ref_relate(
					$hyoo_crus_ref( 'QWERTYUI_ASDFGHJK_ZXCVBNM0' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0_12345678' ),
				),
				$hyoo_crus_ref_relate(
					$hyoo_crus_ref( 'QWERTYUI_ASDFGHJK_zxcvbnm0' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0_12345678' ),
				),
				$hyoo_crus_ref_relate(
					$hyoo_crus_ref( 'QWERTYUI_ASDFGHJK' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0_12345678' ),
				),
				$hyoo_crus_ref_relate(
					$hyoo_crus_ref( 'qwertyui_asdfghjk_ZXCVBNM0' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0_12345678' ),
				),
				$hyoo_crus_ref_relate(
					$hyoo_crus_ref( 'qwertyui_asdfghjk' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0_12345678' ),
				),
				$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0_12345678' ),
			)
			
			$mol_assert_equal(
				$hyoo_crus_ref_relate(
					$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0_12345678' ),
				),
				$hyoo_crus_ref( '___12345678' ),
			)
			
			$mol_assert_equal(
				$hyoo_crus_ref_relate(
					$hyoo_crus_ref( 'qwertyui_asdfghjk' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk__12345678' ),
				),
				$hyoo_crus_ref( '___12345678' ),
			)
			
			$mol_assert_equal(
				$hyoo_crus_ref_relate(
					$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0' ),
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
					$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0_12345678' ),
				),
				$hyoo_crus_ref_resolve(
					$hyoo_crus_ref( 'QWERTYUI_ASDFGHJK_zxcvbnm0' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0_12345678' ),
				),
				$hyoo_crus_ref_resolve(
					$hyoo_crus_ref( 'QWERTYUI_ASDFGHJK' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0_12345678' ),
				),
				$hyoo_crus_ref_resolve(
					$hyoo_crus_ref( 'qwertyui_asdfghjk_ZXCVBNM0' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0_12345678' ),
				),
				$hyoo_crus_ref_resolve(
					$hyoo_crus_ref( 'qwertyui_asdfghjk' ),
					$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0_12345678' ),
				),
				$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0_12345678' ),
			)
			
			$mol_assert_equal(
				$hyoo_crus_ref_resolve(
					$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0' ),
					$hyoo_crus_ref( '___12345678' ),
				),
				$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0_12345678' ),
			)
			
			$mol_assert_equal(
				$hyoo_crus_ref_resolve(
					$hyoo_crus_ref( 'qwertyui_asdfghjk' ),
					$hyoo_crus_ref( '___12345678' ),
				),
				$hyoo_crus_ref( 'qwertyui_asdfghjk__12345678' ),
			)
			
			$mol_assert_equal(
				$hyoo_crus_ref_resolve(
					$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0' ),
					$hyoo_crus_ref( '' ),
				),
				$hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0' ),
			)
			
			$mol_assert_equal(
				$hyoo_crus_ref_resolve(
					$hyoo_crus_ref( 'qwertyui_asdfghjk' ),
					$hyoo_crus_ref( '' ),
				),
				$hyoo_crus_ref( 'qwertyui_asdfghjk' ),
			)
			
		},
		
	})
}

