namespace $ {
	
	/** Standalone part of Realm which syncs separately, have own rights, and contains Units */
	export class $hyoo_crus_land extends $mol_object {
		
		/** Whole global graph database which contains Lands. */
		realm() {
			return null as null | $hyoo_crus_realm
		}
		
		/** Auth Independent actor with global unique id generated from Auth key */
		ref() {
			return this.auth().lord()
		}
		
		/** Auth Private key generated with Proof of Work  */
		auth() {
			return this.$.$hyoo_crus_auth.current()
		}
		
		faces = new $hyoo_crus_face_map
		
		passes = new $mol_wire_dict< string /*peer*/, $hyoo_crus_pass >()
		gifts = new $mol_wire_dict< $hyoo_crus_ref /*lord*/, $hyoo_crus_gift >()
		gists = new $mol_wire_dict< string /*head*/, $mol_wire_dict< string /*self*/, $hyoo_crus_gist > >()
		
		self_all = new $mol_wire_set< string >()
		
		@ $mol_action
		self_make( area: keyof typeof $hyoo_crus_area, idea = Math.floor( Math.random() * 2**48 ) ) {
			
			const auth = this.auth()
			const rank = this.lord_rank( auth.lord() )
			
			if( rank === $hyoo_crus_rank.add ) return $hyoo_crus_area_to( auth.peer(), 'data' )
			if( rank === $hyoo_crus_rank.nil ) $mol_fail( new Error( 'Rank too low (nil)' ) )
			
			for( let i = 0; i < 4096; ++i ) {
				
				idea = ( idea + 1 ) % 2**48
				if( !idea ) continue
				if( $hyoo_crus_area[ idea % 2 ] !== area ) continue
				
				const idea_str = $mol_base64_ae_encode( new Uint8Array( new BigUint64Array([ BigInt( idea ) ]).buffer, 0, 6 ) )
				if( this.self_all.has( idea_str ) ) continue
				
				this.self_all.add( idea_str )
				return idea_str
				
			}
			
			$mol_fail( new Error( `Too long self generation` ) )
		}
		
		/** Land where Lord is King. Contains only ain info */
		home() {
			return this.Data( $hyoo_crus_home )
		}
		
		/** */
		@ $mol_mem_key
		Data< Node extends typeof $hyoo_crus_node >( Node: Node ) {
			return this.Node( Node ).Item( '' ) // 0
		} 
		
		/** Land meta info */
		@ $mol_mem
		Meta() {
			return this.Node( $hyoo_crus_meta ).Item( 'AQAAAAAA' ) // 1
		} 
		
		/** High level representation of stored data */
		@ $mol_mem_key
		Node< Node extends typeof $hyoo_crus_node >( Node: Node ): $hyoo_crus_fund< string, InstanceType< Node > > {
			return new $hyoo_crus_fund( ( head: string )=> {
				if( head === 'AAAAAAAA' ) return this.Node( Node ).Item( '' )
				return ( Node as typeof $hyoo_crus_node ).make({
					land: ()=> this.sync(),
					head: $mol_const( head ),
				}) as InstanceType< Node >
			} )
		} 
		
		/** Total count of Units inside Land. */
		@ $mol_mem
		total() {
			let total = this.passes.size + this.gifts.size
			for( const units of this.gists.values() ) total += units.size
			return total
		}
		
		/** All joined Lords. */
		@ $mol_mem
		joined_list() {
			return [ ... this.passes.values() ].map( unit => unit.lord() )
		}
		
		/** Public key of Land Lord. */
		@ $mol_mem
		key() {
			const pass = this.passes.get( $hyoo_crus_ref_peer( this.ref() ) )
			if( !pass ) return null
			return $hyoo_crus_auth.from( pass.auth() )
		}
		
		/** Rights level of Lord for Land. */
		@ $mol_mem_key
		lord_rank( lord: $hyoo_crus_ref, next?: $hyoo_crus_rank ) {
			
			if( lord === this.ref() ) return $hyoo_crus_rank.law
			
			const prev = this.gifts.get( lord )?.rank()
				?? this.gifts.get( $hyoo_crus_ref( '' ) )?.rank()
				?? $hyoo_crus_rank.get
			
			if( next === undefined ) return prev
			if( next === prev ) return prev
			
			const key = this.passes.get( $hyoo_crus_ref_peer( lord ) )?.auth()
			if( !key ) $mol_fail( new Error( `No pub key for lord (${ lord.description })` ) )
			
			this.give( $hyoo_crus_auth.from( key ), next )
			return next
			
		}
		
