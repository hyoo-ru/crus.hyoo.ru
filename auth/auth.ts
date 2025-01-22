namespace $ {
	
	/** Private key generated with Proof of Work */
	export class $hyoo_crus_auth extends $mol_crypto_key_private {
		
		/** Current Private key generated with Proof of Work  */
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
				if( auth.uint8(0) !== 0b1111_1111 ) continue
				return this.from( auth )
			}
			$mol_fail( new Error( `Too long key generation` ) )
		}
		
		@ $mol_memo.method
		hash() {
			return $hyoo_crus_link.hash_bin( this )
		}
		
		/** Independent actor with global unique id generated from Auth key */
		@ $mol_memo.method
		lord() {
			return this.hash().lord()
		}
		
		/** Land local unique identifier of independent actor (first half of Lord) */
		@ $mol_memo.method
		peer() {
			return this.hash().peer()
		}
		
		@ $mol_mem_key
		secret_mutual( pub: string ) {
			return $mol_wire_sync( $mol_crypto_secret ).derive( this.toString(), pub.toString() )
		}
		
	}
	
}
