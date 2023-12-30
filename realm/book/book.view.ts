namespace $.$$ {
	export class $hyoo_crus_realm_book extends $.$hyoo_crus_realm_book {
		
		@ $mol_mem
		override spread_ids() {
			return [ ... this.realm().lords.values() ].map( lord => lord.numb() )
		}
		
		override lord( id: string ) {
			return this.realm().Lord( id )
		}
		
		override spread_title( id: string ) {
			return id
		}
		
		// override lord_new() {
		// 	const lord = BigInt( Math.random() * 2**64 )
		// 	this.realm().Land( lord )
		// 	this.spread( lord.toString() )
		// }
		
	}
}
