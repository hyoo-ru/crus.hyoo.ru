namespace $ {
	export class $hyoo_crus_mine extends $mol_object {
		
		static unit_updates = 0
		static unit_appends = 0
		static rock_writes = 0
		
		/** SHA-1 hash of BLOB */
		@ $mol_mem_key
		static hash( blob: Uint8Array< ArrayBuffer > ) {
			return $mol_crypto_hash( blob )
		}
		
		/**  BLOB identified by Hash */
		@ $mol_mem_key
		static rock( hash: Uint8Array< ArrayBuffer >, next?: Uint8Array< ArrayBuffer > ): Uint8Array< ArrayBuffer > | null {
			$mol_wire_solid()
			return next ?? null
		}
		
		/** Saves BLOB to storage and returns it's Hash */
		@ $mol_action
		static rock_save( blob: Uint8Array< ArrayBuffer > ) {
			const hash = this.hash( blob )
			this.rock( hash, blob )
			this.rock( hash ) // temp dep allow reap
			return hash
		}
		
		static units_persisted = new WeakSet< $hyoo_crus_unit >()
		
		/** Sync loads/saves units. */
		static units( land: $hyoo_crus_ref, next?: readonly $hyoo_crus_unit[] ) {
			if( next ) return $mol_wire_sync( this ).units_save( land, next ), next
			else return $mol_wire_sync( this ).units_load( land )
		}
		
		/** Loads units from storage */
		static async units_load( land: $hyoo_crus_ref ) {
			return [] as readonly $hyoo_crus_unit[]
		}
		
		/** Saves units to storage */
		static async units_save( land: $hyoo_crus_ref, units: readonly $hyoo_crus_unit[] ) {
			
		}
		
	}
}
