namespace $.$$ {
	export class $hyoo_crus_node_page extends $.$hyoo_crus_node_page {
		
		override title() {
			return '🧩Node ' + this.node().head()
		}
		
		override text( next?: string ) {
			return this.node().cast( $hyoo_crus_text ).text( next )
		}
		
		override selection( next?: [ number, number ] ) {
			return this.node().cast( $hyoo_crus_text ).selection( this.node().land().auth().pass().lord(), next )
		}
		
	}
}
