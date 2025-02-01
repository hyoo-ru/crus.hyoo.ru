namespace $ {
	export class $hyoo_crus_mine extends $mol_object {
		
		static unit_updates = 0
		static unit_appends = 0
		static rock_writes = 0
		
		/**  BLOB identified by Hash */
		@ $mol_mem_key
		static rock( hash: $hyoo_crus_link, next?: Uint8Array ): Uint8Array | null {
			$mol_wire_solid()
			return next ?? null
		}
		
		/** Saves BLOB to storage and returns it's Hash */
		@ $mol_action
		static rock_save( blob: Uint8Array ) {
			const hash = $hyoo_crus_link.hash_bin( blob )
			this.rock( hash, blob )
			this.rock( hash ) // temp dep allow reap
			return hash
		}
		
		static units_persisted = new WeakSet< $hyoo_crus_unit >()
		
		/** Sync loads/saves units. */
		static units( land: $hyoo_crus_link, next?: readonly $hyoo_crus_unit[] ) {
			if( next ) return $mol_wire_sync( this ).units_save( land, next ), next
			else return $mol_wire_sync( this ).units_load( land )
		}
		
		/** Loads units from storage */
		static async units_load( land: $hyoo_crus_link ) {
			return [] as readonly $hyoo_crus_unit[]
		}
		
		/** Saves units to storage */
		static async units_save( land: $hyoo_crus_link, units: readonly $hyoo_crus_unit[] ) {
			
		}
		
	}
}
