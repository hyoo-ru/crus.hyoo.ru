namespace $ {
	export class $hyoo_crus_yard extends $mol_object {
		
		static persisted = new WeakSet< $hyoo_crus_unit >()
		
		static load( land: $hyoo_crus_land ) {
			return [] as readonly $hyoo_crus_unit[]
		}
		
		static async save( land: $hyoo_crus_land, units: readonly $hyoo_crus_unit[] ) {}
		
	}
}
