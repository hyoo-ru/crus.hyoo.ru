namespace $.$$ {
	export class $hyoo_crus_yard extends $.$hyoo_crus_yard {
		
		static async save( land_ref: string, units: readonly $hyoo_crus_unit[] ) {
			
			land_ref = land_ref.padEnd( 24, 'A' )
			
			const db = await this.db()
			const change = db.change( 'Pass', 'Gift', 'Gist' )
			const { Pass, Gift, Gist } = change.stores
			
			for( const unit of units ) {
				
				unit.choose({
					pass: pass => Pass.put( pass.buffer, [ land_ref, pass.peer() ] ),
					gift: gift => Gift.put( gift.buffer, [ land_ref, $hyoo_crus_ref.make( gift.dest() ).toString() ] ),
					gist: gist => Gist.put( gist.buffer, [ land_ref, gist.head(), gist.self() ] ),
				})
				
				this.persisted.add( unit )
				
			}
			
			await change.commit()
			
		}
		
		@ $mol_action
		static load( land_ref: string ) {
			
			land_ref = land_ref.padEnd( 24, 'A' )
			
			const key = $mol_wire_sync( IDBKeyRange ).bound( [ land_ref ], [ land_ref + '\uFFFF' ] )
			
			const [ pass, gift, gist ] = $mol_wire_sync( this ).query( key )
			
			const units = [
				... pass.map( bin => new $hyoo_crus_pass( bin ) ),
				... gift.map( bin => new $hyoo_crus_gift( bin ) ),
				... gist.map( bin => new $hyoo_crus_gist( bin ) ),
			]
			
			for( const unit of units ) this.persisted.add( unit )
			
			return units
		}
		
		static async query( key: IDBKeyRange ) {
			const db = await this.db()
			const { Pass, Gift, Gist } = db.read( 'Pass', 'Gift', 'Gist' )
			return Promise.all([ Pass.select( key ), Gift.select( key ), Gist.select( key ) ])
		}
		
		@ $mol_memo.method
		static async db() {
			
			return await this.$.$mol_db<{
				Pass: {
					//     land    peer
					Key: [ string, number ]
					Doc: ArrayBuffer
					Indexes: {}
				}
				Gift: {
					//     land    dest
					Key: [ string, string ]
					Doc: ArrayBuffer
					Indexes: {}
				}
				Gist: {
					//     land    head    self
					Key: [ string, number, number ]
					Doc: ArrayBuffer
					Indexes: {}
				}
			}>( '$hyoo_crus_yard',
				mig => {
					mig.store_make( 'Pass' )
					mig.store_make( 'Gift' )
					mig.store_make( 'Gist' )
				},
			)
			
		}
		
	}
}
