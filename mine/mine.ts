namespace $ {
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
		
		unit_updates = 0
		unit_appends = 0
		rock_writes = 0
		
		/**  BLOB identified by Hash */
		@ $mol_mem_key
		ball( hash: $hyoo_crus_link, next?: Uint8Array | null ): Uint8Array | null {
			$mol_wire_solid()
			return next ?? null
		}
		
		units_persisted = new WeakSet< $hyoo_crus_unit >()
		
		/** Sync loads/saves units. */
		units( next?: $hyoo_crus_unit[] ) {
			if( next ) return $mol_wire_sync( this ).units_save( next ), next
			else return $mol_wire_sync( this ).units_load()
		}
		
		/** Loads units from storage */
		async units_load() {
			return [] as $hyoo_crus_unit[]
		}
		
		/** Saves units to storage */
		async units_save( units: $hyoo_crus_unit[] ) {
		}
		
	}
}
