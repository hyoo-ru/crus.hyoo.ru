namespace $.$$ {
	export class $hyoo_crowds_area_book extends $.$hyoo_crowds_area_book {
		
		@ $mol_mem
		override spread_ids() {
			return [ 0, ... this.area().gist.keys() ].map( String )
		}
		
		override spread_title( head: number ) {
			return Number( head ).toString(36)
		}
		
		override node( id: string ) {
			return this.area().Node( $hyoo_crowds_node ).Item( Number( id ) )
		}
		
	}
}
