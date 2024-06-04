namespace $ {
	export class $hyoo_crus_mine_idb extends $hyoo_crus_mine {
		
		@ $mol_mem_key
		static rock( hash: Uint8Array, next?: Uint8Array ): Uint8Array | null {
			$mol_wire_solid()
			
			const prev = $mol_mem_cached( ()=> this.rock( hash ) )
			if( prev ) return prev
			
			if( next ) {
				this.rock_change().then( Rock => Rock.put( next.buffer, [ hash ] ) )
				return next
			} else {
				const buf = $mol_wire_sync( this.rock_read() ).get([ hash ])
				return buf ? new Uint8Array( buf ) : null
			}
			
		}
		
		@ $mol_action
		static rock_read() {
			const db = $mol_wire_sync( this ).db()
			return $mol_wire_sync( db ).read( 'Rock' ).Rock
		}
		
		static async rock_change() {
			const db = await this.db()
			return db.change( 'Rock' ).stores.Rock
		}
		
		static async units_save( land: $hyoo_crus_land, units: readonly $hyoo_crus_unit[] ) {
			
			const db = await this.db()
			const change = db.change( 'Pass', 'Gift', 'Gist' )
			const { Pass, Gift, Gist } = change.stores
			
			for( const unit of units ) {
				
				unit.choose({
					pass: pass => Pass.put( pass.buffer, [ land.ref().description!, pass.peer() || 'AAAAAAAA' ] ),
					gift: gift => Gift.put( gift.buffer, [ land.ref().description!, gift.dest().description || 'AAAAAAAAAAAAAAAA' ] ),
					gist: gist => Gist.put( gist.buffer, [ land.ref().description!, gist.head() || 'AAAAAAAA', gist.self() || 'AAAAAAAA' ] ),
				})
				
				this.units_persisted.add( unit )
				
			}
			
			await change.commit()
			
		}
		
		@ $mol_action
		static units_load( land: $hyoo_crus_land ) {
			
			const land_ref = land.ref().description
			const key = $mol_wire_sync( IDBKeyRange ).bound( [ land_ref ], [ land_ref + '\uFFFF' ] )
			
			const [ pass, gift, gist ] = $mol_wire_sync( this ).units_query( key )
			
			const units = [
				... pass.map( bin => new $hyoo_crus_pass( bin ) ),
				... gift.map( bin => new $hyoo_crus_gift( bin ) ),
				... gist.map( bin => new $hyoo_crus_gist( bin ) ),
			]
			
			for( const unit of units ) this.units_persisted.add( unit )
			
			return units
		}
		
		static async units_query( key: IDBKeyRange ) {
			const db = await this.db()
			const { Pass, Gift, Gist } = db.read( 'Pass', 'Gift', 'Gist' )
			return Promise.all([ Pass.select( key ), Gift.select( key ), Gist.select( key ) ])
		}
		
		@ $mol_memo.method
		static async db() {
			
			return await this.$.$mol_db<{
				Rock: {
					Key: [ hash: Uint8Array ]
					Doc: ArrayBuffer
					Indexes: {}
				}
				Pass: {
					Key: [ land: string, peer: string ]
					Doc: ArrayBuffer
					Indexes: {}
				}
				Gift: {
					Key: [ land: string, dest: string ]
					Doc: ArrayBuffer
					Indexes: {}
				}
				Gist: {
					Key: [ land: string, head: string, self: string ]
					Doc: ArrayBuffer
					Indexes: {}
				}
			}>( '$hyoo_crus',
				mig => {
					mig.store_make( 'Rock' ),
					mig.store_make( 'Pass' )
					mig.store_make( 'Gift' )
					mig.store_make( 'Gist' )
				},
			)
			
		}
		
	}
}
