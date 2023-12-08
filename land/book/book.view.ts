namespace $.$$ {
	export class $hyoo_crowds_land_book extends $.$hyoo_crowds_land_book {
		
		override menu_title() {
			return 'Land ' + this.land().ref() 
		}
		
		@ $mol_mem
		override spread_ids() {
			const land = this.land()
			return [ 0, ... land.gist.keys() ].map( head => land.Node( $hyoo_crowds_node ).Item( head ).ref().toString() )
		}
		
		override spread_title( head: string ) {
			return this.node( head ).slug()
		}
		
		override node( id: string ) {
			return this.land().Node( $hyoo_crowds_node ).Item( $hyoo_crowds_ref.from( id ).head() )
		}
		
	}
}
