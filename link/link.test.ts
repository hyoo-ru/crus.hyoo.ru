namespace $.$$ {
	$mol_test({
		
		"Validation"( $ ) {
			
			$mol_assert_fail(
				()=> new $hyoo_crus_link( 'qwertyui_asdfghjk123' ),
				'Wrong Link (qwertyui_asdfghjk123)',
			)
			
		},
		
		"Pick Lord only"( $ ) {
			
			$mol_assert_equal(
				new $hyoo_crus_link( 'qwertyui_asdfghjk_qazwsxed_zxcvbnm0' ).lord(),
				new $hyoo_crus_link( 'qwertyui_asdfghjk_qazwsxed' ).lord(),
				new $hyoo_crus_link( 'qwertyui_asdfghjk' ).lord(),
				new $hyoo_crus_link( 'qwertyui_asdfghjk' ),
			)
			
		},
		
		"Pick Land only"( $ ) {
			
			$mol_assert_equal(
				new $hyoo_crus_link( 'qwertyui_asdfghjk__zxcvbnm0' ).land(),
				new $hyoo_crus_link( 'qwertyui_asdfghjk' ).land(),
				new $hyoo_crus_link( 'qwertyui_asdfghjk' ),
			)
			
			$mol_assert_equal(
				new $hyoo_crus_link( 'qwertyui_asdfghjk_qazwsxed_zxcvbnm0' ).land(),
				new $hyoo_crus_link( 'qwertyui_asdfghjk_qazwsxed' ).land(),
				new $hyoo_crus_link( 'qwertyui_asdfghjk_qazwsxed' ),
			)
			
		},
		
		"Pick Head only"( $ ) {
			
			$mol_assert_equal(
				new $hyoo_crus_link( 'qwertyui_asdfghjk_qazwsxed_zxcvbnm0' ).head(),
				new $hyoo_crus_link( 'qwertyui_asdfghjk__zxcvbnm0' ).head(),
				'zxcvbnm0',
			)
			
			$mol_assert_equal(
				new $hyoo_crus_link( 'qwertyui_asdfghjk_qazwsxed' ).head(),
				new $hyoo_crus_link( 'qwertyui_asdfghjk' ).head(),
				'',
			)
			
		},
		
		"Binary encoding"( $ ) {
			
			const node = new $hyoo_crus_link( 'qwertyui_asdfghjk_qazwsxed_zxcvbnm0' ).toBin()
			const land = new $hyoo_crus_link( 'qwertyui_asdfghjk_qazwsxed' ).toBin()
			const lord = new $hyoo_crus_link( 'qwertyui_asdfghjk' ).toBin()
			
			const rel_node = new $hyoo_crus_link( '___zxcvbnm0' ).toBin()
			const rel_root = new $hyoo_crus_link( '' ).toBin()
			
			$mol_assert_equal( node.length, 24 )
			$mol_assert_equal( land.length, 18 )
			$mol_assert_equal( lord.length, 12 )
			
			$mol_assert_equal( rel_node.length, 24 )
			$mol_assert_equal( rel_root.length, 12 )
			
			$mol_assert_equal( $hyoo_crus_link.from_bin( node ), new $hyoo_crus_link( 'qwertyui_asdfghjk_qazwsxed_zxcvbnm0' ) )
			$mol_assert_equal( $hyoo_crus_link.from_bin( land ), new $hyoo_crus_link( 'qwertyui_asdfghjk_qazwsxed' ) )
			$mol_assert_equal( $hyoo_crus_link.from_bin( lord ), new $hyoo_crus_link( 'qwertyui_asdfghjk' ) )
			
			$mol_assert_equal( $hyoo_crus_link.from_bin( rel_node ), new $hyoo_crus_link( '___zxcvbnm0' ) )
			$mol_assert_equal( $hyoo_crus_link.from_bin( rel_root ), new $hyoo_crus_link( '' ) )
			
		},
		
		"Relate to base"( $ ) {
			
			$mol_assert_equal(
				new $hyoo_crus_link( 'qwertyui_asdfghjk__zxcvbnm0' ).relate(
					new $hyoo_crus_link( 'QWERTYUI_ASDFGHJK' ),
				),
				new $hyoo_crus_link( 'qwertyui_asdfghjk__zxcvbnm0' ).relate(
					new $hyoo_crus_link( 'QWERTYUI_ASDFGHJK__ZXCVBNM0' ),
				),
				new $hyoo_crus_link( 'qwertyui_asdfghjk__zxcvbnm0' ),
			)
			
			$mol_assert_equal(
				new $hyoo_crus_link( 'qwertyui_asdfghjk_qazwsxed_zxcvbnm0' ).relate(
					new $hyoo_crus_link( 'qwertyui_asdfghjk_qazwsxed' ),
				),
				new $hyoo_crus_link( 'qwertyui_asdfghjk_qazwsxed_zxcvbnm0' ).relate(
					new $hyoo_crus_link( 'qwertyui_asdfghjk_qazwsxed_12345678' ),
				),
				new $hyoo_crus_link( 'qwertyui_asdfghjk__zxcvbnm0' ).relate(
					new $hyoo_crus_link( 'qwertyui_asdfghjk' ),
				),
				new $hyoo_crus_link( 'qwertyui_asdfghjk__zxcvbnm0' ).relate(
					new $hyoo_crus_link( 'qwertyui_asdfghjk__12345678' ),
				),
				new $hyoo_crus_link( '___zxcvbnm0' ),
			)
			
			$mol_assert_equal(
				new $hyoo_crus_link( 'qwertyui_asdfghjk_qazwsxed' ).relate(
					new $hyoo_crus_link( 'qwertyui_asdfghjk_qazwsxed_zxcvbnm0' ),
				),
				new $hyoo_crus_link( 'qwertyui_asdfghjk_qazwsxed' ).relate(
					new $hyoo_crus_link( 'qwertyui_asdfghjk_qazwsxed' ),
				),
				new $hyoo_crus_link( 'qwertyui_asdfghjk' ).relate(
					new $hyoo_crus_link( 'qwertyui_asdfghjk__zxcvbnm0' ),
				),
				new $hyoo_crus_link( 'qwertyui_asdfghjk' ).relate(
					new $hyoo_crus_link( 'qwertyui_asdfghjk' ),
				),
				new $hyoo_crus_link( '' ),
			)
			
		},
		
		"Resolve ref from base"( $ ) {
			
			$mol_assert_equal(
				new $hyoo_crus_link( 'qwertyui_asdfghjk__zxcvbnm0' ).resolve(
					new $hyoo_crus_link( 'QWERTYUI_ASDFGHJK__ZXCVBNM0' ),
				),
				new $hyoo_crus_link( 'qwertyui_asdfghjk__zxcvbnm0' ).resolve(
					new $hyoo_crus_link( 'QWERTYUI_ASDFGHJK' ),
				),
				new $hyoo_crus_link( 'qwertyui_asdfghjk__zxcvbnm0' ).resolve(
					new $hyoo_crus_link( 'qwertyui_asdfghjk' ),
				),
				new $hyoo_crus_link( 'qwertyui_asdfghjk__zxcvbnm0' ),
			)
			
			$mol_assert_equal(
				new $hyoo_crus_link( '___12345678' ).resolve(
					new $hyoo_crus_link( 'qwertyui_asdfghjk' ),
				),
				new $hyoo_crus_link( '___12345678' ).resolve(
					new $hyoo_crus_link( 'qwertyui_asdfghjk__zxcvbnm0' ),
				),
				new $hyoo_crus_link( 'qwertyui_asdfghjk__12345678' ),
			)
			
			$mol_assert_equal(
				new $hyoo_crus_link( '___12345678' ).resolve(
					new $hyoo_crus_link( 'qwertyui_asdfghjk_qazwsxed' ),
				),
				new $hyoo_crus_link( '___12345678' ).resolve(
					new $hyoo_crus_link( 'qwertyui_asdfghjk_qazwsxed_zxcvbnm0' ),
				),
				new $hyoo_crus_link( 'qwertyui_asdfghjk_qazwsxed_12345678' ),
			)
			
			$mol_assert_equal(
				new $hyoo_crus_link( '' ).resolve(
					new $hyoo_crus_link( 'qwertyui_asdfghjk' ),
				),
				new $hyoo_crus_link( '' ).resolve(
					new $hyoo_crus_link( 'qwertyui_asdfghjk__zxcvbnm0' ),
				),
				new $hyoo_crus_link( 'qwertyui_asdfghjk' ),
			)
			
			$mol_assert_equal(
				new $hyoo_crus_link( '' ).resolve(
					new $hyoo_crus_link( 'qwertyui_asdfghjk_qazwsxed' ),
				),
				new $hyoo_crus_link( '' ).resolve(
					new $hyoo_crus_link( 'qwertyui_asdfghjk_qazwsxed_zxcvbnm0' ),
				),
				new $hyoo_crus_link( 'qwertyui_asdfghjk_qazwsxed' ),
			)
			
		},
		
		'Hashing'() {
			
			$mol_assert_equal(
				$hyoo_crus_link.hash_bin( new Uint8Array([ 1, 2, 3 ]) ),
				new $hyoo_crus_link( 'cDeAcZjC_Kn0rCAc3_HXY3eahP' ),
			)
			
			$mol_assert_equal(
				$hyoo_crus_link.hash_str( 'foo bar' ),
				new $hyoo_crus_link( 'N3PeplFW_kJg4æmwi_glyv4JDÆ' ),
			)
			
		}
		
	})
}

