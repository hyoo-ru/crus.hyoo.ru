namespace $.$$ {
	export class $hyoo_crus_land_book extends $.$hyoo_crus_land_book {
		
		override menu_title() {
			return '🌍Land ' + this.land().numb()
		}
		
		@ $mol_mem
		override spread_ids() {
			const land = this.land()
			return [ 'AAAAAAAA', ... land.self_all.values() ]
		}
		
		override spread_title( head: string ) {
			return this.node( head ).head() || 'Root'
		}
		
		override node( id: string ) {
			return this.land().Node( $hyoo_crus_node ).Item( id )
		}
		
	}
}
