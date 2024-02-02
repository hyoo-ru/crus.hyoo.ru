namespace $.$$ {
	$mol_test({
		
		"faces serial and parse"( $ ) {
			
			const land1 = $hyoo_crus_ref( '12345678_12345678' )
			const land2 = $hyoo_crus_ref( '87654321_87654321' )
			const land3 = $hyoo_crus_ref( '87654321_87654321' )
			
			const faces1 = new $hyoo_crus_face_map
			faces1.time_max( '12345678', Date.now() )
			faces1.count_shift( '12345678', 777 )
			
			const faces2 = new $hyoo_crus_face_map
			faces2.time_max( '12345678', Date.now() )
			faces2.time_max( '87654321', Date.now() + 1 )
			faces2.count_shift( '12345678', 333 )
			faces2.count_shift( '87654321', 1 )
			
			const faces3 = new $hyoo_crus_face_map
			
			const pack = $hyoo_crus_pack.make( {
				[ land1 ]: faces1,
				[ land2 ]: faces2,
				[ land3 ]: faces3,
			}, {}, [] )
			
			const parts = pack.parts()
			
			$mol_assert_equal(
				parts,
				{
					faces: {
						[ land1 ]: faces1,
						[ land2 ]: faces2,
						[ land3 ]: faces3,
					},
					units: {},
					rocks: [],
				},
			)
			
		},
		
	})
}
