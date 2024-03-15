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
			
			const lord_ref = land.lord()!.ref().description!
			const land_numb = land.numb() || 'AAAAAAAA'
			
			for( const unit of units ) {
				
				unit.choose({
					pass: pass => Pass.put( pass.buffer, [ lord_ref, land_numb, pass.peer() || 'AAAAAAAA' ] ),
					gift: gift => Gift.put( gift.buffer, [ lord_ref, land_numb, gift.dest().description || 'AAAAAAAAAAAAAAAA' ] ),
					gist: gist => Gist.put( gist.buffer, [ lord_ref, land_numb, gist.head() || 'AAAAAAAA', gist.self() || 'AAAAAAAA' ] ),
				})
				
				this.persisted.add( unit )
				
			}
			
			await change.commit()
			
		}
		
		@ $mol_action
		load( land: $hyoo_crus_land ) {
			
			const lord_ref = land.lord()!.ref().description
			const land_numb = land.numb() || 'AAAAAAAA'
			
			const key = $mol_wire_sync( IDBKeyRange ).bound( [ lord_ref, land_numb ], [ lord_ref, land_numb + '\uFFFF' ] )
			
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
	$.$hyoo_crus_yard = $hyoo_crus_yard_web
}
