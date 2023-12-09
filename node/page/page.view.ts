namespace $.$$ {
	export class $hyoo_cras_node_page extends $.$hyoo_cras_node_page {
		
		override title() {
			return '🧩Node ' + this.node().slug()
		}
		
		override text( next?: string ) {
			return this.node().cast( $hyoo_cras_text ).text( next )
		}
		
	}
}
