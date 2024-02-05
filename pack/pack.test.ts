namespace $.$$ {
	$mol_test({
		
		"faces serial and parse"( $ ) {
			
			const land1 = $hyoo_crus_ref( '12345678_12345678' )
			const land2 = $hyoo_crus_ref( '87654321_87654321' )
			const land3 = $hyoo_crus_ref( '87654321_00000000' )
			
			const faces1 = new $hyoo_crus_face_map
			faces1.time_max( '12345678', Date.now() )
			faces1.total = 16_000
			
			const faces2 = new $hyoo_crus_face_map
			faces2.time_max( '12345678', Date.now() )
			faces2.time_max( '87654321', Date.now() + 1 )
			faces2.total = 0
			
			const faces3 = new $hyoo_crus_face_map
			
			const parts = {
				lands: {
					[ land1 ]: { faces: faces1, units: [] },
					[ land2 ]: { faces: faces2, units: [] },
					[ land3 ]: { faces: faces3, units: [] },
				},
				rocks: [],
			}
			
			$mol_assert_equal(
				parts,
				$hyoo_crus_pack.make( parts ).parts(),
			)
			
		},
		
	})
}
