namespace $.$$ {
	export class $hyoo_cras_yard extends $.$hyoo_cras_yard {
		
		static persisted = new WeakSet< $hyoo_cras_unit >()
		
		static async save( land_ref: string, units: readonly $hyoo_cras_unit[] ) {
			
			const db = await this.db()
			const change = db.change( 'Pass', 'Gift', 'Gist' )
			const { Pass, Gift, Gist } = change.stores
			
			for( const unit of units ) {
				
				unit.choose({
					pass: pass => Pass.put( pass.buffer, [ land_ref, pass.peer() ] ),
					gift: gift => Gift.put( gift.buffer, [ land_ref, $hyoo_cras_ref.make( gift.dest() ).toString() ] ),
					gist: gist => Gist.put( gist.buffer, [ land_ref, gist.head(), gist.self() ] ),
				})
				
				this.persisted.add( unit )
				
			}
			
			await change.commit()
			
		}
		
		@ $mol_action
		static load( land_ref: string ) {
			
			const key = $mol_wire_sync( IDBKeyRange ).bound( [ land_ref ], [ land_ref + '\uFFFF' ] )
			
			const [ pass, gift, gist ] = $mol_wire_sync( this ).query( key )
			
			const units = [
				... gift.map( bin => new $hyoo_cras_gift( bin ) ),
				... pass.map( bin => new $hyoo_cras_pass( bin ) ),
				... gist.map( bin => new $hyoo_cras_gist( bin ) ),
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
