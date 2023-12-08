namespace $.$$ {
	export class $hyoo_crowds_realm_book extends $.$hyoo_crowds_realm_book {
		
		@ $mol_mem
		override spread_ids() {
			return [ ... this.realm().lords.values() ].map( lord => lord.ref().toString() )
		}
		
		override lord( id: string ) {
			return this.realm().Lord( $hyoo_crowds_ref.from( id ).lord() )
		}
		
		override spread_title( id: string ) {
			return this.lord( id ).slug()
		}
		
		// override lord_new() {
		// 	const lord = BigInt( Math.random() * 2**64 )
		// 	this.realm().Land( lord )
		// 	this.spread( lord.toString() )
		// }
		
	}
}
