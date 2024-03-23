namespace $.$$ {
	export class $hyoo_crus_land_page extends $.$hyoo_crus_land_page {
		
		override title() {
			return '🌍 ' + this.land().ref().description
		}
		
		override theme() {
			return this.encrypted() ? '$mol_theme_special' : '$mol_theme_base'
		}
		
		override encrypted() {
			return this.land().encrypted()
		}
		
		// override node_title( head: string ) {
		// 	const id = this.node_dump( head ).head()
		// 	if( id === 'AQAAAAAA' ) return 'Meta'
		// 	return id || 'Data'
		// }
		
		override node_meta() {
			return this.land().Node( $hyoo_crus_node ).Item( 'AQAAAAAA' )
		}
		
		// @ $mol_mem
		// override body() {
		// 	return [
		// 		this.Flex(),
		// 		this.Node_dump( this.node().head() ),
		// 		this.Node_dump( 'AQAAAAAA' ),
		// 	]
		// }
		
		dump_data_node() {
			return this.node()
		}
		
		override fork() {
			this.$.$mol_dom_context.location.href = this.$.$mol_state_arg.link({
				ref: this.land().fork().ref().description!
			})
		}
		
		@ $mol_mem
		pack() {
			this.$.$mol_wait_rest()
			return this.land().delta_pack()
		}
		
		@ $mol_mem
		override size() {
			return $mol_si_short( this.pack()?.byteLength ?? 0, 'B' )
		}
		
		override dump() {
			return this.pack()?.toBlob()!
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
