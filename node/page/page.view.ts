namespace $.$$ {
	export class $hyoo_crus_node_page extends $.$hyoo_crus_node_page {
		
		override title() {
			return '🧩Node ' + this.node().slug()
		}
		
		override text( next?: string ) {
			return this.node().cast( $hyoo_crus_text ).text( next )
		}
		
	}
}
