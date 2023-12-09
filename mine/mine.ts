namespace $ {
	export class $hyoo_crowds_mine extends $mol_object {
		
		static store = new Map< bigint, Uint8Array >()
		
		@ $mol_mem_key
		static hash( blob: Uint8Array ) {
			return $mol_crypto_hash( blob )
		}
		
		@ $mol_mem_key
		static rock( hash: Uint8Array, next?: Uint8Array ) {
			$mol_wire_solid()
			if( !next ) return $mol_wire_sync( this.read() ).get([ hash ])
			
			this.change().then( Rock => Rock.put( next, [ hash ] ) )
			
			return next
			
		}
		
		@ $mol_action
		static save( blob: Uint8Array ) {
			const hash = this.hash( blob )
			this.rock( hash, blob )
			return hash
		}
		
		@ $mol_action
		static read() {
			const db = $mol_wire_sync( this ).db()
			return $mol_wire_sync( db ).read( 'Rock' ).Rock
		}
		
		static async change() {
			const db = await this.db()
			return db.change( 'Rock' ).stores.Rock
		}
		
		@ $mol_memo.method
		static async db() {
			
			type Scheme = {
				Rock: {
					Key: [ Uint8Array ]
					Doc: Uint8Array
					Indexes: {}
				}
			}
			
			return await this.$.$mol_db< Scheme >( '$hyoo_crowds_mine',
				mig => mig.store_make( 'Rock' ),
			)
			
		}
		
	}
}
