namespace $ {
	export class $hyoo_crus_mine_idb extends $hyoo_crus_mine {
		
		@ $mol_mem_key
		static rock( hash: $hyoo_crus_link, next?: Uint8Array< ArrayBuffer > ): Uint8Array< ArrayBuffer > | null {
			
			const prev = $mol_mem_cached( ()=> this.rock( hash ) )
			if( prev ) return prev
			
			if( next ) {
				this.rock_change().then( Rock => Rock.put( next.buffer, [ hash.str ] ) )
				return next
			} else {
				const buf = $mol_wire_sync( this.rock_read() ).get([ hash.str ])
				return buf ? new Uint8Array( buf ) : null
			}
			
		}
		
		@ $mol_action
		static rock_read() {
			const db = this.db_sync()
			return $mol_wire_sync( db ).read( 'Rock' ).Rock
		}
		
		static async rock_change() {
			const db = await this.db()
			return db.change( 'Rock' ).stores.Rock
		}
		
		static async units_save( land: $hyoo_crus_link, units: readonly $hyoo_crus_unit[] ) { $hyoo_crus_land
			
			const db = await this.db()
			const change = db.change( 'Land' )
			const { Land } = change.stores
			
			for( const unit of units ) {
				Land.put( unit.buffer, [ land.str, unit.key() ] )
				this.units_persisted.add( unit )
			}
			
			await change.commit()
			
		}
		
		static async units_load( land: $hyoo_crus_link ) {
			
			const db = await this.db()
			const { Land } = db.read( 'Land' )
			const land_key = IDBKeyRange.bound( [ land.str, '' ], [ land.str, '\uFFFF' ] )
			const res = await Land.select( land_key )
			
			const units = res.map( bin => new $hyoo_crus_unit( bin ).narrow() )
			for( const unit of units ) {
				this.units_persisted.add( unit )
				$hyoo_crus_unit_trusted.add( unit )
			}
			
			return units
		}

		@ $mol_mem
		static db_sync() {
			$mol_wire_solid()
			return $mol_wire_sync( this ).db()
		}
		
		@ $mol_memo.method
		static async db() {
			
			return await this.$.$mol_db<{
				Rock: {
					Key: [ hash: string ]
					Doc: ArrayBuffer
					Indexes: {}
				}
				Land: {
					Key: [ land: string, path: string ]
					Doc: ArrayBuffer
					Indexes: {}
				}
			}>( '$hyoo_crus',
				mig => mig.store_make( 'Rock' ),
				mig => mig.store_make( 'Land' ),
				mig => mig.stores.Land.clear(),
				mig => mig.stores.Land.clear(),
				mig => mig.stores.Land.clear(),
			)
			
		}
		
	}
}
