namespace $ {
	
	/** Standalone part of Realm which syncs separately, have own rights, and contains Units */
	export class $hyoo_crus_land extends $mol_object {
		
		/** Auth Independent actor with global unique id generated from Auth key */
		ref() {
			return this.auth().lord()
		}
		
		/** Auth Private key generated with Proof of Work  */
		auth() {
			return this.$.$hyoo_crus_auth.current()
		}
		
		faces = new $hyoo_crus_face_map
		
		pass = new $mol_wire_dict< string /*peer*/, $hyoo_crus_pass >()
		gift = new $mol_wire_dict< $hyoo_crus_ref /*lord*/, $hyoo_crus_gift >()
		sand = new $mol_wire_dict< string /*head*/, $mol_wire_dict< string /*self*/, $hyoo_crus_sand > >()
		
		self_all = new $mol_wire_set< string >()
		
		@ $mol_action
		self_make( idea = Math.floor( Math.random() * 2**48 ) ) {
			
			const auth = this.auth()
			const rank = this.lord_rank( auth.lord() )
			
			if( rank === $hyoo_crus_rank.add ) return auth.peer()
			if( rank === $hyoo_crus_rank.nil ) $mol_fail( new Error( 'Rank too low (nil)' ) )
			
			for( let i = 0; i < 4096; ++i ) {
				
				idea = ( idea + 1 ) % 2**48
				if( !idea ) continue
				
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
		
		/** Data root */
		@ $mol_mem_key
		Data< Node extends typeof $hyoo_crus_node >( Node: Node ) {
			return this.Node( Node ).Item( '' ) // 0
		} 
		
		/** Lands for inheritance */
		@ $mol_mem
		Tines() {
			return this.Node( $hyoo_crus_list_ref ).Item( 'AQAAAAAA' ) // 1
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
			let total = this.pass.size + this.gift.size
			for( const units of this.sand.values() ) total += units.size
			return total
		}
		
		/** All joined Lords. */
		@ $mol_mem
		joined_list() {
			return [ ... this.pass.values() ].map( unit => unit.lord() )
		}
		
		/** Public key of Land Lord. */
		@ $mol_mem
		key() {
			const pass = this.pass.get( $hyoo_crus_ref_peer( this.ref() ) )
			if( !pass ) return null
			return $hyoo_crus_auth.from( pass.auth() )
		}
		
		/** Rights level of Lord for Land. */
		@ $mol_mem_key
		lord_rank( lord: $hyoo_crus_ref, next?: $hyoo_crus_rank ) {
			
			if( lord === this.ref() ) return $hyoo_crus_rank.law
			
			const prev = this.gift.get( lord )?.rank()
				?? this.gift.get( $hyoo_crus_ref( '' ) )?.rank()
				?? $hyoo_crus_rank.get
			
			if( next === undefined ) return prev
			if( next === prev ) return prev
			
			const key = this.pass.get( $hyoo_crus_ref_peer( lord ) )?.auth()
			if( !key ) $mol_fail( new Error( `No pub key for lord (${ lord.description })` ) )
			
			this.give( $hyoo_crus_auth.from( key ), next )
			return next
			
		}
		
		/** Rights level of Peer for Land. */
		peer_rank( peer: string ) {
			const auth = this.pass.get( peer )!
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
				
				const pass = this.pass.get( peer )
				if( !pass ) $mol_fail( new Error( `No pass for Peer (${ peer })` ) )
				
				delta.push( pass )
				passed.add( peer )
				
			}
			
			for( const [ lord, unit ] of this.gift ) {
				
				const time = face.get( unit.peer() ) ?? 0
				if( time >= unit.time() ) continue
				
				auth( unit.peer() )
				delta.push( unit )
				
			}
			
			for( const kids of this.sand.values() ) {
				for( const unit of kids.values() ) {
					
					const time = face.get( unit.peer() ) ?? 0
					if( time >= unit.time() ) continue
					
					auth( unit.peer() )
					delta.push( unit )
					
				}
			}
			
			if( delta.length || this.faces.total <= this.faces.total ) return delta
			
			this.$.$mol_log3_warn({
				place: this,
				message: 'Unit Absent',
				hint: 'Relax, Delta contains all Units to restore',
				face,
			})
			
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
				
				if( unit.kind() !== 'sand' ) continue
				
				const sand = unit.narrow() as $hyoo_crus_sand
				if( sand.size() <= 32 ) continue
				
				const rock = this.$.$hyoo_crus_mine.rock( sand.hash() ) ?? null
				rocks.push([ sand.hash(), rock ])
				
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
			
			const doubt = delta.filter( unit => !$hyoo_crus_unit_trusted.has( unit ) )
			if( doubt.length ) {
				const errors = $mol_wire_sync( this ).units_verify( doubt )
				if( errors.some( v => v ) ) return errors
			}
			
			const errors = this.apply_unit_trust( delta, skip_check )
			
			for( const unit of doubt ) $hyoo_crus_unit_trusted.add( unit )
			
			return errors
		}
		
		async units_verify( units: readonly $hyoo_crus_unit[] ) {
			
			const passes = units.filter( unit => unit.kind() === 'pass' ) as $hyoo_crus_pass[]
			const auth = new Map( passes.map( ( unit: $hyoo_crus_pass )=> [ unit.peer(), unit.auth() ] ) )
			
			const mixin = $hyoo_crus_ref_encode( this.ref() )
			
			return await Promise.all( units.map( async unit => {
				
				let key_public = this.key_public( unit.peer() )
				if( !key_public ) {
					
					const key_serial = auth.get( unit.peer() )
					if( !key_serial ) return `No public key for peer (${unit.peer()})`
					
					key_public = $mol_crypto_key_public.from( key_serial )
					
				}
				
				const sens = unit.sens().slice()
				for( let i = 0; i < mixin.length; ++i ) sens[i+14] ^= mixin[i+14]
				
				const valid = await key_public.verify( sens, unit.sign() )
				
				return valid ? '' : `Wrong unit sign`
	
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
						
						const exists = this.pass.get( peer )
						if( exists ) return ''
						
						this.pass.set( peer, next )
						this.faces.total ++
						
					},
					
					gift: next => {
						
						const dest = next.dest()
						
						const prev = this.gift.get( dest )
						if( prev && $hyoo_crus_gift.compare( prev, next ) <= 0 ) return ''
						
						this.gift.set( dest, next )
						this.faces.time_max( next.peer(), next.time() )
						
						if( !prev ) this.faces.total ++
						
						if( ( prev?.rank() ?? $hyoo_crus_rank.nil ) > next.rank() ) need_recheck = true
						
					},
					
					sand: next => {
						
						const head = next.head()
						const self = next.self()
						
						let units = this.sand.get( head )
						if( !units ) this.sand.set( head, units = new $mol_wire_dict )
							
						const prev = units.get( self )
						if( prev && $hyoo_crus_sand.compare( prev, next ) <= 0 ) return ''
						
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
			
			for( const [ peer, pass ] of this.pass ) {
				if( !this.check_unit( pass ) ) continue
				this.pass.delete( peer )
				this.faces.total --
			}
			
			for( const [ lord, gift ] of this.gift ) {
				if( !this.check_unit( gift ) ) continue
				this.gift.delete( lord )
				this.faces.total --
			}
			
			for( const [ head, units ] of this.sand ) {
				for( const [ self, sand ] of units ) {
					if( !this.check_unit( sand ) ) continue
					units.delete( self )
					this.faces.total --
				}
			}
			
		}
		
		check_unit( unit: $hyoo_crus_unit ): string {
			return unit.choose({
				
				pass: next => this.lord_rank( next.lord() ) < $hyoo_crus_rank.add ? 'Need add rank to join' : '',
				
				gift: next => this.peer_rank( next.peer() ) < $hyoo_crus_rank.law ? 'Need law rank to change rank': '',
				
				sand: next => {
					if( next.peer() === next.self() ) {
						return this.peer_rank( next.peer() ) < $hyoo_crus_rank.add ? 'Need add rank to post self data' : ''
					} else {
						return this.peer_rank( next.peer() ) < $hyoo_crus_rank.mod ? 'Need mod rank to post any data' : ''
					}
				},
				
			})
		}
		
		@ $mol_action
		fork( preset = { '': $hyoo_crus_rank.get } ) {
			const land = this.$.$hyoo_crus_realm.land_grab( preset )
			land.Tines().items_vary([ this.ref() ])
			return land
		}
		
		@ $mol_mem_key
		sand_ordered( head: string ) {
			
			this.sync()
			this.secret() // early async to prevent async on put
			
			const queue = [ ... this.sand.get( head )?.values() ?? [] ]
			
			const slices = new Map
			for( const sand of queue ) slices.set( sand, 0 )
			
			merge: if( head !== 'AQAAAAAA' ) {
				
				const tines = ( this.Tines().items_vary().slice().reverse() ?? [] )
					.map( $hyoo_crus_vary_cast_ref )
					.filter( $mol_guard_defined )
				if( !tines.length ) break merge
				
				const exists = new Set([ ... this.sand.get( head )?.keys() ?? [] ])
				
				const realm = this.$.$hyoo_crus_realm
				let slice = 0
				for( const ref of tines ) {
					++ slice
					const land = realm.Land( ref )
					for( const sand of land.sand_ordered( head ) ) {
						
						if( exists.has( sand.self() ) ) continue
						queue.push( sand )
						exists.add( sand.self() )
						slices.set( sand, slice )
						
					}
					
				}
				
			}
			
			if( queue.length < 2 ) return queue
			
			const compare = ( left: $hyoo_crus_sand, right: $hyoo_crus_sand )=> {
				return ( slices.get( left ) - slices.get( right ) ) || $hyoo_crus_sand.compare( left, right )
			}
			
			queue.sort( compare )
			
			let entry = {
				sand: null as null | $hyoo_crus_sand,
				next: '',
				prev: '',
			}
			
			const graph = new Map([ [ '', entry  ] ])
			
			while( queue.length ) {
				
				const last = queue.pop()!
				graph.get( entry.prev )!.next = last.self()
				graph.set( last.self(), { sand: last, next: '', prev: entry.prev } )
				entry.prev = last.self()
				
				for( let cursor = queue.length - 1; cursor >= 0; --cursor ) {
					
					const kid = queue[cursor]
					
					let lead = graph.get( kid.lead() )
					if( !lead ) continue
					
					while( lead.next && ( compare( graph.get( lead.next )!.sand!, kid ) < 0 ) ) lead = graph.get( lead.next )!
					
					const exists = graph.get( kid.self() )
					if( exists ) {
						
						if( ( lead.sand?.self() ?? '' )  === exists.prev ) {
							exists.sand = kid
							if( cursor === queue.length - 1 ) queue.pop()
							continue
						}
						
						graph.get( exists.prev )!.next = exists.next
						graph.get( exists.next )!.prev = exists.prev
						
					}
					
					const follower = graph.get( lead.next )!
					follower.prev = kid.self()
					graph.set( kid.self(), { sand: kid, next: lead.next, prev: lead.sand?.self() ?? '' } )
					lead.next = kid.self()
					
					if( cursor === queue.length - 1 ) queue.pop()
					cursor = queue.length
					
				}
				
			}
			
			const res = [] as $hyoo_crus_sand[]
			
			while( entry.next ) {
				entry = graph.get( entry.next )!
				res.push( entry.sand! )
			}
			
			return res
		}
		
		/** Register public key **/
		@ $mol_action
		join() {
			
			const auth = this.auth()
			
			const prev = this.pass.get( auth.peer() )
			if( prev ) return prev
			
			const next = new $hyoo_crus_pass
			$hyoo_crus_unit_trusted.add( next )
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
			$hyoo_crus_unit_trusted.add( unit )
			
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
			tag: keyof typeof $hyoo_crus_sand_tag = 'term',
		) {
			
			if( typeof vary === 'symbol' ) vary = $hyoo_crus_ref_relate( this.ref(), vary )
			
			this.join()
			
			const auth = this.auth()
			const unit = new $hyoo_crus_sand
			$hyoo_crus_unit_trusted.add( unit )
			
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
		
			unit.self( self || this.self_make( unit.idea() ) )
			
			const error = this.apply_unit_trust([ unit ])[0]
			if( error ) $mol_fail( new Error( error ) )
			
			this.broadcast()
			return unit
		}
		
		@ $mol_action
		sand_move(
			sand: $hyoo_crus_sand,
			head: string,
			seat: number,
		) {
			
			if( sand.tip() === 'nil' ) $mol_fail( new RangeError( `Can't move wiped sand` ) )
			
			const units = this.sand_ordered( head ).filter( unit => unit.tip() !== 'nil' )
			if( seat > units.length ) $mol_fail( new RangeError( `Seat (${seat}) out of units length (${units.length})` ) )
			
			const lead = seat ? units[ seat - 1 ].self() : ''
			const vary = this.sand_decode( sand )
			
			if( sand.head() === head ) {
				
				const seat_prev = units.indexOf( sand )
				
				if( seat === seat_prev ) return
				if( seat === seat_prev + 1 ) return
				
				const prev = seat_prev ? units[ seat_prev - 1 ].self() : ''
				const next = units[ seat_prev + 1 ]
				
				if( next ) this.post(
					prev,
					head,
					next.self(),
					this.sand_decode( next ),
					next.tag(),
				)
				
			} else {
				
				this.sand_wipe( sand )
				
			}
			
			this.post(
				lead,
				head,
				sand.self(),
				vary,
				sand.tag(),
			)
			
		}
		
		@ $mol_action
		sand_wipe( sand: $hyoo_crus_sand ) {
			
			const units = this.sand_ordered( sand.head() ).filter( unit => unit.tip() !== 'nil' )
			const seat = units.indexOf( sand )
			
			this.post(
				seat ? units[ seat - 1 ].self() : '',
				sand.head(),
				sand.self(),
				null,
				'term',
			)
			
		}
		
		broadcast() {
			this.$.$hyoo_crus_realm.yard().lands_neonatals.add( this.ref() )
		}
		
		@ $mol_mem
		sync() {
			this.loading()
			this.sync_mine()
			this.sync_yard()
			this.bus()
			return this
		}
		
		destructor() {
			this.$.$hyoo_crus_realm.yard().forget_land( this )
		}
		
		@ $mol_mem
		sync_mine() {
			return new $mol_wire_atom( '', ()=> this.saving() ).fresh()
		}
		
		@ $mol_mem
		sync_yard() {
			return new $mol_wire_atom( '', ()=> this.$.$hyoo_crus_realm.yard().sync_land( this.ref() ) ).fresh()
		}
		
		@ $mol_mem
		bus() {
			return new this.$.$mol_bus< ArrayBuffer[] >(
				`$hyoo_crus_land:${ this.ref().description }`,
				$mol_wire_async( bins => {
					
					this.apply_unit_trust( bins.map( bin => {
						const unit = new $hyoo_crus_unit( bin ).narrow()
						this.$.$hyoo_crus_mine.units_persisted.add( unit )
						return unit
					} ) )
					
				} ),
			)
		}
		
		@ $mol_mem
		loading() {
			
			$mol_wire_solid()
			
			let units = this.$.$hyoo_crus_mine.units( this.ref() ) ?? []
			
			const dict = new Map< string, $hyoo_crus_unit >()
			for( const unit of units ) dict.set( unit.key(), unit )
				
			const graph = new $mol_graph< string, void >()
			for( const unit of units ) {
				unit.choose({
					pass: pass => {
						graph.link( pass.key(), '' )
					},
					gift: gift => {
						graph.link( $hyoo_crus_ref_peer( gift.dest() ), gift.key() )
						graph.link( gift.key(), gift.peer() )
					},
					sand: sand=> {
						graph.link( sand.key(), sand.peer() )
					},
				})
			}
			
			graph.acyclic( ()=> 1 ) 
			units = [ ... graph.sorted ].map( key => dict.get( key )! ).filter( Boolean )
			
			$mol_wire_sync( this.$ ).$mol_log3_rise({
				place: this,
				message: 'Load Unit',
				units: units.length,
			})
			
			const errors = this.apply_unit( units, !!'skip_check' ).filter( Boolean )
			
			if( errors.length ) this.$.$mol_log3_fail({
				place: this,
				message: errors.join( '\n' ),
			})
			
		}
		
		@ $mol_mem
		saving() {
			
			const mine = this.$.$hyoo_crus_mine
			if( !mine ) return
			
			this.loading()
			
			const encoding = [] as $hyoo_crus_sand[]
			const signing = [] as $hyoo_crus_unit[]
			const persisting = [] as $hyoo_crus_unit[]
			
			for( const pass of this.pass.values() ) {
				if( !pass.signed() ) signing.push( pass )
				if( !mine.units_persisted.has( pass ) ) persisting.push( pass )
			}
			
			for( const gift of this.gift.values() ) {
				if( !gift.signed() ) signing.push( gift )
				if( !mine.units_persisted.has( gift ) ) persisting.push( gift )
			}
			
			for( const kids of this.sand.values() ) {
				for( const sand of kids.values() ) {
					if( !sand.signed() ) {
						encoding.push( sand )
						signing.push( sand )
					}
					if( !mine.units_persisted.has( sand ) ) persisting.push( sand )
				}
			}
			
			$mol_wire_race( ... encoding.map( unit => ()=> this.sand_encode( unit ) ) )
			$mol_wire_race( ... signing.map( unit => ()=> this.unit_sign( unit ) ) )
			
			if( persisting.length )	{
				
				mine.units( this.ref(), persisting )
				this.bus().send( persisting.map( unit => unit.buffer ) )
			
				$mol_wire_sync( this.$ ).$mol_log3_done({
					place: this,
					message: 'Saved Units',
					units: persisting.length,
				})

			}
			
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
		sand_encode( sand: $hyoo_crus_sand ) {
			
			if( sand._open === null ) return sand
			if( sand.tip() === 'nil' ) return sand
			
			let bin = sand._open
			const secret = sand._land!.secret()!
			
			if( secret ) bin = new Uint8Array( $mol_wire_sync( secret ).encrypt( bin, sand.salt() ) )
			
			if( bin.byteLength > 32 ) sand.hash( this.$.$hyoo_crus_mine.rock_save( bin ), sand.tip(), sand.tag() )
			else sand.data( bin, sand.tip(), sand.tag() )
			
			return sand
		}
		
		@ $mol_mem_key
		sand_decode( sand: $hyoo_crus_sand ): $hyoo_crus_vary_type {
			let vary = this.sand_decode_raw( sand )
			if( typeof vary === 'symbol' ) vary = $hyoo_crus_ref_resolve( this.ref(), vary )
			return vary
		}
		
		@ $mol_mem_key
		sand_decode_raw( sand: $hyoo_crus_sand ): $hyoo_crus_vary_type {
			
			if( this.sand.get( sand.head() )?.get( sand.self() ) !== sand ) {
				for( const id of this.Tines().items_vary() ?? [] ) {
					const vary = this.$.$hyoo_crus_realm.Land( $hyoo_crus_vary_cast_ref( id! )! ).sand_decode_raw( sand )
					if( vary !== undefined ) return vary
				}
				return undefined!
			}
			
			const secret = this.secret()
			
			if( sand._vary !== undefined ) return sand._vary
			if( sand._open !== null ) return sand._vary = $hyoo_crus_vary_decode({ tip: sand.tip(), bin: sand._open })
			
			let bin = sand.size() > 32 ? this.$.$hyoo_crus_mine.rock( sand.hash() ) : sand.data()
			if( secret && bin && sand.tip() !== 'nil' ) {
				try {
					bin = new Uint8Array( $mol_wire_sync( secret ).decrypt( bin, sand.salt() ) )
				} catch( error: any ) {
					if( $mol_fail_catch( error ) ) {
						if( error.message ) $mol_fail_hidden( error )
						else $mol_fail_hidden( new Error( `Can't decrypt`, { cause: error } ) )
					}
				}
			}
			
			sand._open = bin
			return sand._vary = ( bin ? $hyoo_crus_vary_decode({ tip: sand.tip(), bin }) : null )
			
		}
		
		@ $mol_mem_key
		key_public( peer: string ) {
			const key = this.pass.get( peer )?.auth()
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
			return !this.sand.size
		}
		
		@ $mol_mem
		encrypted( next?: boolean ) {
			
			$mol_wire_solid()
			
			const gift = this.gift.get( this.ref() )
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
			const gift = this.gift.get( auth.lord() )
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
			
			for( const pass of this.pass.values() ) units.push( pass )
			for( const gift of this.gift.values() ) units.push( gift )
			
			for( const kids of this.sand.values() ) {
				for( const sand of kids.values() ) {
					units.push( sand )
					if( sand.size() <= 32 ) continue
					const rock = this.$.$hyoo_crus_mine.rock( sand.hash() )
					if( !rock ) continue
					rocks.push([ sand.hash(), rock ])
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
