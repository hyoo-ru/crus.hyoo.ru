namespace $.$$ {
	export class $hyoo_cras_land_book extends $.$hyoo_cras_land_book {
		
		override menu_title() {
			return '🌍Land ' + this.land().slug()
		}
		
		@ $mol_mem
		override spread_ids() {
			const land = this.land()
			return [ 0, ... land.self_all.values() ].map( head => land.Node( $hyoo_cras_node ).Item( head ).slug() || 'AAAAAAAA' )
		}
		
		override spread_title( head: string ) {
			return this.node( head ).slug() || 'Root'
		}
		
		override node( id: string ) {
			return this.land().Node( $hyoo_cras_node ).Item( new $mol_buffer( $mol_base64_ae_decode( id ).buffer ).uint48(0) )
		}
		
	}
}