		/** Rights level of Peer for Land. */
		peer_rank( peer: string ) {
			const auth = this.passes.get( peer )!
			if( !auth ) return $hyoo_crus_rank.get
			return this.lord_rank( auth.lord() )
		}
		
		/** Picks units between Face and current state. */
		delta_unit( face = new $hyoo_crus_face_map ): $hyoo_crus_unit[] {
			
			this.loading()
			
			const delta = [] as $hyoo_crus_unit[]
			
			const passed = new Set< string >()
			const auth = ( peer: string )=> {
				
				if( passed.has( peer ) ) return
				if( face.get( peer ) ) return
				
				const pass = this.passes.get( peer )
				if( !pass ) $mol_fail( new Error( `No pass for Peer (${ peer })` ) )
				
				delta.push( pass )
				passed.add( peer )
				
			}
			
			for( const [ lord, unit ] of this.gifts ) {
				
				const time = face.get( unit.peer() ) ?? 0
				if( time >= unit.time() ) continue
				
				auth( unit.peer() )
				delta.push( unit )
				
			}
			
			for( const kids of this.gists.values() ) {
				for( const unit of kids.values() ) {
					
					const time = face.get( unit.peer() ) ?? 0
					if( time >= unit.time() ) continue
					
					auth( unit.peer() )
					delta.push( unit )
					
				}
			}
			
			if( delta.length || this.faces.total <= this.faces.total ) return delta
			return this.delta_unit()
			
		}
		
		/** Makes binary Delta between Face and current state. */
		delta_pack( face = new $hyoo_crus_face_map ) {
			
			const parts = this.delta_parts( face )
			if( !parts ) return null
			
			const pack = $hyoo_crus_pack.make( parts )
			
			return pack
		}
		
		delta_parts( face = new $hyoo_crus_face_map ) {
			
			const units = this.delta_unit( face )
			if( !units.length ) return null
			
			const rocks = [] as [ Uint8Array, null | Uint8Array ][]
			
			for( let unit of units ) {
				
				if( unit.kind() !== 'gist' ) continue
				
				const gist = unit.narrow() as $hyoo_crus_gist
				if( gist.size() <= 32 ) continue
				
				const rock = this.$.$hyoo_crus_mine.rock( gist.hash() ) ?? null
				rocks.push([ gist.hash(), rock ])
				
			}
			
			return {
				lands: {
					[ this.ref() ]: {
						faces: new $hyoo_crus_face_map,
						units,
					},
				},
				rocks,
			}
			
		}
		
		@ $mol_action
		faces_pack() {
			const pack = $hyoo_crus_pack.make({
				lands: {
					[ this.ref() ]: { faces: this.faces, units: [] },
				},
				rocks: [],
			})
			return pack
		}
		
		/** Applies Delta to current state with verify. */
		@ $mol_action
		apply_unit( delta: readonly $hyoo_crus_unit[], skip_check = false ) {
			
			if( !delta.length ) return []
			
			const errors = $mol_wire_sync( this ).units_verify( delta )
			if( errors.some( v => v ) ) return errors
			
			return this.apply_unit_trust( delta, skip_check )
		}
		
		async units_verify( delta: readonly $hyoo_crus_unit[] ) {
			
			const passes = delta.filter( unit => unit.kind() === 'pass' ) as $hyoo_crus_pass[]
			const auth = new Map( passes.map( ( unit: $hyoo_crus_pass )=> [ unit.peer(), unit.auth() ] ) )
			
			const mixin = $hyoo_crus_ref_encode( this.ref() )
			
			return await Promise.all( delta.map( async unit => {
				
				let key_public = this.key_public( unit.peer() )
				if( !key_public ) {
					
					const key_serial = auth.get( unit.peer() )
					if( !key_serial ) return `No public key for peer (${unit.peer()})`
					
					key_public = $mol_crypto_key_public.from( key_serial )
					
				}
				
				const sens = unit.sens().slice()
				for( let i = 0; i < mixin.length; ++i ) sens[i+14] ^= mixin[i+14]
				
				return await key_public.verify( sens, unit.sign() ) ? '' : `Wrong unit sign`
	
			} ) )
			
		}
		
