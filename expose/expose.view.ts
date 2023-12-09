namespace $.$$ {
	export class $hyoo_cras_expose extends $.$hyoo_cras_expose {
		
		@ $mol_mem
		realm() {
			const realm = super.realm()
			realm.home().base()
			return realm
		}
		
	}
}
