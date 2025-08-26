namespace $ {
	$mol_test_mocks.push( $=> {
		class $hyoo_crus_mine_mock extends $.$hyoo_crus_mine {
			
			/** Updates Units in storage */
			override units_save( diff: $hyoo_crus_mine_diff ) {}
			
			/** Loads Units from storage */
			override units_load() {
				return [] as $hyoo_crus_unit_base[]
			}
			
			/** Loads Ball from storage */
			override ball_load( path: string ): Uint8Array< ArrayBuffer > {
				return null!
			}
			
		}
		$.$hyoo_crus_mine = $hyoo_crus_mine_mock
	} )
}