		/** Applies Delta to current state without verifying. */
		@ $mol_action
		apply_unit_trust( delta: readonly $hyoo_crus_unit[], skip_check = false ) {
			return delta.map( unit => {
				
				if( !skip_check ) {
					const error = this.check_unit( unit )
					if( error ) return error
				}
				
				let need_recheck = false
				const res = unit.choose({
					
					pass: next => {
						
						const peer = next.peer()
						
						const exists = this.passes.get( peer )
						if( exists ) return ''
						
						this.passes.set( peer, next )
						this.faces.total ++
						
					},
					
					gift: next => {
						
						const dest = next.dest()
						
						const prev = this.gifts.get( dest )
						if( prev && $hyoo_crus_gift.compare( prev, next ) <= 0 ) return ''
						
						this.gifts.set( dest, next )
						this.faces.time_max( next.peer(), next.time() )
						
						if( !prev ) this.faces.total ++
						
						if( ( prev?.rank() ?? $hyoo_crus_rank.nil ) > next.rank() ) need_recheck = true
						
					},
					
					gist: next => {
						
						const head = next.head()
						const self = next.self()
						
						let units = this.gists.get( head )
						if( !units ) this.gists.set( head, units = new $mol_wire_dict )
							
						const prev = units.get( self )
						if( prev && $hyoo_crus_gist.compare( prev, next ) <= 0 ) return ''
						
						units.set( self, next )
						this.self_all.add( self )
						this.faces.time_max( next.peer(), next.time() )
						
						if( !prev ) this.faces.total ++
						
					},
					
				})
				
				if( need_recheck ) this.recheck()
				return res ?? ''
				
			})
		}
		
		apply_land( land: $hyoo_crus_land ) {
			return this.apply_unit_trust( land.delta_unit() )
		}
		
		recheck() {
			
			for( const [ peer, pass ] of this.passes ) {
				if( !this.check_unit( pass ) ) continue
				this.passes.delete( peer )
				this.faces.total --
			}
			
			for( const [ lord, gift ] of this.gifts ) {
				if( !this.check_unit( gift ) ) continue
				this.gifts.delete( lord )
				this.faces.total --
			}
			
			for( const [ head, units ] of this.gists ) {
				for( const [ self, gist ] of units ) {
					if( !this.check_unit( gist ) ) continue
					units.delete( self )
					this.faces.total --
				}
			}
			
		}
		
		check_unit( unit: $hyoo_crus_unit ): string {
			return unit.choose({
				
				pass: next => this.lord_rank( next.lord() ) < $hyoo_crus_rank.add ? 'Need add rank to join' : '',
				
				gift: next => this.peer_rank( next.peer() ) < $hyoo_crus_rank.law ? 'Need law rank to change rank': '',
				
				gist: next => {
					if( $hyoo_crus_area_of( next.self() ) !== $hyoo_crus_area_of( next.self() ) ) return 'Need same area'
					if( $hyoo_crus_area_to( next.peer(), 'data' ) === next.self() ) {
						return this.peer_rank( next.peer() ) < $hyoo_crus_rank.add ? 'Need add rank to post self data' : ''
					} else {
						if( $hyoo_crus_area_of( next.self() ) === 'data' ) {
							return this.peer_rank( next.peer() ) < $hyoo_crus_rank.mod ? 'Need mod rank to post any data' : ''
						} else {
							return this.peer_rank( next.peer() ) < $hyoo_crus_rank.law ? 'Need law rank to post to meta area' : ''
						}
					}
				},
				
			})
		}
		
		@ $mol_action
		fork( preset = $hyoo_crus_rank_public ) {
			const realm = this.realm()
			
			if( !realm ) $mol_fail( new Error( 'Realm is required to fork' ) )
			
			const land = realm.land_grab( preset )
			land.Meta().Inflow(null)!.items_vary([ this.ref() ])
			
			return land
		}
		
