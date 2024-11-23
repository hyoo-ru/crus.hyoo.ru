namespace $ {
	
	export enum $hyoo_crus_land_root {
		data = '', // 0
		tine = 'AQAAAAAA', // 1
	}
	
	/** Standalone part of Glob which syncs separately, have own rights, and contains Units */
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
		sand = new $mol_wire_dict< string /*head*/, $mol_wire_dict< string /*peer*/, $mol_wire_dict< string /*self*/, $hyoo_crus_sand > > >()
		
		self_all = new $mol_wire_set< string >()
		
		@ $mol_action
		self_make( idea = Math.floor( Math.random() * 2**48 ) ) {
			
			const auth = this.auth()
			const rank = this.lord_rank( auth.lord() )
			
			if( rank === $hyoo_crus_rank.reg ) return auth.peer()
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
		
		@ $mol_action
		area_make( idea = Math.floor( Math.random() * 2**48 ) ) {
			
			this.loading()
			
			const id = $mol_base64_ae_encode( new Uint8Array( new BigUint64Array([ BigInt( idea ) ]).buffer, 0, 6 ) )
			const ref = $hyoo_crus_ref( $hyoo_crus_ref_lord( this.ref() ).description! + '_' + id )
			
			const area = this.$.$hyoo_crus_glob.Land( ref )
			const units = this.unit_sort([ ... this.pass.values(), ... this.gift.values() ]).map( unit => {
				const clone = $hyoo_crus_unit.from( unit ).narrow()
				clone._land = area
				$hyoo_crus_unit_trusted.add( clone )
				return clone
			} )
			const errors = area.apply_unit( units, 'skip_check' ).filter( Boolean )
			
			for( const error of errors ) this.$.$mol_log3_warn({
				place: `${this}.area_make()`,
				message: error,
				hint: 'Send it to developer',
			})
			
			area.sync_mine()
			area.sync_yard()
			area.bus()
			
			return area
		}
		
		/** Data root */
		@ $mol_mem_key
		Data< Node extends typeof $hyoo_crus_node >( Node: Node ) {
			return this.Node( Node ).Item( $hyoo_crus_land_root.data )
		} 
		
		/** Lands for inheritance */
		@ $mol_mem
		Tine() {
			return this.Node( $hyoo_crus_list_ref ).Item( $hyoo_crus_land_root.tine ) 
		} 
		
		/** High level representation of stored data */
		@ $mol_mem_key
		Node< Node extends typeof $hyoo_crus_node >( Node: Node ): $hyoo_crus_fund< string, InstanceType< Node > > {
			return new $hyoo_crus_fund( ( head: string )=> {
				if( head === 'AAAAAAAA' ) return this.Node( Node ).Item( $hyoo_crus_land_root.data )
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
			for( const peers of this.sand.values() ) {
				for( const units of peers.values() ) {
					total += units.size
				}
			}
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
			
			if( lord === $hyoo_crus_ref_lord( this.ref() ) ) return $hyoo_crus_rank.law
			
			const prev = this.gift.get( lord )?.rank()
				?? this.gift.get( $hyoo_crus_ref( '' ) )?.rank()
				?? $hyoo_crus_rank.get
			
			if( next === undefined ) return prev
			if( next === prev ) return prev
			
			this.give( lord, next )
			return next
			
		}
		
		/** Rights level of Peer for Land. */
		peer_rank( peer: string ) {
			const auth = this.pass.get( peer )!
			if( !auth ) return $hyoo_crus_rank.get
			return this.lord_rank( auth.lord() )
		}
		
		unit_sort( units: readonly $hyoo_crus_unit[] ) {
		
			const dict = new Map< string, $hyoo_crus_unit >()
			for( const unit of units ) dict.set( unit.key(), unit )
			
			const lord = $hyoo_crus_ref_lord( this.ref() )
			
			const graph = new $mol_graph< string, void >()
			for( const unit of units ) {
				unit.choose({
					pass: pass => {
						if( pass.lord() === lord ) return
						graph.link( pass.key(), 'gift:' )
					},
					gift: gift => {
						graph.link( 'pass:' + $hyoo_crus_ref_peer( gift.dest() ), gift.key() )
						graph.link( gift.key(), 'pass:' + gift.peer() )
					},
					sand: sand=> {
						graph.link( sand.key(), 'pass:' + sand.peer() )
					},
				})
			}
			
			graph.acyclic( ()=> 1 ) 
			
			return [ ... graph.sorted ].map( key => dict.get( key )! ).filter( Boolean )
	
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
				for( const peers of kids.values() ) {
					for( const unit of peers.values() ) {
						
						const time = face.get( unit.peer() ) ?? 0
						if( time >= unit.time() ) continue
						
						auth( unit.peer() )
						delta.push( unit )
						
					}
				}
			}
			
			for( const [ peer, unit ] of this.pass ) {
				
				if( passed.has( peer ) ) continue
				if( face.has( unit.peer() ) ) continue
				
				delta.push( unit )
				passed.add( peer )
				
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
		apply_unit( delta: readonly $hyoo_crus_unit[], skip_check?: 'skip_check' ) {
			
			if( !delta.length ) return []
			
			if( !skip_check ) this.loading()
			
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
			const auth = new Map( passes.map( ( unit: $hyoo_crus_pass )=> [
				unit.peer(),
				$mol_crypto_key_public.from( unit.auth() ),
			] ) )
			
			const mixin = $hyoo_crus_ref_encode( this.ref() )
			const mixin_lord = $hyoo_crus_ref_encode( $hyoo_crus_ref_lord( this.ref() ) )
			
			return await Promise.all( units.map( async unit => {
				
				let key_public = this.key_public( unit.peer() )
				if( !key_public ) key_public = auth.get( unit.peer() ) ?? null
				if( !key_public ) return `No public key for peer (${unit.peer()})`
				
				const sign = unit.sign()
				
				let sens = unit.sens().slice()
				for( let i = 0; i < mixin.length; ++i ) sens[i+2] ^= mixin[i]
				if( await key_public.verify( sens, sign ) ) return ''
				
				sens = unit.sens().slice()
				for( let i = 0; i < mixin_lord.length; ++i ) sens[i+2] ^= mixin_lord[i]
				if( await key_public.verify( sens, sign ) ) return ''
				
				return `Wrong unit sign`
	
			} ) )
			
		}
		
		/** Applies Delta to current state without verifying. */
		@ $mol_action
		apply_unit_trust( delta: readonly $hyoo_crus_unit[], skip_check?: 'skip_check' ) {
			return delta.map( unit => {
				
				let need_recheck = false
				const res = unit.choose({
					
					pass: next => {
						
						const lord = next.lord()
						const peer = next.peer()
						
						if( !skip_check && this.lord_rank( lord ) < $hyoo_crus_rank.reg ) return 'Need reg rank to join'
						
						const exists = this.pass.get( peer )
						if( exists ) return ''
						
						this.pass.set( peer, next )
						this.faces.time_max( peer, 0 )
						this.faces.total ++
						
					},
					
					gift: next => {
						
						const peer = next.peer()
						const dest = next.dest()
						
						if( !skip_check && this.peer_rank( peer ) < $hyoo_crus_rank.law ) return 'Need law rank to change rank'
						
						const prev = this.gift.get( dest )
						if( prev && $hyoo_crus_gift.compare( prev, next ) <= 0 ) return ''
						
						this.gift.set( dest, next )
						this.faces.time_max( peer, next.time() )
						
						if( !prev ) this.faces.total ++
						
						if( ( prev?.rank() ?? $hyoo_crus_rank.nil ) > next.rank() ) need_recheck = true
						
					},
					
					sand: next => {
						
						const head = next.head()
						const peer = next.peer()
						const self = next.self()
						
						if( !skip_check && this.peer_rank( peer ) < $hyoo_crus_rank.mod ) return 'Need mod rank to post data'

						let peers = this.sand.get( head )
						if( !peers ) this.sand.set( head, peers = new $mol_wire_dict )
							
						let units = peers.get( peer )
						if( !units ) peers.set( peer, units = new $mol_wire_dict )
							
						const prev = units.get( self )
						if( prev && $hyoo_crus_sand.compare( prev, next ) <= 0 ) return ''
						
						units.set( self, next )
						this.self_all.add( self )
						this.faces.time_max( peer, next.time() )
						
						if( !prev ) this.faces.total ++
						
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
			
			for( const [ peer, pass ] of this.pass ) {
				if( this.lord_rank( pass.lord() ) >= $hyoo_crus_rank.reg ) continue
				this.pass.delete( peer )
				this.faces.total --
			}
			
			for( const [ lord, gift ] of this.gift ) {
				if( this.peer_rank( gift.peer() ) >= $hyoo_crus_rank.law ) continue
				this.gift.delete( lord )
				this.faces.total --
			}
			
			for( const [ head, peers ] of this.sand ) {
				for( const [ peer, units ] of peers ) {
					if( this.peer_rank( peer ) >= $hyoo_crus_rank.mod ) continue
					peers.delete( peer )
					this.faces.total -= units.size
				}
			}
			
		}
		
		@ $mol_action
		fork( preset = { '': $hyoo_crus_rank.get } ) {
			const land = this.$.$hyoo_crus_glob.land_grab( preset )
			land.Tine().items_vary([ this.ref() ])
			return land
		}
		
		@ $mol_mem_key
		sand_ordered( { head, peer }: { head: string, peer: string | null } ) {
			
			this.sync()
			this.secret() // early async to prevent async on put
			
			const queue = peer
				? [ ... this.sand.get( head )?.get( peer )?.values() ?? [] ]
				: [ ... this.sand.get( head )?.values() ?? [] ].flatMap( units => [ ... units.values() ] )
			
			const slices = new Map
			for( const sand of queue ) slices.set( sand, 0 )
			
			merge: if( head !== $hyoo_crus_land_root.tine ) {
				
				const tines = ( this.Tine()?.items_vary().slice().reverse() ?? [] )
					.map( $hyoo_crus_vary_cast_ref )
					.filter( $mol_guard_defined )
				if( !tines.length ) break merge
				
				const exists = new Set( queue.map( sand => sand.self() ) )
				
				const glob = this.$.$hyoo_crus_glob
				let slice = 0
				for( const ref of tines ) {
					++ slice
					const land = glob.Land( ref )
					for( const sand of land.sand_ordered({ head, peer }) ) {
						
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
			
			const key = peer === null ? ( sand: $hyoo_crus_sand )=> sand.key() : ( sand: $hyoo_crus_sand )=> sand.self()
			
			const by_key = new Map([ [ '', entry  ] ])
			const by_self = new Map([ [ '', entry ] ])
			
			while( queue.length ) {
				
				const last = queue.pop()!
				by_key.get( entry.prev )!.next = key( last )
				
				const item = { sand: last, next: '', prev: entry.prev }
				by_key.set( key( last ), item )
				
				const exists = by_self.get( last.self() )
				if( !exists || compare( exists.sand!, last ) < 0 ) {
					by_self.set( last.self(), item )
				}
				
				entry.prev = key( last )
				
				for( let cursor = queue.length - 1; cursor >= 0; --cursor ) {
					
					const kid = queue[cursor]
					
					let lead = by_self.get( kid.lead() )
					if( !lead ) continue
					
					while( lead.next && ( compare( by_key.get( lead.next )!.sand!, kid ) < 0 ) ) lead = by_key.get( lead.next )!
					
					const exists1 = by_key.get( key( kid ) )
					if( exists1 ) {
						
						if( ( lead.sand ? key( lead.sand ) : '' ) === exists1.prev ) {
							exists1.sand = kid
							if( cursor === queue.length - 1 ) queue.pop()
							continue
						}
						
						by_key.get( exists1.prev )!.next = exists1.next
						by_key.get( exists1.next )!.prev = exists1.prev
						
					}
					
					const follower = by_key.get( lead.next )!
					follower.prev = key( kid )
					
					const item = { sand: kid, next: lead.next, prev: lead.sand ? key( lead.sand ) : '' }
					by_key.set( key( kid ), item )
					
					const exists2 = by_self.get( kid.self() )
					if( !exists2 || compare( exists2.sand!, kid ) < 0 ) {
						by_self.set( kid.self(), item )
					}
					
					lead.next = key( kid )
					
					if( cursor === queue.length - 1 ) queue.pop()
					cursor = queue.length
					
				}
				
			}
			
			const res = [] as $hyoo_crus_sand[]
			
			while( entry.next ) {
				entry = by_key.get( entry.next )!
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
			
			const error = this.apply_unit([ next ])[0]
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
			dest: $hyoo_crus_auth | $hyoo_crus_ref | null,
			rank: $hyoo_crus_rank,
		) {
				
			this.join()
			
			const auth = this.auth()
			const unit = new $hyoo_crus_gift
			$hyoo_crus_unit_trusted.add( unit )
			
			unit.rank( rank )
			unit.time( this.faces.tick() )
			unit.peer( auth.peer() )
			unit.dest( dest ? dest instanceof $hyoo_crus_auth ? dest.lord() : dest : $hyoo_crus_ref('') )
			unit._land = this
			
			if( rank >= $hyoo_crus_rank.get ) {
				
				const secret_land = this.secret()
				if( secret_land ) {
					
					if( !dest ) $mol_fail( new Error( `Encrypted land can't be shared to everyone` ) )
					
					const prev = this.gift.get( dest instanceof $hyoo_crus_auth ? dest.lord() : dest )
					if( prev && prev.rank() >= $hyoo_crus_rank.get ) {
						unit.bill().set( prev.bill() )
					} else {
						
						if( typeof dest === 'symbol' ) {
							$mol_fail( new Error( `No pub key for lord (${ dest.description! })` ) )
						}
					
						const secret_mutual = this.secret_mutual( dest.toString() )
						if( secret_mutual ) {
							const secret_bin = $mol_wire_sync( secret_land ).serial()
							const bill = $mol_wire_sync( secret_mutual ).encrypt( secret_bin, unit.salt() )
							unit.bill().set( bill )
						}
					}
					
				}
				
			}
			
			const error = this.apply_unit([ unit ])[0]
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
			
			const error = this.apply_unit([ unit ])[0]
			if( error ) $mol_fail( new Error( error ) )
			
			this.broadcast()
			return unit
		}
		
		@ $mol_action
		sand_move(
			sand: $hyoo_crus_sand,
			head: string,
			seat: number,
			peer = '' as string | null
		) {
			
			if( sand.tip() === 'nil' ) $mol_fail( new RangeError( `Can't move wiped sand` ) )
			
			const units = this.sand_ordered({ head, peer }).filter( unit => unit.tip() !== 'nil' )
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
		sand_wipe(
			sand: $hyoo_crus_sand,
			peer = '' as string | null,
		) {
			
			const head = sand.head()
			const units = this.sand_ordered({ head, peer }).filter( unit => unit.tip() !== 'nil' )
			const seat = units.indexOf( sand )
			
			this.post(
				seat ? units[ seat - 1 ].self() : '',
				head,
				sand.self(),
				null,
				'term',
			)
			
		}
		
		broadcast() {
			this.$.$hyoo_crus_glob.yard().lands_news.add( this.ref() )
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
			this.$.$hyoo_crus_glob.yard().forget_land( this )
		}
		
		@ $mol_mem
		sync_mine() {
			return new $mol_wire_atom( '', ()=> this.saving() ).fresh()
		}
		
		@ $mol_mem
		sync_yard() {
			return new $mol_wire_atom( '', ()=> this.$.$hyoo_crus_glob.yard().sync_land( this.ref() ) ).fresh()
		}
		
		@ $mol_mem
		bus() {
			return new this.$.$mol_bus< ArrayBuffer[] >(
				`$hyoo_crus_land:${ this.ref().description }`,
				$mol_wire_async( bins => {
					
					this.apply_unit( bins.map( bin => {
						const unit = new $hyoo_crus_unit( bin ).narrow()
						$hyoo_crus_unit_trusted.add( unit )
						this.$.$hyoo_crus_mine.units_persisted.add( unit )
						return unit
					} ) )
					
				} ),
			)
		}
		
		@ $mol_mem
		loading() {
			
			// $mol_wire_solid()
			
			let units = this.unit_sort( this.$.$hyoo_crus_mine.units( this.ref() ) ?? [] )
			
			$mol_wire_sync( this.$ ).$mol_log3_rise({
				place: this,
				message: 'Load Unit',
				units: units.length,
			})
			
			const errors = this.apply_unit( units, 'skip_check' ).filter( Boolean )
			
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
				for( const units of kids.values() ) {
					for( const sand of units.values() ) {
						if( !sand.signed() ) {
							encoding.push( sand )
							signing.push( sand )
						}
						if( !mine.units_persisted.has( sand ) ) persisting.push( sand )
					}
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
			for( let i = 0; i < mixin.length; ++i ) sens[i+2] ^= mixin[i]
			
			const sign = key.sign( sens )
			unit.sign( sign )
			
		}
		
		@ $mol_mem_key
		sand_encode( sand: $hyoo_crus_sand ) {
			
			if( sand._open === null ) return sand
			if( sand.tip() === 'nil' ) return sand
			
			let bin = sand._open
			const secret = sand._land!.secret()!
			
			if( secret ) bin = $mol_wire_sync( secret ).encrypt( bin, sand.salt() )
			
			if( bin.byteLength > 32 ) sand.hash( this.$.$hyoo_crus_mine.rock_save( bin ), sand.tip(), sand.tag() )
			else sand.data( bin, sand.tip(), sand.tag() )
			
			return sand
		}
		
		@ $mol_mem_key
		sand_decode( sand: $hyoo_crus_sand ): $hyoo_crus_vary_type {
			
			try {

				let vary = this.sand_decode_raw( sand )
				if( typeof vary === 'symbol' ) vary = $hyoo_crus_ref_resolve( this.ref(), vary )
				return vary

			} catch( error ) {
				
				if( error instanceof Promise ) return $mol_fail_hidden( error )
				this.$.$mol_fail_log( error )
				return null

			}

		}
		
		@ $mol_mem_key
		sand_decode_raw( sand: $hyoo_crus_sand ): $hyoo_crus_vary_type {
			
			if( this.sand.get( sand.head() )?.get( sand.peer() )?.get( sand.self() ) !== sand ) {
				for( const id of this.Tine().items_vary() ?? [] ) {
					const vary = this.$.$hyoo_crus_glob.Land( $hyoo_crus_vary_cast_ref( id! )! ).sand_decode_raw( sand )
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
					bin = $mol_wire_sync( secret ).decrypt( bin, sand.salt() )
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
			
			// $mol_wire_solid()
			
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
			$hyoo_crus_unit_trusted.add( unit )
			
			unit.rank( $hyoo_crus_rank.law )
			unit.time( this.faces.tick() )
			unit.peer( auth.peer() )
			unit.dest( auth.lord() )
			unit._land = this
			
			const secret_closed = $mol_wire_sync( secret_mutual ).encrypt( secret_land, unit.salt() )
			unit.bill().set( secret_closed )
			
			const error = this.apply_unit([ unit ])[0]
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
			
			for( const heads of this.sand.values() ) {
				for( const sands of heads.values() ) {
					for( const sand of sands.values() ) {
						units.push( sand )
						if( sand.size() <= 32 ) continue
						const rock = this.$.$hyoo_crus_mine.rock( sand.hash() )
						if( !rock ) continue
						rocks.push([ sand.hash(), rock ])
					}
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
