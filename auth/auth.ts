namespace $ {
	
	export class $hyoo_crus_auth extends $mol_crypto_key_private {
		
		@ $mol_mem
		static current( next?: $hyoo_crus_auth | null ) {
			
			$mol_wire_solid()
			
			if( next === undefined ) {
				const key = String( $mol_state_local.value( '$hyoo_crus_auth' ) ?? '' )
				if( key ) return $hyoo_crus_auth.from( key )
			}
			
			if( !next ) next = this.grab()
			
			$mol_state_local.value( '$hyoo_crus_auth', next.toString() )
			
			return next
		}
		
		static embryos = [] as string[]
		
		@ $mol_action
		static grab() {
			if( this.embryos.length ) return this.from( this.embryos.pop()! )
			return $mol_wire_sync( this as typeof $hyoo_crus_auth ).generate()
		}
		
		static async generate() {
			for( let i = 0; i < 4096; ++i ) {
				const auth = await super.generate()
				if( auth.uint8(0) !== $hyoo_crus_unit_kind.pass ) continue
				return this.from( auth )
			}
			$mol_fail( new Error( `Too long key generation` ) )
		}
		
		@ $mol_memo.method
		lord() {
			return $hyoo_crus_ref_decode( new Uint8Array( this.buffer, 2, 12 ) )
		}
		
		@ $mol_memo.method
		peer() {
			return $mol_base64_ae_encode( new Uint8Array( this.buffer, 2, 6 ) )
		}
		
		@ $mol_mem_key
		secret_mutual( pub: string ) {
			return $mol_wire_sync( $mol_crypto_secret ).derive( this.toString(), pub.toString() )
		}
		
	}
	
}
