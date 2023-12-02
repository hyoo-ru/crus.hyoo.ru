namespace $.$$ {
	export class $hyoo_crowds_area_book extends $.$hyoo_crowds_area_book {
		
		override menu_title() {
			return 'Area ' + this.area().ref() 
		}
		
		@ $mol_mem
		override spread_ids() {
			const area = this.area()
			return [ 0, ... area.gist.keys() ].map( head => area.Node( $hyoo_crowds_node ).Item( head ).ref().toString() )
		}
		
		override spread_title( head: string ) {
			return this.node( head ).slug()
		}
		
		override node( id: string ) {
			return this.area().Node( $hyoo_crowds_node ).Item( $hyoo_crowds_ref.from( id ).head() )
		}
		
	}
}
