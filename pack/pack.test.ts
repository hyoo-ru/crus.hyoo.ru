namespace $.$$ {
	$mol_test({
		
		"faces serial and parse"( $ ) {
			
			const land1 = new $hyoo_crus_link( '12345678_12345678' )
			const land2 = new $hyoo_crus_link( '87654321_87654321' )
			const land3 = new $hyoo_crus_link( '87654321_00000000' )
			
			const peer1 = new $hyoo_crus_link( '12345678' )
			const peer2 = new $hyoo_crus_link( '87654321' )
			
			const faces1 = new $hyoo_crus_face_map
			faces1.peer_time( peer1.str, $hyoo_crus_time_now(), 0 )
			faces1.peer_summ( peer1.str, 0 )
			faces1.peer_time( peer2.str, $hyoo_crus_time_now(), 0 )
			faces1.peer_summ( peer2.str, 64_000 )
			
			const faces2 = new $hyoo_crus_face_map
			faces2.peer_time( peer1.str, $hyoo_crus_time_now(), 0)
			faces2.peer_summ( peer1.str, 1 )
			faces2.peer_time( peer2.str, $hyoo_crus_time_now(), 1 )
			
			const faces3 = new $hyoo_crus_face_map
			
			const parts = [
				[ land1.str, new $hyoo_crus_pack_part( [], faces1 ) ],
				[ land2.str, new $hyoo_crus_pack_part( [], faces2 ) ],
				[ land3.str, new $hyoo_crus_pack_part( [], faces3 ) ],
			] as $hyoo_crus_pack_parts
			
			const pack = $hyoo_crus_pack.make( parts )
			
			$mol_assert_equal(
				parts,
				pack.parts(),
			)
			
		},
		
	})
}
