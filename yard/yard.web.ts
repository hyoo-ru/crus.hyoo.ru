namespace $.$$ {
	export class $hyoo_crus_yard extends $.$hyoo_crus_yard {
		
		static async save( land: $hyoo_crus_land, units: readonly $hyoo_crus_unit[] ) {
			
			const db = await this.db()
			const change = db.change( 'Pass', 'Gift', 'Gist' )
			const { Pass, Gift, Gist } = change.stores
			
			const lord_numb = land.lord()!.numb()
			const land_numb = land.numb() || 'AAAAAAAA'
			
			for( const unit of units ) {
				
				unit.choose({
					pass: pass => Pass.put( pass.buffer, [ lord_numb, land_numb, pass.peer() || 'AAAAAAAA' ] ),
					gift: gift => Gift.put( gift.buffer, [ lord_numb, land_numb, gift.dest() || 'AAAAAAAAAAAAAAAA' ] ),
					gist: gist => Gist.put( gist.buffer, [ lord_numb, land_numb, gist.head() || 'AAAAAAAA', gist.self() || 'AAAAAAAA' ] ),
				})
				
				this.persisted.add( unit )
				
			}
			
			await change.commit()
			
		}
		
		@ $mol_action
		static load( land: $hyoo_crus_land ) {
			
			const lord_numb = land.lord()!.numb()
			const land_numb = land.numb() || 'AAAAAAAA'
			
			const key = $mol_wire_sync( IDBKeyRange ).bound( [ lord_numb, land_numb ], [ lord_numb, land_numb + '\uFFFF' ] )
			
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
					//     lord    land    peer
					Key: [ string, string, string ]
					Doc: ArrayBuffer
					Indexes: {}
				}
				Gift: {
					//     lord    land    dest
					Key: [ string, string, string ]
					Doc: ArrayBuffer
					Indexes: {}
				}
				Gist: {
					//     lord    land    head    self
					Key: [ string, string, string, string ]
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
