namespace $ {
	
	export const $hyoo_crus_land_root = {
		data: new $hyoo_crus_link( '' ), // 0
		tine: new $hyoo_crus_link( 'AQAAAAAA' ), // 1
	}
	
	/** Standalone part of Glob which syncs separately, have own rights, and contains Units */
	export class $hyoo_crus_land extends $mol_object {
		
		/** Auth Independent actor with global unique id generated from Auth key */
		link() {
			return this.auth().pass().lord()
		}
		
		/** Auth Private key generated with Proof of Work  */
		auth() {
			return this.$.$hyoo_crus_auth.current()
		}
		
		faces = new $hyoo_crus_face_map

		gift = new $mol_wire_dict< string /*lord*/, $hyoo_crus_gift >()
		sand = new $mol_wire_dict< string /*head*/, $mol_wire_dict< string /*peer*/, $mol_wire_dict< string /*self*/, $hyoo_crus_sand > > >()
		
		self_all = new $mol_wire_dict< string, $hyoo_crus_sand | null >()
		
		@ $mol_action
		self_make( idea = Math.floor( Math.random() * 2**48 ) ): $hyoo_crus_link {
			
			const auth = this.auth()
			const rank = this.pass_rank( auth.pass() )
			
			if( rank < $hyoo_crus_rank_tier.post ) $mol_fail( new Error( `Rank too low (${ rank })` ) )
			
			for( let i = 0; i < 4096; ++i ) {
				
				idea = ( idea + 1 ) % 2**48
				if( !idea ) continue
				
				const idea_link = $hyoo_crus_link.from_int( idea )
				if( this.self_all.has( idea_link.str ) ) continue
				
				this.self_all.set( idea_link.str, null )
				return idea_link
				
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
			
			const id = $hyoo_crus_link.from_int( idea ).str
			const link = new $hyoo_crus_link( this.link().lord() + '_' + id )
			
			const area = this.$.$hyoo_crus_glob.Land( link )
			const gifts = $hyoo_crus_gift_sort([ ... this.gift.values() ]).map( gift => {
				const clone = $hyoo_crus_gift.from( gift )
				clone._land = area
				clone._pass = gift._pass
				clone._mate = gift._mate
				$hyoo_crus_unit_trusted.add( clone )
				return clone
			} )
			area.apply_units( gifts, 'skip_check' )
			
			area.bus()
			area.sync_mine()
			area.sync_yard()
			
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
			return this.Node( $hyoo_crus_list_link ).Item( $hyoo_crus_land_root.tine ) 
		} 
		
		/** High level representation of stored data */
		@ $mol_mem_key
		Node< Node extends typeof $hyoo_crus_node >( Node: Node ): $hyoo_crus_fund< InstanceType< Node > > {
			return new $hyoo_crus_fund( ( head: $hyoo_crus_link )=> {
				return ( Node as typeof $hyoo_crus_node ).make({
					land: ()=> this.sync(),
					head: $mol_const( head ),
				}) as InstanceType< Node >
			} )
		} 
		
		/** Total count of Units inside Land. */
		@ $mol_mem
		total() {
			let total = this.gift.size
			for( const peers of this.sand.values() ) {
				for( const units of peers.values() ) {
					total += units.size
				}
			}
			return total
		}
		
		/** Public key of Land Lord. */
		@ $mol_mem
		key() {
			return  this.gift.get( this.link().lord().str )?.pass() ?? null
		}
		
		/** Rights level of Pass for Land. */
		@ $mol_mem_key
		pass_rank( pass: $hyoo_crus_auth_pass, next?: typeof $hyoo_crus_rank.Value ): typeof $hyoo_crus_rank.Value {
			
			const prev = this.lord_rank( pass.lord() )
			
			if( next === undefined ) return prev
			if( next === prev ) return prev
			
			this.give( pass, next )
			return next
			
		}
		
		lord_rank( lord: $hyoo_crus_link, next?: typeof $hyoo_crus_rank.Value ) {
			
			if( lord.str === this.link().lord().str ) return $hyoo_crus_rank_rule
			
			const gift = this.gift.get( lord.str )
			
			if( next !== undefined ) {
				if( !gift ) $mol_fail( new Error( `No Pass for ${ lord }` ) )
				return this.pass_rank( gift.mate()!, next )
			}
			
			return gift?.rank()
				?? this.gift.get( $hyoo_crus_link.hole.str )?.rank()
				?? ( this.encrypted() ? $hyoo_crus_rank_deny : $hyoo_crus_rank_read )
			
		}
		
		/** Picks units between Face and current state. */
		delta_units( skip_faces = new $hyoo_crus_face_map ): $hyoo_crus_unit[] {
			
			this.loading()
			
			const skipped_gifts = new Map< string, $hyoo_crus_gift[] >()
			const skipped_sands = new Map< string, $hyoo_crus_sand[] >()
			
			function skip( skipped: Map< string, $hyoo_crus_unit[] >, unit: $hyoo_crus_unit ) {
				
				const peer = unit.pass().peer().str
				let list = skipped.get( peer )
				
				if( list ) list.push( unit )
				else skipped.set( peer, list = [ unit ] )
			
			}
			
			let gifts = [] as $hyoo_crus_gift[]
			let sands = [] as $hyoo_crus_sand[]
			
			for( const gift of this.gift.values() ) {
				
				const peer = gift.pass().peer().str
				const time_tick = skip_faces.get( peer )?.time_tick ?? 0
				
				if( time_tick >= gift.time_tick() ) {
					skip( skipped_gifts, gift )
				} else {
					gifts.push( gift )
				}
				
			}
			
			for( const kids of this.sand.values() ) {
				for( const peers of kids.values() ) {
					for( const sand of peers.values() ) {
						
						const peer = sand.pass().peer().str
						const time_tick = skip_faces.get( peer )?.time_tick ?? 0
						
						if( time_tick >= sand.time_tick() ) {
							skip( skipped_sands, sand )
						} else {
							sands.push( sand )
						}
						
					}
				}
			}
			
			// detect absence and then restore
			for( const [ peer, face ] of skip_faces ) {
				
				const peer_gifts = skipped_gifts.get( peer )
				const peer_sands = skipped_sands.get( peer )
				
				const mass = ( peer_gifts?.length ?? 0 ) + ( peer_sands?.length ?? 0 )
				if( mass <= face.mass ) continue
				
				if( peer_gifts ) gifts = gifts.concat( peer_gifts )
				if( peer_sands ) sands = sands.concat( peer_sands )
				
			}
			
			return [ ... $hyoo_crus_gift_sort( gifts ), ... sands ]
			
		}
		
		/** Makes binary Delta between Face and current state. */
		delta_pack( faces = new $hyoo_crus_face_map ): $hyoo_crus_pack | null {
			
			const parts = this.delta_parts( faces )
			if( !parts ) return null
			
			const pack = $hyoo_crus_pack.make( parts )
			
			return pack
		}
		
		delta_parts( faces = new $hyoo_crus_face_map ): $hyoo_crus_pack_parts | null {
			
			const units = this.delta_units( faces )
			if( units.length === 0 ) return null
			
			return [[
				this.link().str,
				$hyoo_crus_pack_part.from( units ),
			]]
			
		}
		
		@ $mol_action
		faces_pack(): $hyoo_crus_pack {
			const pack = $hyoo_crus_pack.make([[
				this.link().str,
				new $hyoo_crus_pack_part( [], [], this.faces.clone() ),
			]])
			return pack
		}
		
		/** Applies Delta to current state with verify. */
		@ $mol_action
		apply_units( units: $hyoo_crus_unit[], skip_check?: 'skip_check' ) {
			
			if( units.length === 0 ) return []
			
			if( !skip_check ) this.loading()
			
			const doubt = units.filter( unit => !$hyoo_crus_unit_trusted.has( unit ) )
			if( doubt.length ) {
				const errors = $mol_wire_sync( this ).units_verify( doubt )
				if( errors.some( v => v ) ) return errors
			}
			
			const errors = this.apply_units_trusted( units, skip_check )
			
			if( errors.find( Boolean ) ) this.$.$mol_log3_warn({
				place: `${this}.apply_units()`,
				message: errors.join( '\n' ),
				unit: units.length,
				hint: 'Send it to developer',
			})
			
			for( const unit of doubt ) $hyoo_crus_unit_trusted.add( unit )
			
			return errors
		}
		
		async units_verify( units: readonly $hyoo_crus_unit[] ) {
			
			const mixin = this.link().toBin()
			const mixin_lord = this.link().lord().toBin()
			
			return await Promise.all( units.map( async unit => {
				
				const sign = unit.sign()
				
				let sens = $hyoo_crus_link.hash_bin( unit.sens() ).mix( mixin )
				if( await unit.pass().verify( sens, sign ) ) return ''
				
				sens = $hyoo_crus_link.hash_bin( unit.sens() ).mix( mixin_lord )
				if( await unit.pass().verify( sens, sign ) ) return ''
				
				return `Wrong unit sign`
	
			} ) )
			
		}
		
		/** Applies Delta to current state without verifying. */
		@ $mol_action
		apply_units_trusted(
			units: $hyoo_crus_unit[],
			skip_check?: 'skip_check',
		) {
			
			return units.map( unit => {
				
				let need_audit = false
				const res = unit.choose({
				
					gift: gift => {
						
						const pass = gift.pass()
						const peer = pass.peer().str
						const mate = gift.mate()?.lord()?.str ?? ''
						
						if( !skip_check && ( this.pass_rank( pass ) < gift.rank_min() ) ) {
							return 'Need Rule Tier for Gifts'
						}
						
						const prev = this.gift.get( mate )
						if( prev && $hyoo_crus_gift.compare( prev, gift ) <= 0 ) return ''
						
						this.gift.set( mate, gift )
						this.faces.peer_time( peer, gift.time(), gift.tick() )
						
						if( !prev ) this.faces.peer_mass_shift( peer, +1 )
						
						if( ( prev?.rank() ?? $hyoo_crus_rank_deny ) > gift.rank() ) need_audit = true
						
						return ''
					},
				
					sand: sand => {
					
						const pass = sand.pass()
						const peer = pass.peer().str
						
						const head = sand.head().str
						const self = sand.self().str
						
						if( !skip_check && ( this.pass_rank( pass ) < sand.rank_min() ) ) {
							return 'Need Post Tier for Sands'
						}
						
						let peers = this.sand.get( head )
						if( !peers ) this.sand.set( head, peers = new $mol_wire_dict )
						
						let units = peers.get( peer )
						if( !units ) peers.set( pass.peer().str, units = new $mol_wire_dict )
						
						const prev = units.get( self )
						if( prev && $hyoo_crus_sand.compare( prev, sand ) <= 0 ) return ''
						
						units.set( self, sand )
						this.self_all.set( self, sand )
						this.faces.peer_time( peer, sand.time(), sand.tick() )
						
						if( !prev ) this.faces.peer_mass_shift( peer, +1 )
						
						return ''
					},
					
				})
			
				if( need_audit ) this.rank_audit()
				return res
			
			})
			
		}
		
		apply_land( land: $hyoo_crus_land ) {
			return this.apply_units( land.delta_units() )
		}
		
		rank_audit() {
			
			for( const [ lord, gift ] of this.gift ) {
				
				const rank = this.pass_rank( gift.pass() )
				if( rank >= gift.rank_min() ) continue
				
				this.gift.delete( lord )
				this.faces.peer_mass_shift( gift.pass().peer().str, -1 )
				
			}
			
			for( const [ head, peers ] of this.sand ) {
				for( const [ peer, sands ] of peers ) {
					for( const [ self, sand ] of sands ) {
						
						const rank = this.pass_rank( sand.pass() )
						if( rank >= sand.rank_min() ) continue
						
						sands.delete( self )
						this.faces.peer_mass_shift( sand.pass().lord().peer().str, -1 )
						
					}
				}
			}
			
		}
		
		@ $mol_action
		fork( preset: $hyoo_crus_rank_preset = [[ null, $hyoo_crus_rank_read ]] ) {
			const land = this.$.$hyoo_crus_glob.land_grab( preset )
			land.Tine().items_vary([ this.link() ])
			return land
		}
		
		@ $mol_mem_key
		sand_ordered( { head, peer }: { head: $hyoo_crus_link, peer: $hyoo_crus_link | null } ) {
			
			this.sync()
			// this.secret() // early async to prevent async on put
			
			const queue = ( peer?.str )
				? [ ... this.sand.get( head.str )?.get( peer!.str )?.values() ?? [] ]
				: [ ... this.sand.get( head.str )?.values() ?? [] ].flatMap( units => [ ... units.values() ] )
			
			const slices = new Map
			for( const sand of queue ) slices.set( sand, 0 )
			
			merge: if( head.str !== $hyoo_crus_land_root.tine.str ) {
				
				const tines = ( this.Tine()?.items_vary().slice().reverse() ?? [] )
					.map( $hyoo_crus_vary_cast_link )
					.filter( $mol_guard_defined )
				if( !tines.length ) break merge
				
				const exists = new Set( queue.map( sand => sand.self().str ) )
				
				const glob = this.$.$hyoo_crus_glob
				let slice = 0
				for( const link of tines ) {
					++ slice
					const land = glob.Land( link )
					for( const sand of land.sand_ordered({ head, peer }) ) {
						
						if( exists.has( sand.self().str ) ) continue
						queue.push( sand )
						exists.add( sand.self().str )
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
			
			const key = peer === null ? ( sand: $hyoo_crus_sand )=> sand.path() : ( sand: $hyoo_crus_sand )=> sand.self().str
			
			const by_key = new Map([ [ '', entry  ] ])
			const by_self = new Map([ [ '', entry ] ])
			
			while( queue.length ) {
				
				const last = queue.pop()!
				by_key.get( entry.prev )!.next = key( last )
				
				const item = { sand: last, next: '', prev: entry.prev }
				by_key.set( key( last ), item )
				
				const exists = by_self.get( last.self().str )
				if( !exists || compare( exists.sand!, last ) < 0 ) {
					by_self.set( last.self().str, item )
				}
				
				entry.prev = key( last )
				
				for( let cursor = queue.length - 1; cursor >= 0; --cursor ) {
					
					const kid = queue[cursor]
					
					let lead = by_self.get( kid.lead().str )
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
					
					const exists2 = by_self.get( kid.self().str )
					if( !exists2 || compare( exists2.sand!, kid ) < 0 ) {
						by_self.set( kid.self().str, item )
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
		
		@ $mol_mem
		join() {
			this.encrypted( this.encrypted() )
		}
		
		/**
		 * Gives access rights to Lord by Auth key.
		 * `null` - gives rights for all Peers.
		 */
		@ $mol_action
		give(
			mate: $hyoo_crus_auth_pass | null,
			rank: typeof $hyoo_crus_rank.Value,
		) {
			
			this.join()
			
			const gift = new $hyoo_crus_gift
			
			gift.pass( this.auth().pass() )
			gift.rank( rank )
			gift.time_tick( this.faces.tick().time_tick )
			
			if( mate ) gift.mate( mate )
			gift._land = this
			
			if( rank >= $hyoo_crus_rank_read ) {
				
				const secret_land = this.secret()
				if( secret_land ) {
					
					if( !mate ) $mol_fail( new Error( `Encrypted land can't be shared to everyone` ) )
					
					const secret_mutual = this.auth().secret_mutual( mate )
					if( secret_mutual ) {
						const bill = $mol_wire_sync( secret_mutual ).close( secret_land, gift.salt() )
						gift.bill().set( bill )
					}
					
				}
				
			}
			
			$hyoo_crus_unit_trusted.add( gift )
			
			const error = this.apply_units([ gift ])[0]
			if( error ) $mol_fail( new Error( error ) )
			
			this.broadcast()
			return gift
		}
		
		/** Places data to tree. */
		@ $mol_action
		post(
			lead: $hyoo_crus_link,
			head: $hyoo_crus_link,
			self: $hyoo_crus_link,
			vary: $hyoo_crus_vary_type,
			tag: keyof typeof $hyoo_crus_sand_tag = 'term',
		) {
			
			this.join()
			
			if( vary instanceof $hyoo_crus_link ) vary = vary.relate( this.link() )
			
			const auth = this.auth()
			const sand = new $hyoo_crus_sand
			$hyoo_crus_unit_trusted.add( sand )
			
			sand.time_tick( this.faces.tick().time_tick )
			sand.pass( auth.pass() )
			sand.lead( lead )
			sand.head( head )
			sand._vary = vary
			sand._land = this
			
			let { tip, bin } = $hyoo_crus_vary_encode( vary )
			sand._open = bin
			
			if( vary !== null && this.encrypted() ) {
				sand.hash( $hyoo_crus_link.hash_bin( bin ), tip, tag )
			} else {
				if( bin.byteLength > 32 ) sand.hash( $hyoo_crus_link.hash_bin( bin ), tip, tag )
				else sand.data( bin, tip, tag )
			}
			
			sand.self( self.str ? self : this.self_make( sand.idea() ) )
			
			const error = this.apply_units([ sand ])[0]
			if( error ) $mol_fail( new Error( error ) )
			
			this.broadcast()
			return sand
		}
		
		@ $mol_action
		sand_move(
			sand: $hyoo_crus_sand,
			head: $hyoo_crus_link,
			seat: number,
			peer = $hyoo_crus_link.hole as $hyoo_crus_link | null
		) {
			
			if( sand.tip() === 'nil' ) $mol_fail( new RangeError( `Can't move wiped sand` ) )
			
			const units = this.sand_ordered({ head, peer }).filter( unit => unit.tip() !== 'nil' )
			if( seat > units.length ) $mol_fail( new RangeError( `Seat (${seat}) out of units length (${units.length})` ) )
			
			const lead = seat ? units[ seat - 1 ].self() : $hyoo_crus_link.hole
			const vary = this.sand_decode( sand )
			
			if( sand.head() === head ) {
				
				const seat_prev = units.indexOf( sand )
				
				if( seat === seat_prev ) return
				if( seat === seat_prev + 1 ) return
				
				const prev = seat_prev ? units[ seat_prev - 1 ].self() : $hyoo_crus_link.hole
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
			
			return this.post(
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
			peer = $hyoo_crus_link.hole as $hyoo_crus_link | null
		) {
			
			const head = sand.head()
			const units = this.sand_ordered({ head, peer }).filter( unit => unit.tip() !== 'nil' )
			const seat = units.indexOf( sand )
			if( seat < 0 ) return sand
			
			return this.post(
				seat ? units[ seat - 1 ].self() : $hyoo_crus_link.hole,
				head,
				sand.self(),
				null,
				'term',
			)
			
		}
		
		broadcast() {
			this.$.$hyoo_crus_glob.yard().lands_news.add( this.link().str )
		}
		
		@ $mol_mem
		sync() {
			this.loading()
			this.bus()
			this.sync_mine()
			this.sync_yard()
			return this
		}
		
		destructor() {
			this.$.$hyoo_crus_glob.yard().forget_land( this )
		}
		
		mine() {
			return this.$.$hyoo_crus_mine.land( this.link() )
		}
		
		@ $mol_mem
		sync_mine() {
			return new $mol_wire_atom( '', ()=> this.saving() ).fresh()
		}
		
		@ $mol_mem
		sync_yard() {
			return new $mol_wire_atom( '', ()=> this.$.$hyoo_crus_glob.yard().sync_land( this.link() ) ).fresh()
		}
		
		@ $mol_mem
		bus() {
			return new this.$.$mol_bus< ArrayBuffer[] >(
				`$hyoo_crus_land:${ this.link() }`,
				$mol_wire_async( bufs => {
					
					this.apply_units( bufs.map( buf => {
						const unit = new $hyoo_crus_unit( buf ).narrow()
						$hyoo_crus_unit_trusted.add( unit )
						this.mine().units_persisted.add( unit )
						return unit
					} ) )
					
				} ),
			)
		}
		
		@ $mol_mem
		loading() {
			
			let units = this.mine().units()
			const part = $hyoo_crus_pack_part.from( units )
			part.gifts = $hyoo_crus_gift_sort( part.gifts ?? [] )
			
			if( this.$.$hyoo_crus_log() ) $mol_wire_sync( this.$ ).$mol_log3_rise({
				place: this,
				message: 'Load Unit',
				gifts: part.gifts.length,
				sands: part.sands.length,
			})
			
			this.apply_units( part.units, 'skip_check' )
			
		}
		
		@ $mol_mem
		saving() {
			
			this.loading()
			
			const mine = this.mine()
			
			const encoding = [] as $hyoo_crus_sand[]
			const signing = [] as $hyoo_crus_unit[]
			const persisting = [] as $hyoo_crus_unit[]
			
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
				
				this.bus().send( persisting.map( unit => unit.buffer ) )
				mine.units( persisting )
			
				if( this.$.$hyoo_crus_log() ) $mol_wire_sync( this.$ ).$mol_log3_done({
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
			const sens = $hyoo_crus_link.hash_bin( unit.sens() ).mix( unit._land!.link() )
			
			while( true ) {
				
				const sign = key.sign( sens )
				unit.sign( sign.slice( 0, 2 ) )
				
				const rank = this.pass_rank( unit.pass() )
				
				if( rank >= unit.rank_min() ) {
					unit.sign( sign )
					return
				} else {
					unit.sign( new Uint8Array([ 0, 0 ]) )
				}
				
			}
			
		}
		
		@ $mol_mem_key
		sand_encode( sand: $hyoo_crus_sand ) {
			
			if( sand._open === null ) return sand
			if( sand.tip() === 'nil' ) return sand
			
			let bin = sand._open
			const secret = sand._land!.secret()!
			
			if( secret ) bin = $mol_wire_sync( secret ).encrypt( bin, sand.salt() )
			
			if( bin.byteLength > 32 ) sand.hash( $hyoo_crus_link.hash_bin( bin ), sand.tip(), sand.tag() )
			else sand.data( bin, sand.tip(), sand.tag() )
			
			return sand
		}
		
		@ $mol_mem_key
		sand_decode( sand: $hyoo_crus_sand ): $hyoo_crus_vary_type {
			
			try {

				let vary = this.sand_decode_raw( sand )
				if( vary instanceof $hyoo_crus_link ) vary = vary.resolve( this.link() )
				return vary

			} catch( error ) {
				
				if( error instanceof Promise ) return $mol_fail_hidden( error )
				this.$.$mol_fail_log( error )
				return null

			}

		}
		
		@ $mol_mem_key
		sand_decode_raw( sand: $hyoo_crus_sand ): $hyoo_crus_vary_type {
			
			if( this.sand.get( sand.head().str )?.get( sand.pass().peer().str )?.get( sand.self().str ) !== sand ) {
				for( const id of this.Tine().items_vary() ?? [] ) {
					const vary = this.$.$hyoo_crus_glob.Land( $hyoo_crus_vary_cast_link( id! )! ).sand_decode_raw( sand )
					if( vary !== undefined ) return vary
				}
				return undefined!
			}
			
			const secret = this.secret()
			
			if( sand._vary !== undefined ) return sand._vary
			if( sand._open !== null ) return sand._vary = $hyoo_crus_vary_decode({ tip: sand.tip(), bin: sand._open })
			
			let bin = sand.size() > 32 ? this.mine().ball( sand.hash()! ) : sand.data()
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
		
		@ $mol_mem
		encryptable() {
			return !this.sand.size
		}
		
		@ $mol_mem
		encrypted( next?: boolean ) {
			
			// $mol_wire_solid()
			
			const gift = this.gift.get( this.link().str )
			const prev = gift?.bill().some( b => b ) ?? false
			
			if( next === undefined ) return prev
			
			if( this.faces.size ) {
				if( prev === next ) return prev
				$mol_fail( new Error( `Change encryption is forbidden` ) )
			}
			
			const auth = this.auth()
			
			const unit = new $hyoo_crus_gift
			$hyoo_crus_unit_trusted.add( unit )
			
			unit.rank( $hyoo_crus_rank_rule )
			unit.time_tick( this.faces.tick().time_tick )
			unit.pass( auth.pass() )
			unit.mate( auth.pass() )
			unit._land = this
			
			if( next ) {
				const secret = $mol_wire_sync( $mol_crypto_sacred ).make()
				const secret_mutual = auth.secret_mutual( auth.public() )
				const secret_closed = $mol_wire_sync( secret_mutual ).close( secret, unit.salt() )
				unit.bill().set( secret_closed )
			}
			
			const error = this.apply_units([ unit ])[0]
			if( error ) $mol_fail( new Error( error ) )
			
			return next
		}
		
		@ $mol_mem
		secret() {
			
			if( !this.encrypted() ) return null
			
			const auth = this.auth()
			const gift = this.gift.get( auth.pass().lord().str )
			if( !gift ) return $mol_fail( new Error( `Access denied` ) )
			
			const bill = gift.bill()
			if( !bill.some( b => b ) ) return $mol_fail( new Error( `No key to decrypt` ) )
			
			const secret_mutual = auth.secret_mutual( gift.pass() )
			if( !secret_mutual ) return $mol_fail( new Error( `Can't decrypt secret` ) )
			
			return $mol_wire_sync( secret_mutual ).open( bill, gift.salt() )
			
		}
		
		dump() {
			
			this.saving()
			
			const units = [] as $hyoo_crus_unit[]
			const rocks = [] as [ string, Uint8Array ][]
			
			for( const gift of this.gift.values() ) units.push( gift )
			
			for( const heads of this.sand.values() ) {
				for( const sands of heads.values() ) {
					for( const sand of sands.values() ) {
						units.push( sand )
					}
				}
			}
			
			return {
				land: this.link(),
				units
			}
			
		}
		
		;[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {},
		 		$mol_dev_format_native( this ),
				' ',
				$mol_dev_format_auto( this.faces.face ),
		 	)
		 }
		
	}
	
}
