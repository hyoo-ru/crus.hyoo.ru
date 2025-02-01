namespace $.$$ {
	$mol_test({
		
		"faces serial and parse"( $ ) {
			
			const land1 = new $hyoo_crus_link( '12345678_12345678' )
			const land2 = new $hyoo_crus_link( '87654321_87654321' )
			const land3 = new $hyoo_crus_link( '87654321_00000000' )
			
			const faces1 = new $hyoo_crus_face_map
			faces1.time_max( '12345678', Date.now() )
			faces1.total = 16_000
			
			const faces2 = new $hyoo_crus_face_map
			faces2.time_max( '12345678', Date.now() )
			faces2.time_max( '87654321', Date.now() + 1 )
			faces2.total = 0
			
			const faces3 = new $hyoo_crus_face_map
			
			const rock1 = new Uint8Array([ 1, 2, 3 ])
			const rock2 = new Uint8Array([ 3, 2, 1 ])
			const hash1 = $hyoo_crus_link.hash_bin( rock1 )
			const hash2 = $hyoo_crus_link.hash_bin( rock2 )
			
			const parts = {
				lands: {
					[ land1.str ]: { faces: faces1, units: [] },
					[ land2.str ]: { faces: faces2, units: [] },
					[ land3.str ]: { faces: faces3, units: [] },
				},
				rocks: [
					[ hash1.str, rock1 ],
					[ hash2.str, rock2 ],
				] as $hyoo_crus_pack_parts[ 'rocks' ],
			}
			
			$mol_assert_equal(
				parts,
				$hyoo_crus_pack.make( parts ).parts(),
			)
			
		},
		
	})
}