		@ $mol_mem_key
		gists_ordered( head: string ) {
			
			this.sync()
			this.secret() // early async to prevent async on put
			
			const queue = [ ... this.gists.get( head )?.values() ?? [] ]
			
			const slices = new Map
			for( const gist of queue ) slices.set( gist, 0 )
			
			merge: if( $hyoo_crus_area_of( head ) === 'data' ) {
				
				const inflow = ( this.Meta().Inflow()?.items_vary().slice().reverse() ?? [] )
					.map( $hyoo_crus_vary_cast_ref )
					.filter( $mol_guard_defined )
				if( !inflow.length ) break merge
				
				const exists = new Set([ ... this.gists.get( head )?.keys() ?? [] ])
				
				const realm  = this.realm()
				let slice = 0
				if( realm ) for( const ref of inflow ) {
					++ slice
					const land = realm.Land( ref )
					for( const gist of land.gists_ordered( head ) ) {
						
						if( exists.has( gist.self() ) ) continue
						queue.push( gist )
						exists.add( gist.self() )
						slices.set( gist, slice )
						
					}
					
				}
				
			}
			
			if( queue.length === 0 ) return queue
			if( queue.length === 1 ) return queue[0].nil() ? [] : queue
			
			const compare = ( left: $hyoo_crus_gist, right: $hyoo_crus_gist )=> {
				return ( slices.get( left ) - slices.get( right ) ) || $hyoo_crus_gist.compare( left, right )
			}
			
			queue.sort( compare )
			
			let entry = {
				gist: null as null | $hyoo_crus_gist,
				next: '',
				prev: '',
			}
			
			const graph = new Map([ [ '', entry  ] ])
			
			while( queue.length ) {
				
				const last = queue.pop()!
				graph.get( entry.prev )!.next = last.self()
				graph.set( last.self(), { gist: last, next: '', prev: entry.prev } )
				entry.prev = last.self()
				
				for( let cursor = queue.length - 1; cursor >= 0; --cursor ) {
					
					const kid = queue[cursor]
					
					let lead = graph.get( kid.lead() )
					if( !lead ) continue
					
					while( lead.next && ( compare( graph.get( lead.next )!.gist!, kid ) < 0 ) ) lead = graph.get( lead.next )!
					
					const exists = graph.get( kid.self() )
					if( exists ) {
						
						if( ( lead.gist?.self() ?? '' )  === exists.prev ) {
							exists.gist = kid
							if( cursor === queue.length - 1 ) queue.pop()
							continue
						}
						
						graph.get( exists.prev )!.next = exists.next
						graph.get( exists.next )!.prev = exists.prev
						
					}
					
					const follower = graph.get( lead.next )!
					follower.prev = kid.self()
					graph.set( kid.self(), { gist: kid, next: lead.next, prev: lead.gist?.self() ?? '' } )
					lead.next = kid.self()
					
					if( cursor === queue.length - 1 ) queue.pop()
					cursor = queue.length
					
				}
				
			}
			
			const res = [] as $hyoo_crus_gist[]
			
			while( entry.next ) {
				entry = graph.get( entry.next )!
				res.push( entry.gist! )
			}
			
			return res
		}
		
		/** Register public key **/
		@ $mol_action
		join() {
			
			const auth = this.auth()
			
			const prev = this.passes.get( auth.peer() )
			if( prev ) return prev
			
			const next = new $hyoo_crus_pass
			next.auth( auth.public().asArray() )
			next._land = this
			
			const error = this.apply_unit_trust([ next ])[0]
			if( error ) $mol_fail( new Error( error ) )
			
			this.broadcast()
			return next
		}
		
