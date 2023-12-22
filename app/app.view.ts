namespace $.$$ {
	export class $hyoo_cras_app extends $.$hyoo_cras_app {
		
		@ $mol_mem
		realm() {
			const realm = super.realm()
			realm.home().base()
			return realm
		}
		
		@ $mol_mem
		intro() {
			return this.$.$mol_fetch.text( 'hyoo/cras/readme.md' )
		}
		
	}
}
