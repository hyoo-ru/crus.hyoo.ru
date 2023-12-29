namespace $ {
	
	export class $hyoo_crus_auth extends $mol_crypto_key_private {
		
		@ $mol_mem
		static current() {
			$mol_wire_solid()
			let key = String( $mol_state_local.value( '$hyoo_crus_auth' ) ?? '' )
			if( key ) return $hyoo_crus_auth.from( key )
			const auth = $mol_wire_sync( this as typeof $hyoo_crus_auth ).generate()
			$mol_state_local.value( '$hyoo_crus_auth', auth.toString() )
			return auth
		}
		
		static async generate() {
			for( let i = 0; i < 4096; ++i ) {
				const auth = await super.generate()
				if( auth.uint8(0) !== $hyoo_crus_unit_kind.pass ) continue
				return this.from( auth )
			}
			$mol_fail( new Error( `Too long key generation` ) )
		}
		
		lord() {
			return BigInt( this.peer() ) + ( BigInt( this.uint48( 8 ) ) << 48n )
		}
		
		peer() {
			return this.uint48( 2 )
		}
		
		@ $mol_mem_key
		secret_mutual( pub: string ) {
			return $mol_wire_sync( $mol_crypto_secret ).derive( this.toString(), pub.toString() )
		}
		
	}
	
}
