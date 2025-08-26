namespace $ {
	
	function Sync< Result >( task: ()=> Promise< Result > ) {
		return task() as Result
	}
		
	export class $hyoo_crus_mine_idb extends $hyoo_crus_mine {
		
		@ $mol_action
		override units_save( diff: $hyoo_crus_mine_diff ) {
			
			return Sync( async ()=> {
			
				const db = await this.$.$hyoo_crus_mine_idb.db()
				const change = db.change( 'Unit', 'Ball' )
				const { Unit, Ball } = change.stores
				const land = this.land().str
				
				for( const unit of diff.del ) {
					
					Unit.drop( [ land, unit.path() ] )
					
					unit.choose({
						gift: ()=> {},
						sand: sand => {
							if( sand.size() <= $hyoo_crus_sand.size_equator ) return
							Ball.drop([ land, unit.path() ])
						},
					})
					
				}
				
				for( const unit of diff.ins ) {
					
					Unit.put( [ unit.buffer ], [ land, unit.path() ] )
					this.units_persisted.add( unit )
					
					unit.choose({
						gift: ()=> {},
						sand: sand => {
							if( sand.size() <= $hyoo_crus_sand.size_equator ) return
							Ball.put( [ sand.ball().buffer ], [ land, unit.path() ] )
						},
					})
					
				}
				
				await change.commit()
			
			})
			
		}
		
		@ $mol_action
		override units_load() {
			
			return Sync( async ()=> {
			
				const db = await this.$.$hyoo_crus_mine_idb.db()
				const { Unit } = db.read( 'Unit' )
				const land = this.land().str
				
				const range = IDBKeyRange.bound( [ land, '' ], [ land, '\uFFFF' ] )
				const res = await Unit.select( range )
				
				const units = res.map( bin => $hyoo_crus_unit_base.narrow( bin[0] ) )
				for( const unit of units ) {
					
					this.units_persisted.add( unit )
					$hyoo_crus_unit_trusted.add( unit )
					
				}
				
				return units as readonly $hyoo_crus_unit[]
			} )
			
		}
		
		override ball_load( path: string ) {
			
			return Sync( async ()=> {
				
				const db = await this.$.$hyoo_crus_mine_idb.db()
				const { Ball } = db.read( 'Ball' )
				const land = this.land().str
				
				const res = await Ball.get([ land, path ])
				return new Uint8Array( res![0] )
			
			} )
			
		}

		@ $mol_memo.method
		static async db() {
			
			return await this.$.$mol_db<{
				
				Unit: {
					Key: [ land: string, path: string ]
					Doc: [ ArrayBuffer ]
					Indexes: {}
				}
				
				Ball: {
					Key: [ land: string, path: string ]
					Doc: [ ArrayBuffer ]
					Indexes: {}
				}
				
			}>( '$hyoo_crus_mine',
				mig => mig.store_make( 'Unit' ),
				mig => mig.store_make( 'Ball' ),
			)
			
		}
		
	}
	
}
