namespace $ {
	export class $hyoo_crus_mine_web extends $hyoo_crus_mine {
		
		@ $mol_mem_key
		static rock( hash: Uint8Array, next?: Uint8Array ): Uint8Array | undefined {
			$mol_wire_solid()
			
			const prev = $mol_mem_cached( ()=> this.rock( hash ) )
			if( prev ) return prev
			
			if( next ) {
				this.change().then( Rock => Rock.put( next.buffer, [ hash ] ) )
				return next
			} else {
				const buf = $mol_wire_sync( this.read() ).get([ hash ])
				return buf ? new Uint8Array( buf ) : undefined
			}
			
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
					Doc: ArrayBuffer
					Indexes: {}
				}
			}
			
			return await this.$.$mol_db< Scheme >( '$hyoo_crus_mine',
				mig => mig.store_make( 'Rock' ),
			)
			
		}
		
	}
	$.$hyoo_crus_mine = $hyoo_crus_mine_web
}
