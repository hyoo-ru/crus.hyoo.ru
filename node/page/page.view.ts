namespace $.$$ {
	export class $hyoo_crowds_node_page extends $.$hyoo_crowds_node_page {
		
		override title() {
			return '🧩Node ' + this.node().slug()
		}
		
		override text( next?: string ) {
			return this.node().cast( $hyoo_crowds_text ).text( next )
		}
		
	}
}
