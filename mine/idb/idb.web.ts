namespace $ {
	export class $hyoo_crus_mine_idb extends $hyoo_crus_mine {
		
		@ $mol_mem_key
		ball( hash: $hyoo_crus_link, next?: Uint8Array< ArrayBuffer > | null ): Uint8Array< ArrayBuffer > | null {
			
			const prev = $mol_mem_cached( ()=> this.ball( hash ) )
			if( prev ) return prev
			
			if( next ) {
				this.ball_change().then( Ball => Ball.put( [ next.buffer ], [ this.land().str, hash.str ] ) )
				return next
			} else {
				const buf = this.ball_read().get([ this.land().str, hash.str ])
				return buf ? new Uint8Array( buf[0] ) : null
			}
			
		}
		
		ball_read() {
			const db = this.$.$hyoo_crus_mine_idb.db_sync()
			const store = $mol_wire_sync( db ).read( 'Ball' ).Ball
			return $mol_wire_sync( store )
		}
		
		async ball_change() {
			const db = await this.$.$hyoo_crus_mine_idb.db()
			return db.change( 'Ball' ).stores.Ball
		}
		
		async units_save( units: $hyoo_crus_unit[] ) {
			
			const db = await this.$.$hyoo_crus_mine_idb.db()
			const change = db.change( 'Unit', 'Ball' )
			const { Unit, Ball } = change.stores
			const land = this.land().str
			
			for( const unit of units ) {
				
				Unit.put( [ unit.buffer ], [ land, unit.path() ] )
				this.units_persisted.add( unit )
				
				Ball.put( [ unit.pass()!.buffer ], [ land, unit.pass().hash().str ] )
				
				unit.choose({
					gift: ()=> {},
					sand: sand => {
						const hash = sand.hash()
						if( !hash ) return
						Ball.put( [ sand.ball()!.buffer ], [ land, hash.str ] )
					},
				})
				
			}
			
			await change.commit()
		}
		
		async units_load() {
			
			const db = await this.$.$hyoo_crus_mine_idb.db()
			const { Unit, Ball } = db.read( 'Unit', 'Ball' )
			const land = this.land().str
			
			const range = IDBKeyRange.bound( [ land, '' ], [ land, '\uFFFF' ] )
			const ures = await Unit.select( range )
			const bres = await Ball.select( range )
			
			const units = ures.map( bin => new $hyoo_crus_unit( bin[0] ).narrow() )
			const balls = new Map< string, Uint8Array< ArrayBuffer > >()
			const passes = new Map< string, $hyoo_crus_auth_pass >()
			
			for( const [bin] of bres ) {
				
				const ball = new Uint8Array( bin )
				const hash = $hyoo_crus_link.hash_bin( ball )
				balls.set( hash.str, ball )
				
				const pass = $hyoo_crus_auth_pass.like( ball )
				if( pass ) passes.set( hash.peer().str, pass )
				
			}
			
			for( const unit of units ) {
				
				unit.choose({
					gift: gift => {
						
						const link = gift.mate_link()
						if( link.str === $hyoo_crus_link.hole.str ) return
						
						gift._mate = passes.get( link.peer().str ) ?? null
						
					},
					sand: sand => {
						
						const link = sand.ball_link()
						if( !link ) return
						
						sand._ball = balls.get( link.str ) ?? null
						
					},
				})
				
			}
			
			for( const unit of units ) {
				
				this.units_persisted.add( unit )
				$hyoo_crus_unit_trusted.add( unit )
				
				const peer = unit.pass_link()
				const pass = passes.get( peer.str )!
				unit._pass = pass
				
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
				
				Unit: {
					Key: [ land: string, path: string ]
					Doc: [ ArrayBuffer ]
					Indexes: {}
				}
				
				Ball: {
					Key: [ land: string, hash: string ]
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
