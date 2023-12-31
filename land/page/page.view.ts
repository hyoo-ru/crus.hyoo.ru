namespace $.$$ {
	export class $hyoo_crus_land_page extends $.$hyoo_crus_land_page {
		
		override title() {
			return '🌍 ' + this.land().guid()
		}
		
		override node_title( head: string ) {
			const id = this.node( head ).head()
			if( id === 'AAAAAAAB' ) return 'Cloves'
			return id || 'Root'
		}
		
		override node( head: string ) {
			return this.land().Node( $hyoo_crus_node ).Item( head )
		}
		
		override encryptable() {
			return this.land().encrypted() || this.land().encryptable()
		}
		
		override encrypted( next?: boolean ) {
			if( next ) this.land().encrypt()
			return this.land().encrypted()
		}
		
		@ $mol_mem
		override body() {
			return [
				this.Node( '' ),
				this.Node( 'AAAAAAAB' ),
			]
		}
		
		// override text( next?: string ) {
		// 	return this.node().cast( $hyoo_crus_text ).text( next )
		// }
		
		// override selection( next?: [ number, number ] ) {
		// 	return this.node().cast( $hyoo_crus_text ).selection( this.node().land().auth().lord(), next )
		// }
		
	}
}
