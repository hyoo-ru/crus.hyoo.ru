namespace $.$$ {
	export class $hyoo_crus_land_page extends $.$hyoo_crus_land_page {
		
		override title() {
			return '🌍 ' + this.land().ref().description
		}
		
		override node_title( head: string ) {
			const id = this.node_dump( head ).head()
			if( id === 'AQAAAAAA' ) return 'Meta'
			return id || 'Data'
		}
		
		override node_dump( head: string ) {
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
				this.Flex(),
				this.Node_dump( this.node().head() ),
				this.Node_dump( 'AQAAAAAA' ),
			]
		}
		
		override fork() {
			this.$.$mol_dom_context.location.href = this.$.$mol_state_arg.link({
				ref: this.land().fork().ref().description!
			})
		}
		
		@ $mol_mem
		pack() {
			this.$.$mol_wait_rest()
			const dump = this.land().dump()
			return $hyoo_crus_pack.make( {}, { [ dump.land ]: dump.units }, dump.rocks )
		}
		
		@ $mol_mem
		override size() {
			return $mol_si_short( this.pack().byteLength, 'B' )
		}
		
		override dump() {
			return this.pack().toBlob()
		}
		
		override dump_name() {
			return `${ this.land().ref().description }.crus`
		}
		
		// override text( next?: string ) {
		// 	return this.node().cast( $hyoo_crus_text ).text( next )
		// }
		
		// override selection( next?: [ number, number ] ) {
		// 	return this.node().cast( $hyoo_crus_text ).selection( this.node().land().auth().lord(), next )
		// }
		
	}
}
