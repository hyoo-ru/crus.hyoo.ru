namespace $.$$ {
	export class $hyoo_crus_app extends $.$hyoo_crus_app {
		
		@ $mol_mem
		realm() {
			const realm = super.realm()
			realm.home().base()
			return realm
		}
		
		@ $mol_mem
		intro() {
			return this.$.$mol_fetch.text( 'hyoo/crus/readme.md' )
		}
		
		async wipe() {
			const yard = await this.$.$mol_db( '$hyoo_crus_yard' )
			const mine = await this.$.$mol_db( '$hyoo_crus_mine' )
			yard.kill()
			mine.kill()
			location.reload()
		}
		
	}
}
