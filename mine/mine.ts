namespace $ {
	export class $hyoo_crowds_mine extends $mol_object {
		
		static store = new Map< bigint, Uint8Array >()
		
		static save( blob: Uint8Array ) {
			const hash = new BigUint64Array( $mol_crypto_hash( blob ).buffer, 0, 2 )
			const id = hash[0] | ( hash[1] << 64n )
			this.store.set( id, blob )
			return id
		}
		
		static load( hash: bigint ) {
			return this.store.get( hash ) ?? null
		}
		
	}
}
