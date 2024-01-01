namespace $ {
	
	export class $hyoo_crus_land extends $mol_object {
		
		lord() {
			return null as null | $hyoo_crus_lord
		}
		
		numb() {
			return ''
		}
		
		lord_numb() {
			return this.lord()?.numb() ?? this.auth().lord()
		}
		
		realm() {
			return this.lord()?.realm() ?? null
		}
		
		auth() {
			return this.$.$hyoo_crus_auth.current()
		}
		
		guid() {
			return this.lord_numb() + this.numb()
		}
		
		face = new $hyoo_crus_face
		
		passes = new $mol_wire_dict< string /*peer*/, $hyoo_crus_pass >()
		gifts = new $mol_wire_dict< string /*lord*/, $hyoo_crus_gift >()
		gists = new $mol_wire_dict< string /*head*/, $mol_wire_dict< string /*self*/, $hyoo_crus_gist > >()
		
		self_all = new $mol_wire_set< string >()
		
		@ $mol_action
		self_make( idea = Math.floor( Math.random() * 2**48 ) ) {
			
			const auth = this.auth()
			const rang = this.lord_rang( auth.lord() )
			
			if( rang === $hyoo_crus_rang.add ) return auth.peer()
			if( rang === $hyoo_crus_rang.nil ) $mol_fail( new Error( 'Rang too low (nil)' ) )
			
			const numb = this.numb()
			for( let i = 0; i < 4096; ++i ) {
				
				idea = ( idea + 1 ) % 2**48
				if( !idea ) continue
				
				const idea_str = $mol_base64_ae_encode( new Uint8Array( new BigUint64Array([ BigInt( idea ) ]).buffer, 0, 6 ) )
				if( idea_str === numb ) continue
				if( this.self_all.has( idea_str ) ) continue
				
				this.self_all.add( idea_str )
				return idea_str
				
			}
			
			$mol_fail( new Error( `Too long self generation` ) )
		}
		
		@ $mol_mem_key
		Root< Node extends typeof $hyoo_crus_node >( Node: Node ) {
			return this.Node( Node ).Item( '' )
		} 
		
		@ $mol_mem_key
		Node< Node extends typeof $hyoo_crus_node >( Node: Node ): $hyoo_crus_fund< string, InstanceType< Node > > {
			return new $hyoo_crus_fund( ( head: string )=> {
				if( head === 'AAAAAAAA' ) return this.Node( Node ).Item( '' )
				return Node.make({
					land: $mol_const( this ),
					head: $mol_const( head ),
				}) as InstanceType< Node >
			} )
		} 
		
		@ $mol_mem
		total() {
			let total = this.passes.size + this.gifts.size
			for( const units of this.gists.values() ) total += units.size
			return total
		}
		
		@ $mol_mem
		joined_list() {
			return [ ... this.passes.values() ].map( unit => unit.lord() )
		}
		
		@ $mol_mem_key
		lord_rang( lord: string ) {
			if( lord === this.lord_numb() ) return $hyoo_crus_rang.law
			return this.gifts.get( lord )?.rang() ?? $hyoo_crus_rang.get
		}
		
		peer_rang( peer: string ) {
			const auth = this.passes.get( peer )!
			if( !auth ) return $hyoo_crus_rang.get
			return this.lord_rang( auth.lord() )
		}
		
		/** Picks units between Face and current state. */
		delta_unit( face = new $hyoo_crus_face ) {
			
			const delta = [] as $hyoo_crus_unit[]
			
			for( const unit of this.passes.values() ) {
				if( face.get( unit.peer() ) ) continue
				delta.push( unit )
			}
			
			for( const [ lord, unit ] of this.gifts ) {
				const time = face.get( lord.slice( 0, 8 ) )
				if( !time || time < unit.time() ) delta.push( unit )
			}
			
			for( const kids of this.gists.values() ) {
				for( const unit of kids.values() ) {
					const time = face.get( unit.peer() )
					if( !time || time < unit.time() ) delta.push( unit )
				}
			}
			
			return delta
			
		}
		
		/** Makes binary Delta between Face and current state. */
		delta_buffer( face = new $hyoo_crus_face ) {
			
			const delta = this.delta_unit( face )
			const bytes = new Uint8Array( delta.length * $hyoo_crus_unit.size )
			
			for( let i = 0; i < delta.length; ++ i ) {
				const unit = delta[ i ]
				bytes.set( unit.asArray(), i * $hyoo_crus_unit.size )
			}
			
			return bytes
		}
		
		/** Applies Delta to current state. */
		@ $mol_action
		apply_unit( delta: readonly $hyoo_crus_unit[] ) {
			return delta.map( unit => {
				
				const error = this.check_unit( unit )
				if( error ) return error
				
				let need_recheck = false
				const res = unit.choose({
					
					pass: next => {
						
						const peer = next.peer()
						
						const exists = this.passes.get( peer )
						if( exists ) return 'Already joined'
						
						this.passes.set( peer, next )
						this.face.see_peer( next.peer(), 0 )
						
					},
					
					gift: next => {
						
						const dest = next.dest()
						
						const prev = this.gifts.get( dest )
						if( prev && $hyoo_crus_gift.compare( prev, next ) <= 0 ) return 'Unit too old'
						
						this.gifts.set( dest, next )
						this.face.see_peer( dest.slice( 0, 8 ), next.time() )
						
						if( ( prev?.rang() ?? $hyoo_crus_rang.get ) > next.rang() ) need_recheck = true
						
					},
					
					gist: next => {
						
						const head = next.head()
						const self = next.self()
						
						let units = this.gists.get( head )
						if( !units ) this.gists.set( head, units = new $mol_wire_dict )
							
						const prev = units.get( self )
						if( prev && $hyoo_crus_gist.compare( prev, next ) <= 0 ) return 'Unit too old'
						
						units.set( self, next )
						this.self_all.add( self )
						this.face.see_peer( next.peer(), next.time() )
						
					},
					
				})
				
				if( need_recheck ) this.recheck()
				return res ?? ''
				
			})
		}
		
		apply_land( land: $hyoo_crus_land ) {
			return this.apply_unit( land.delta_unit() )
		}
		
		recheck() {
			
			for( const [ peer, pass ] of this.passes ) {
				if( this.check_unit( pass ) ) this.passes.delete( peer )
			}
			
			for( const [ lord, gift ] of this.gifts ) {
				if( this.check_unit( gift ) ) this.gifts.delete( lord )
			}
			
			for( const [ head, units ] of this.gists ) {
				for( const [ self, gist ] of units ) {
					if( this.check_unit( gist ) ) units.delete( self )
				}
			}
			
		}
		
		check_unit( unit: $hyoo_crus_unit ) {
			return unit.choose({
				
				pass: next => this.lord_rang( next.lord() ) < $hyoo_crus_rang.add ? 'Need add rang to join' : '',
				
				gift: next => this.peer_rang( next.peer() ) < $hyoo_crus_rang.law ? 'Need law rang to change rang': '',
				
				gist: next => next.peer() === next.self()
					? this.peer_rang( next.peer() ) < $hyoo_crus_rang.add ? 'Need add rang to post self data' : ''
					: this.peer_rang( next.peer() ) < $hyoo_crus_rang.mod ? 'Need mod rang to post any data' : '',
				
			})
		}
		
		@ $mol_action
		fork() {
			const land = this.realm()!.home().Land_new(0)
			land.cloves()!.items([ this.guid() ])
			return land
		}
		
		cloves() {
			if( !this.numb() ) return null
			return this.Node( $hyoo_crus_list ).Item( 'AAAAAAAB' )
		}
		
		@ $mol_mem_key
		gists_ordered( head: string ) {
			
			this.sync()
			
			const queue = [ ... this.gists.get( head )?.values() ?? [] ]
			
			merge: if( this.numb() && ( head !== 'AAAAAAAB' ) ) {
				
				const cloves = this.cloves()!.items().slice().reverse() as string[]
				if( !cloves.length ) break merge
				
				const exists = new Set([ ... this.gists.get( head )?.keys() ?? [] ])
				
				const realm  = this.realm()!
				for( const guid of cloves ) {
					
					const clove = realm.Land( guid )
					for( const gist of clove.gists_ordered( head ) ) {
						
						if( exists.has( gist.self() ) ) continue
						queue.push( gist )
						exists.add( gist.self() )
						
					}
					
				}
				
			}
			
			if( queue.length < 2 ) return queue.filter( unit => !unit.nil() )
			
			queue.sort( $hyoo_crus_gist.compare )
			
			const res = [] as $hyoo_crus_gist[]
			
			const locate = ( self: string )=> {
				
				for( let i = res.length - 1; i >= 0; --i ) {
					if( res[i].self() === self ) return i
				}
				
				return -1
			}
			
			while( queue.length ) {
				
				res.push( queue.pop()! )
				
				for( let cursor = queue.length - 1; cursor >= 0; --cursor ) {
					
					const kid = queue[cursor]
					let index = 0

					if( kid.lead() ) {
						index = locate( kid.lead() ) + 1
						if( !index ) continue
					}
					
					while( res[ index ] && ( $hyoo_crus_gist.compare( res[ index ], kid ) < 0 ) ) ++ index
					
					const exists = locate( kid.self() )
					if( index === exists ) {
						if( cursor === queue.length - 1 ) queue.pop()
						continue
					}

					if( exists >= 0 ) {
						res.splice( exists, 1 )
						if( exists < index ) -- index
					}
					
					res.splice( index, 0, kid )
					
					if( cursor === queue.length - 1 ) queue.pop()
					cursor = queue.length

				}
				
			}
			
			return res.filter( unit => !unit.nil() )
		}
		
		/** Register public key **/
		@ $mol_action
		join() {
			
			const auth = this.auth()
			
			const prev = this.passes.get( auth.peer() )
			if( prev ) return prev
			
			const next = new $hyoo_crus_pass
			next.auth( auth.public().asArray() )
			
			const error = this.apply_unit([ next ])[0]
			if( error ) $mol_fail( new Error( error ) )
			
			return next
		}
		
		/** Places data to tree. */
		@ $mol_action
		give(
			dest: string,
			rang: $hyoo_crus_rang,
		) {
				
			this.join()
			
			const auth  = this.auth()
			const unit = new $hyoo_crus_gift
			
			unit.rang( rang )
			unit.time( this.face.tick( auth.peer() ) )
			unit.peer( auth.peer() )
			unit.dest( dest )
			
			const error = this.apply_unit([ unit ])[0]
			if( error ) $mol_fail( new Error( error ) )
			
			return unit
		}
		
		/** Places data to tree. */
		@ $mol_action
		post(
			lead: string,
			head: string,
			self: string,
			vary: $hyoo_crus_vary_type,
			tag = 'term' as keyof typeof $hyoo_crus_gist_tag,
		) {
			
			this.join()
			
			const auth = this.auth()
			const unit = new $hyoo_crus_gist
			
			unit.time( this.face.tick( auth.peer() ) )
			unit.peer( auth.peer() )
			unit.lead( lead )
			unit.head( head )
			unit._vary = vary
			
			let { tip, bin } = $hyoo_crus_vary_encode( vary )
			unit._open = bin
			
			if( this.encrypted() ) {
				unit.hash( $mol_crypto_hash( bin ), tip, tag )
			} else {
				if( bin.byteLength > 32 ) unit.hash( this.$.$hyoo_crus_mine.hash( bin ), tip, tag )
				else unit.data( bin, tip, tag )
			}
		
			unit.self( self || this.self_make( unit.idea() ) )
			
			const error = this.apply_unit([ unit ])[0]
			if( error ) $mol_fail( new Error( error ) )
			
			return unit
		}
		
		@ $mol_action
		gist_move(
			gist: $hyoo_crus_gist,
			head: string,
			seat: number,
		) {
			
			if( gist.nil() ) $mol_fail( new RangeError( `Can't move wiped gist` ) )
			
			const units = this.gists_ordered( head )
			if( seat > units.length ) $mol_fail( new RangeError( `Seat (${seat}) out of units length (${units.length})` ) )
			
			const lead = seat ? units[ seat - 1 ].self() : ''
			const vary = this.gist_decode( gist )
			
			if( gist.head() === head ) {
				
				const seat_prev = units.indexOf( gist )
				
				if( seat === seat_prev ) return
				if( seat === seat_prev + 1 ) return
				
				const prev = seat_prev ? units[ seat_prev - 1 ].self() : ''
				const next = units[ seat_prev + 1 ]
				
				if( next ) this.post(
					prev,
					head,
					next.self(),
					this.gist_decode( next ),
					next.tag(),
				)
				
			} else {
				
				this.gist_wipe( gist )
				
			}
			
			this.post(
				lead,
				head,
				gist.self(),
				vary,
				gist.tag(),
			)
			
		}
		
		@ $mol_action
		gist_wipe( gist: $hyoo_crus_gist ) {
			
			const units = this.gists_ordered( gist.head() )
			const seat = units.indexOf( gist )
			
			this.post(
				seat ? units[ seat - 1 ].self() : '',
				gist.head(),
				gist.self(),
				null,
				'term',
			)
			
		}
		
		@ $mol_mem
		sync() {
			
			this.loading()
			
			try {
				this.saving()
			} catch( error ) {
				$mol_fail_log( error )
			}
			
			this.bus()
			
		}
		
		@ $mol_mem
		bus() {
			return new this.$.$mol_bus< ArrayBuffer[] >( `$hyoo_crus_land:${ this.guid() }`, $mol_wire_async( bins => {
				const yard = this.$.$hyoo_crus_yard
				this.apply_unit( bins.map( bin => {
					const unit = new $hyoo_crus_unit( bin ).narrow()
					yard.persisted.add( unit )
					return unit
				} ) )
			} ) )
		}
		
		@ $mol_mem
		loading() {
			
			$mol_wire_solid()
			
			const units = this.$.$hyoo_crus_yard.load( this )
			const errors = this.apply_unit( units ).filter( Boolean )
			
			if( errors.length ) this.$.$mol_log3_fail({
				place: this,
				message: errors.join( '\n' ),
			})
			
		}
		
		@ $mol_mem
		saving() {
			
			this.$.$mol_wait_timeout(250)
			
			const yard = this.$.$hyoo_crus_yard
			
			const encoding = [] as $hyoo_crus_gist[]
			const signing = [] as $hyoo_crus_unit[]
			const persisting = [] as $hyoo_crus_unit[]
			
			for( const pass of this.passes.values() ) {
				if( !pass.signed() ) signing.push( pass )
				if( !yard.persisted.has( pass ) ) persisting.push( pass )
			}
			
			for( const gift of this.gifts.values() ) {
				if( !gift.signed() ) signing.push( gift )
				if( !yard.persisted.has( gift ) ) persisting.push( gift )
			}
			
			for( const kids of this.gists.values() ) {
				for( const gist of kids.values() ) {
					if( !gist.signed() ) {
						encoding.push( gist )
						signing.push( gist )
					}
					if( !yard.persisted.has( gist ) ) persisting.push( gist )
				}
			}
			
			$mol_wire_race( ... encoding.map( unit => ()=> this.gist_encode( unit ) ) )
			$mol_wire_race( ... signing.map( unit => ()=> this.unit_sign( unit ) ) )
			
			this.bus().send( persisting.map( unit => unit.buffer ) )
			if( persisting.length )	$mol_wire_sync( yard ).save( this, persisting )
			
		}
		
		@ $mol_mem_key
		unit_sign( unit: $hyoo_crus_unit ) {
			if( unit.signed() ) return
			
			const key = $mol_wire_sync( this.auth() )
			const sign = new Uint8Array( key.sign( unit.sens() ) )
			unit.sign( sign )
			
		}
		
		@ $mol_mem_key
		gist_encode( gist: $hyoo_crus_gist ) {
			
			if( gist._open === undefined ) return gist
			
			let bin = gist._open
			const secret = this.secret()!
			
			if( secret ) bin = new Uint8Array( $mol_wire_sync( secret ).encrypt( bin, gist.salt() ) )
			
			if( bin.byteLength > 32 ) gist.hash( this.$.$hyoo_crus_mine.save( bin ), gist.tip(), gist.tag() )
			else gist.data( bin, gist.tip(), gist.tag() )
			
			return gist
		}
		
		@ $mol_mem_key
		gist_decode( gist: $hyoo_crus_gist ): $hyoo_crus_vary_type {
			
			if( this.gists.get( gist.head() )?.get( gist.self() ) !== gist ) {
				for( const id of this.cloves()?.items() ?? [] ) {
					const vary = this.realm()?.Land( id as string ).gist_decode( gist )
					if( vary !== undefined ) return vary
				}
				return undefined!
			}
			
			if( gist._vary !== undefined ) return gist._vary
			if( gist._open !== undefined ) return gist._vary = $hyoo_crus_vary_decode({ tip: gist.tip(), bin: gist._open })
			
			let bin = gist.size() > 32 ? this.$.$hyoo_crus_mine.rock( gist.hash() ) : gist.data()
			if( bin && this.secret() ) {
				try {
					bin = new Uint8Array( $mol_wire_sync( this.secret()! ).decrypt( bin, gist.salt() ) )
				} catch( error: any ) {
					if( $mol_fail_catch( error ) ) {
						if( error.message ) $mol_fail_hidden( error )
						else $mol_fail_hidden( new Error( `Can't decrypt`, { cause: error } ) )
					}
				}
			}
			
			gist._open = bin
			return gist._vary = ( bin ? $hyoo_crus_vary_decode({ tip: gist.tip(), bin }) : null )
			
		}
		
		@ $mol_mem_key
		key_public( peer: string ) {
			const key = this.passes.get( peer )?.auth()
			return key ? $mol_crypto_key_public.from( key ) : null
		}
		
		@ $mol_mem_key
		secret_mutual( peer: string ) {
			
			const key = this.key_public( peer )
			if( !key ) return null
			
			return $mol_wire_sync( $mol_crypto_secret ).derive(
				this.auth().toString(),
				key.toString(),
			)
			
		}
		
		@ $mol_mem
		encryptable() {
			return !this.gists.size
		}
		
		@ $mol_mem
		encrypted( next?: boolean ) {
			
			$mol_wire_solid()
			
			if( !this.numb() ) return false // home land never encrypted
			
			const gift = this.gifts.get( this.lord_numb() )
			const prev = gift?.bill().some( b => b ) ?? false
			
			if( next === undefined ) return prev
			if( prev === next ) return prev
			
			if( !this.encryptable() ) $mol_fail( new Error( `Non empty Land never encrypted` ) )
			
			this.join()
			
			const auth = this.auth()
			const secret = $mol_wire_sync( $mol_crypto_secret ).generate()
			const secret_land = $mol_wire_sync( secret ).serial()
			const secret_mutual = auth.secret_mutual( auth.public().toString() )
			
			const unit = new $hyoo_crus_gift
			
			unit.rang( $hyoo_crus_rang.law )
			unit.time( this.face.tick( auth.peer() ) )
			unit.peer( auth.peer() )
			unit.dest( auth.lord() )
			
			const secret_closed = $mol_wire_sync( secret_mutual ).encrypt( secret_land, unit.salt() )
			unit.bill().set( new Uint8Array( secret_closed ) )
			
			const error = this.apply_unit([ unit ])[0]
			if( error ) $mol_fail( new Error( error ) )
			
			return next
		}
		
		@ $mol_mem
		secret() {
			
			if( !this.encrypted() ) return null
			
			const auth = this.auth()
			const gift = this.gifts.get( auth.lord() )
			if( !gift ) return $mol_fail( new Error( `Access denied` ) )
			
			const bill = gift.bill()
			if( !bill.some( b => b ) ) return $mol_fail( new Error( `No key to decrypt` ) )
			
			const secret_mutual = auth.secret_mutual( this.key_public( gift.peer() )!.toString() )
			if( !secret_mutual ) return $mol_fail( new Error( `Can't decrypt secret` ) )
			
			const secret_land = $mol_wire_sync( secret_mutual ).decrypt( bill, gift.salt() )
			return $mol_wire_sync( $mol_crypto_secret ).from( secret_land )
			
		}
		
		@ $mol_action
		dump() {
			
			const units = [] as $hyoo_crus_unit[]
			const rocks = [] as Uint8Array[]
			let rocks_size = 0
			
			for( const pass of this.passes.values() ) units.push( pass )
			for( const gift of this.gifts.values() ) units.push( gift )
			
			for( const kids of this.gists.values() ) {
				for( const gist of kids.values() ) {
					units.push( gist )
					if( gist.size() <= 32 ) continue
					const rock = this.$.$hyoo_crus_mine.rock( gist.hash() )
					if( !rock ) continue
					rocks.push( gist.hash(), rock )
					rocks_size += rock.byteLength + 20 + 4
				}
			}
			
			const dump = new Uint8Array( 24 + units.length * $hyoo_crus_unit.size + rocks_size )
			const buf = new $mol_buffer( dump.buffer )
			
			buf.uint8( 0, 2 )
			buf.uint32( 2, units.length )
			
			dump.set( $mol_base64_ae_decode( this.numb() || 'AAAAAAAA' ), 6 )
			dump.set( $mol_base64_ae_decode( this.lord()!.numb() ), 12 )
			
			let offset = 24
			for( let unit of units ) {
				dump.set( unit.asArray(), offset )
				offset += unit.byteLength
			}
			
			for( let i = 0; i < rocks.length; i += 2 ) {
				const hash = rocks[0]
				const rock = rocks[1]
				dump.set( hash, offset )
				buf.uint32( offset + 20, rock.byteLength )
				dump.set( rock, offset + 24 )
				offset += 24 + rock.byteLength
			}
			
			return dump
		}
		
		@ $mol_action
		apply_dump( dump: Uint8Array ) {
			
			const buf = new $mol_buffer( dump.buffer )
			
			const type = buf.uint8( 0 )
			
			if( type !== 2 ) $mol_fail( new Error( 'Wrong type' ) )
			const units_count = buf.uint32( 2 )
		
			const units = [] as $hyoo_crus_unit[]
			const rocks = [] as Uint8Array[]
			
			let offset = 24
			for( let i = 0; i < units_count; ++i ) {
				const bin = dump.slice( offset, offset + $hyoo_crus_unit.size ).buffer
				const unit = new $hyoo_crus_unit( bin )
				units.push( unit.narrow() )
				offset += $hyoo_crus_unit.size
			}
			this.apply_unit( units )

			while( offset < dump.byteLength ) {
				const hash = dump.slice( offset, offset += 20 )
				const size = buf.uint32( offset )
				const rock = dump.slice( offset += 4, offset += size )
				if( !$mol_compare_deep( hash, this.$.$hyoo_crus_mine.hash( rock ) ) ) {
					$mol_fail( new Error( 'Wrong hash' ) )
				}
				this.$.$hyoo_crus_mine.rock( hash, rock )
			}
			
		}
		
		;[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {} ,
				$mol_dev_format_native( this ) ,
				' ',
				this.numb(),
			)
		}
		
	}
	
}
