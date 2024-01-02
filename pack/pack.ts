namespace $ {
	export class $hyoo_crus_pack extends $mol_buffer {
		
		static four_cc = 'CRUS' 
		
		check_cc() {
			const fcc = $mol_charset_decode( new Uint8Array( this.buffer, 0, 4 ) )
			if( fcc !== $hyoo_crus_pack.four_cc ) $mol_fail( new Error( `Binary isn't a CRUS pack` ) )
		}
		
	}
}