		/**
		 * Gives access rights to Lord by Auth key.
		 * `null` - gives rights for all Peers.
		 */
		@ $mol_action
		give(
			dest: $hyoo_crus_auth | null,
			rank: $hyoo_crus_rank,
		) {
				
			this.join()
			
			const auth = this.auth()
			const unit = new $hyoo_crus_gift
			
			unit.rank( rank )
			unit.time( this.faces.tick() )
			unit.peer( auth.peer() )
			unit.dest( dest ? dest.lord() : $hyoo_crus_ref('') )
			unit._land = this
			
			if( rank >= $hyoo_crus_rank.get ) {
				
				const secret_land = this.secret()
				if( secret_land ) {
					
					if( !dest ) $mol_fail( new Error( `Encrypted land can't be shared to everyone` ) )
					
					const secret_mutual = this.secret_mutual( dest.toString() )
					if( secret_mutual ) {
						const secret_bin = $mol_wire_sync( secret_land ).serial()
						const bill = $mol_wire_sync( secret_mutual ).encrypt( secret_bin, unit.salt() )
						unit.bill().set( bill )
					}
					
				}
				
			}
			
			const error = this.apply_unit_trust([ unit ])[0]
			if( error ) $mol_fail( new Error( error ) )
			
			this.broadcast()
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
			
			if( typeof vary === 'symbol' ) vary = $hyoo_crus_ref_relate( this.ref(), vary )
			
			this.join()
			
			const auth = this.auth()
			const unit = new $hyoo_crus_gist
			
			unit.time( this.faces.tick() )
			unit.peer( auth.peer() )
			unit.lead( lead )
			unit.head( head )
			unit._vary = vary
			unit._land = this
			
			let { tip, bin } = $hyoo_crus_vary_encode( vary )
			unit._open = bin
			
			if( vary !== null && this.encrypted() ) {
				unit.hash( $mol_crypto_hash( bin ), tip, tag )
			} else {
				if( bin.byteLength > 32 ) unit.hash( this.$.$hyoo_crus_mine.hash( bin ), tip, tag )
				else unit.data( bin, tip, tag )
			}
		
			unit.self( self || this.self_make( $hyoo_crus_area_of( head ), unit.idea() ) )
			
			const error = this.apply_unit_trust([ unit ])[0]
			if( error ) $mol_fail( new Error( error ) )
			
			this.broadcast()
			return unit
		}
		
		@ $mol_action
		gist_move(
			gist: $hyoo_crus_gist,
			head: string,
			seat: number,
		) {
			
			if( gist.nil() ) $mol_fail( new RangeError( `Can't move wiped gist` ) )
			
			const units = this.gists_ordered( head ).filter( unit => !unit.nil() )
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
			
			const units = this.gists_ordered( gist.head() ).filter( unit => !unit.nil() )
			const seat = units.indexOf( gist )
			
			this.post(
				seat ? units[ seat - 1 ].self() : '',
				gist.head(),
				gist.self(),
				null,
				'term',
			)
			
		}
		
		broadcast() {
			this.realm()?.yard().neonatals.add( this.ref() )
		}
		
		@ $mol_mem
		sync() {
			this.loading()
			this.sync_mine()
			this.sync_yard()
			this.bus()
			return this
		}
		
		@ $mol_mem
		sync_mine() {
			return new $mol_wire_atom( '', ()=> this.save() ).fresh()
		}
		
		@ $mol_mem
		sync_yard() {
			return new $mol_wire_atom( '', ()=> this.realm()?.yard().sync_land( this.ref() ) ).fresh()
		}
		
		@ $mol_mem
		bus() {
			return new this.$.$mol_bus< ArrayBuffer[] >(
				`$hyoo_crus_land:${ this.ref().description }`,
				$mol_wire_async( bins => {
					
					const yard = this.realm()!.yard()
					
					this.apply_unit_trust( bins.map( bin => {
						const unit = new $hyoo_crus_unit( bin ).narrow()
						yard.persisted.add( unit )
						return unit
					} ) )
					
				} ),
			)
		}
		
		@ $mol_mem
		loading() {
			
			$mol_wire_solid()
			
			const realm = this.realm()
			if( !realm ) return
			
			const units = realm.yard().load( this ) ?? []
			
			$mol_wire_sync( this.$ ).$mol_log3_rise({
				place: this,
				message: 'Load Unit',
				units: units.length,
			})
			
			const errors = this.apply_unit_trust( units, !!'skip_check' ).filter( Boolean )
			
			if( errors.length ) this.$.$mol_log3_fail({
				place: this,
				message: errors.join( '\n' ),
			})
			
		}
		
		@ $mol_mem
		saving() {
			// this.$.$mol_wait_timeout(250)
			this.save()
		}
		
		@ $mol_mem
		save() {
			
			const yard = this.realm()?.yard()
			if( !yard ) return
			
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
			
			if( persisting.length )	$mol_wire_sync( yard ).save( this, persisting )
			this.bus().send( persisting.map( unit => unit.buffer ) )
			
		}
		
