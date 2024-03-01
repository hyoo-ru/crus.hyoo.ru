namespace $ {
	export class $hyoo_crus_mine_node extends $hyoo_crus_mine {
		
		@ $mol_mem
		static root() {
			return $mol_file.relative( '.crus' )
		}
		
		@ $mol_mem_key
		static rock_file( hash: Uint8Array ) {
			const id = $mol_base64_ae_encode( hash )
			return this.root().resolve( `rock/${ id.slice( 0, 2 ) }/${ id }.blob` )
		}
		
		@ $mol_mem_key
		static rock( hash: Uint8Array, next?: Uint8Array ): Uint8Array | undefined {
			$mol_wire_solid()
			return this.rock_file( hash ).buffer( next )
		}
		
	}
	$.$hyoo_crus_mine = $hyoo_crus_mine_node
}
