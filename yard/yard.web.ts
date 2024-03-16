namespace $ {
	export class $hyoo_crus_yard_web extends $.$hyoo_crus_yard {
		
		static masters = [
			'https://crus.onrender.com/',
			'https://crus.hyoo.ru/',
		]
		
		async save( land: $hyoo_crus_land, units: readonly $hyoo_crus_unit[] ) {
			
			const db = await this.db()
			const change = db.change( 'Pass', 'Gift', 'Gist' )
			const { Pass, Gift, Gist } = change.stores
			
			for( const unit of units ) {
				
				unit.choose({
					pass: pass => Pass.put( pass.buffer, [ land.ref().description!, pass.peer() || 'AAAAAAAA' ] ),
					gift: gift => Gift.put( gift.buffer, [ land.ref().description!, gift.dest().description || 'AAAAAAAAAAAAAAAA' ] ),
					gist: gist => Gist.put( gist.buffer, [ land.ref().description!, gist.head() || 'AAAAAAAA', gist.self() || 'AAAAAAAA' ] ),
				})
				
				this.persisted.add( unit )
				
			}
			
			await change.commit()
			
		}
		
		@ $mol_action
		load( land: $hyoo_crus_land ) {
			
			const land_ref = land.ref().description
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
		
		async query( key: IDBKeyRange ) {
			const db = await this.db()
			const { Pass, Gift, Gist } = db.read( 'Pass', 'Gift', 'Gist' )
			return Promise.all([ Pass.select( key ), Gift.select( key ), Gist.select( key ) ])
		}
		
		@ $mol_memo.method
		async db() {
			
			return await this.$.$mol_db<{
				Pass: {
					//     land    peer
					Key: [ string, string ]
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
					Key: [ string, string, string ]
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
	$.$hyoo_crus_yard = $hyoo_crus_yard_web
}