		@ $mol_mem_key
		unit_sign( unit: $hyoo_crus_unit ) {
			if( unit.signed() ) return
			
			const key = $mol_wire_sync( unit._land!.auth() )
			const mixin = $hyoo_crus_ref_encode( unit._land!.ref() )
			
			const sens = unit.sens().slice()
			for( let i = 0; i < mixin.length; ++i ) sens[i+14] ^= mixin[i+14]
			
			const sign = new Uint8Array( key.sign( sens ) )
			unit.sign( sign )
			
		}
		
		@ $mol_mem_key
		gist_encode( gist: $hyoo_crus_gist ) {
			
			if( gist._open === null ) return gist
			if( gist.nil() ) return gist
			
			let bin = gist._open
			const secret = gist._land!.secret()!
			
			if( secret ) bin = new Uint8Array( $mol_wire_sync( secret ).encrypt( bin, gist.salt() ) )
			
			if( bin.byteLength > 32 ) gist.hash( this.$.$hyoo_crus_mine.save( bin ), gist.tip(), gist.tag() )
			else gist.data( bin, gist.tip(), gist.tag() )
			
			return gist
		}
		
		@ $mol_mem_key
		gist_decode( gist: $hyoo_crus_gist ): $hyoo_crus_vary_type {
			let vary = this.gist_decode_raw( gist )
			if( typeof vary === 'symbol' ) vary = $hyoo_crus_ref_resolve( this.ref(), vary )
			return vary
		}
		
		@ $mol_mem_key
		gist_decode_raw( gist: $hyoo_crus_gist ): $hyoo_crus_vary_type {
			
			if( this.gists.get( gist.head() )?.get( gist.self() ) !== gist ) {
				for( const id of this.Meta().Inflow()?.items_vary() ?? [] ) {
					const vary = this.realm()?.Land( $hyoo_crus_vary_cast_ref( id! )! ).gist_decode_raw( gist )
					if( vary !== undefined ) return vary
				}
				return undefined!
			}
			
			const secret = this.secret()
			
			if( gist._vary !== undefined ) return gist._vary
			if( gist._open !== null ) return gist._vary = $hyoo_crus_vary_decode({ tip: gist.tip(), bin: gist._open })
			
			let bin = gist.size() > 32 ? this.$.$hyoo_crus_mine.rock( gist.hash() ) : gist.data()
			if( secret && bin && !gist.nil() ) {
				try {
					bin = new Uint8Array( $mol_wire_sync( secret ).decrypt( bin, gist.salt() ) )
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
		secret_mutual( key_public: string ) {
			return $mol_wire_sync( $mol_crypto_secret ).derive(
				this.auth().toString(),
				key_public,
			)
		}
		
		@ $mol_mem
		encryptable() {
			return !this.gists.size
		}
		
		@ $mol_mem
		encrypted( next?: boolean ) {
			
			$mol_wire_solid()
			
			const gift = this.gifts.get( this.ref() )
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
			
			unit.rank( $hyoo_crus_rank.law )
			unit.time( this.faces.tick() )
			unit.peer( auth.peer() )
			unit.dest( auth.lord() )
			unit._land = this
			
			const secret_closed = $mol_wire_sync( secret_mutual ).encrypt( secret_land, unit.salt() )
			unit.bill().set( new Uint8Array( secret_closed ) )
			
			const error = this.apply_unit_trust([ unit ])[0]
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
		
		dump() {
			
			this.saving()
			
			const units = [] as $hyoo_crus_unit[]
			const rocks = [] as [ Uint8Array, Uint8Array ][]
			
			for( const pass of this.passes.values() ) units.push( pass )
			for( const gift of this.gifts.values() ) units.push( gift )
			
			for( const kids of this.gists.values() ) {
				for( const gist of kids.values() ) {
					units.push( gist )
					if( gist.size() <= 32 ) continue
					const rock = this.$.$hyoo_crus_mine.rock( gist.hash() )
					if( !rock ) continue
					rocks.push([ gist.hash(), rock ])
				}
			}
			
			return {
				land: this.ref(),
				units, rocks,
			}
			
		}
		
		;[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {},
		 		$mol_dev_format_native( this ),
				' ',
				$mol_dev_format_auto( this.faces.total ),
		 	)
		 }
		
	}
	
}
