namespace $.$$ {
	export class $hyoo_crowds_realm_book extends $.$hyoo_crowds_realm_book {
		
		@ $mol_mem
		override spread_ids() {
			return [ ... this.realm().land.values() ].map( land => land.ref().toString() )
		}
		
		override land( id: string ) {
			return this.realm().Land( $hyoo_crowds_ref.from( id ).lord() )
		}
		
		override spread_title( id: string ) {
			return this.land( id ).slug()
		}
		
		// override land_new() {
		// 	const lord = BigInt( Math.random() * 2**64 )
		// 	this.realm().Land( lord )
		// 	this.spread( lord.toString() )
		// }
		
	}
}
