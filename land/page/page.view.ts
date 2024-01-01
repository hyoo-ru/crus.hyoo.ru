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
		
		@ $mol_mem
		override encryptable() {
			return this.land().encrypted() || this.land().encryptable()
		}
		
		@ $mol_mem
		override encrypted( next?: boolean ) {
			return this.land().encrypted( next )
		}
		
		@ $mol_mem
		override body() {
			return [
				this.Node( '' ),
				this.Node( 'AAAAAAAB' ),
			]
		}
		
		@ $mol_action
		override dump() {
			return new Blob( [ this.land().dump() ], { type: 'application/x-crus-land' } )
		}
		
		override dump_name() {
			return `${ this.land().guid() }.land`
		}
		
		@ $mol_action
		override update( files: File[] ) {
			for( const file of files ) {
				const dump = $mol_wire_sync( file ).arrayBuffer()
				this.land().apply_dump( new Uint8Array( dump ) )
			}
			return []
		}
		
		// override text( next?: string ) {
		// 	return this.node().cast( $hyoo_crus_text ).text( next )
		// }
		
		// override selection( next?: [ number, number ] ) {
		// 	return this.node().cast( $hyoo_crus_text ).selection( this.node().land().auth().lord(), next )
		// }
		
	}
}
