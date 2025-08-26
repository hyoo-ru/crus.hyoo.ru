namespace $ {
	
	export type $hyoo_crus_mine_diff = { ins: $hyoo_crus_unit[], del: $hyoo_crus_unit[] }
	
	export class $hyoo_crus_mine extends $mol_object {
		
		@ $mol_mem_key
		static land( land: $hyoo_crus_link ) {
			return this.make({
				land: $mol_const( land )
			})
		}
		
		land() {
			return $hyoo_crus_link.hole
		}
		
		unit_deletes = 0
		unit_inserts = 0
		
		ball_inserts = 0
		ball_deletes = 0
		
		units_persisted = new WeakSet< $hyoo_crus_unit >()
		
		/** Updates Units in storage */
		units_save( diff: $hyoo_crus_mine_diff ): void {}
		
		/** Loads Units from storage */
		units_load(): readonly $hyoo_crus_unit[] {
			return []
		}
		
		/** Loads Ball from storage */
		ball_load( path: string ): Uint8Array< ArrayBuffer > {
			return null!
		}
		
	}
}
