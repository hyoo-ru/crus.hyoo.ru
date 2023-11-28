namespace $.$$ {
	export class $hyoo_crowds_realm_book extends $.$hyoo_crowds_realm_book {
		
		@ $mol_mem
		override spread_ids() {
			return [ ... this.realm().land.keys() ].map( String )
		}
		
		override land( id: string ) {
			return this.realm().Land( BigInt( id ) )
		}
		
		override spread_title( id: bigint ) {
			return BigInt(id).toString(36)
		}
		
		// override land_new() {
		// 	const lord = BigInt( Math.random() * 2**64 )
		// 	this.realm().Land( lord )
		// 	this.spread( lord.toString() )
		// }
		
	}
}
