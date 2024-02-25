namespace $.$$ {
	export class $hyoo_crus_yard extends $.$hyoo_crus_yard {
		
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
		
		@ $mol_mem
		master() {
			
			this.reconnects()
			
			const link = this.master_current()
			const socket = new $mol_dom_context.WebSocket( link.replace( /^http/, 'ws' ) )
			socket.binaryType = 'arraybuffer'
			const port = $mol_rest_port_ws_web.make({ socket })
			
			socket.onmessage = async( event )=> {
				
				if( event.data instanceof ArrayBuffer ) {
					if( !event.data.byteLength ) return
					await $mol_wire_async( this ).port_income( port, new Uint8Array( event.data ) )
				} else {
					
					this.$.$mol_log3_fail({	
						place: this,
						message: 'Wrong data',
						data: event.data
					})
					
				}
				
			}
			
			let interval: any

			socket.onclose = ()=> {
				clearInterval( interval )
				setTimeout( ()=> this.reconnects( null ), 1000 )
			}
			
			Object.assign( socket, {
				destructor: ()=> {
					socket.onclose = ()=> {}
					clearInterval( interval )
					socket.close()
				}
			} )
			
			return new Promise< $mol_rest_port >( ( done, fail )=> {
				
				socket.onopen = ()=> {
					
					this.$.$mol_log3_come({
						place: this,
						message: 'Connected',
						port: $mol_key( port ),
						server: link,
					})
					
					interval = setInterval( ()=> socket.send( new Uint8Array ), 30000 )
		
					done( port )
				}
				
				socket.onerror = ()=> {
					
					socket.onclose = event => {
						fail( new Error( `Master is unavailable (${ event.code })` ) )
						clearInterval( interval )
						setTimeout( ()=> {
							this.master_next()
							this.reconnects( null )
						} )
					}
					
				}
				
			} ) as any as $mol_rest_port
			
		}
		
	}
}
