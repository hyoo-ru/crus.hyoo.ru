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

		_pass = new $mol_wire_dict< string /*Lord*/, $hyoo_crus_auth_pass >()
		_seal_item = new $mol_wire_dict< string /*Item*/, $hyoo_crus_unit_seal >()
		_seal_shot = new $mol_wire_dict< string /*Shot*/, $hyoo_crus_unit_seal >()
		_gift = new $mol_wire_dict< string /*Lord*/, $hyoo_crus_unit_gift >()
		_sand = new $mol_wire_dict< string /*Head*/, $mol_wire_dict< string /*Lord*/, $mol_wire_dict< string /*Self*/, $hyoo_crus_unit_sand > > >()
		
		pass_add( pass: $hyoo_crus_auth_pass ) {
			if( this._pass.has( pass.lord().str ) ) return
			this._pass.set( pass.lord().str, pass )
		}
		
		seal_add( seal: $hyoo_crus_unit_seal ) {
			
			for( const hash of seal.hash_list() ) {
				const prev = this._seal_item.get( hash.str )
				if( $hyoo_crus_unit_seal.compare( prev, seal ) <= 0 ) continue
				this._seal_item.set( hash.str, seal )
			}
			
			const peer = seal.lord().peer()
			this.faces.peer_time( peer.str, seal.time(), seal.tick() )
			
			const prev = this._seal_shot.get( seal.shot().str )
			if( !prev ) this.faces.peer_summ_shift( peer.str, +1 )
			
		}
		
		gift_add( gift: $hyoo_crus_unit_gift ) {
			
			const mate = gift.mate()
			
			const prev = this._gift.get( mate.str )
			if( $hyoo_crus_unit_seal.compare( prev, gift ) <= 0 ) return
			
			this._gift.set( mate.str, gift )
			
			const peer = gift.lord().peer()
			this.faces.peer_time( peer.str, gift.time(), gift.tick() )
			if( !prev ) this.faces.peer_summ_shift( peer.str, +1 )
			
			if( ( prev?.rank() ?? $hyoo_crus_rank_deny ) > gift.rank() ) this.rank_audit()
			
		}
		
		sand_add( sand: $hyoo_crus_unit_sand ) {
			
			let peers = this._sand.get( sand.head().str )
			if( !peers ) this._sand.set( sand.head().str, peers = new $mol_wire_dict )
			
			let sands = peers.get( sand.lord().str )
			if( !sands ) peers.set( sand.lord().str, sands = new $mol_wire_dict )
			
			const prev = sands.get( sand.self().str )
			if( $hyoo_crus_unit_seal.compare( prev, sand ) <= 0 ) return
			
			sands.set( sand.self().str, sand )
			
			const peer = sand.lord().peer()
			this.faces.peer_time( peer.str, sand.time(), sand.tick() )
			if( !prev ) this.faces.peer_summ_shift( peer.str, +1 )
			
		}
		
		seal_del( seal: $hyoo_crus_unit_seal ) {
			
			const shot = seal.shot()
			if( !this._seal_shot.has( shot.str ) ) return
			
			this._seal_shot.delete( shot.str )
			this.faces.peer_summ_shift( seal.lord().peer().str, -1 )
			
			for( const hash of seal.hash_list() ) {
				if( this._seal_item.get( hash.str ) === seal ) {
					this._seal_item.delete( hash.str )
				}
			}
			
		}
		
		gift_del( gift: $hyoo_crus_unit_gift ) {
			
			const prev = this._gift.get( gift.mate().str )
			if( prev !== gift ) return
			
			this._gift.delete( gift.mate().str  )
			this.faces.peer_summ_shift( gift.lord().peer().str, -1 )
			
		}
		
		sand_del( sand: $hyoo_crus_unit_sand ) {
			
			const peers = this._sand.get( sand.head().str )
			if( !peers ) return
			
			const sands = peers.get( sand.lord().str )
			if( !sands ) return
			
			const prev = sands.get( sand.self().str )
			if( prev !== sand ) return
			
			sands.delete( sand.self().str )
			this.faces.peer_summ_shift( sand.lord().peer().str, -1 )
			
		}
		
		lord_pass( lord: $hyoo_crus_link ) {
			return this._pass.get( lord.str ) ?? null
		}
		
		unit_seal( unit: $hyoo_crus_unit ) {
			
			const seal = this._seal_item.get( unit.hash().str )
			if( !seal ) return null
			
			if( seal.lord().str != unit.lord().str ) return null
			
			return seal
		}
		
		sand_get( head: $hyoo_crus_link, lord: $hyoo_crus_link, self: $hyoo_crus_link ) {
			return this._sand.get( head.str )?.get( lord.str )?.get( self.str ) ?? null
		}
		
		_self_all = new $mol_wire_dict< string, $hyoo_crus_unit_sand | null >()
		
		/** Generates unique local id base on optional idea number or random. */
		@ $mol_action
		self_make( idea = Math.floor( Math.random() * 2**48 ) ): $hyoo_crus_link {
			
			const auth = this.auth()
			const rank = this.pass_rank( auth.pass() )
			
			if( rank < $hyoo_crus_rank_tier.post ) $mol_fail( new Error( `Rank too low (${ rank })` ) )
			
			for( let i = 0; i < 4096; ++i ) {
				
				idea = $mol_hash_numbers([ idea ])
				if( !idea ) continue
				
				const idea_link = $hyoo_crus_link.from_int( idea )
				if( /[æÆ]/.test( idea_link.str ) ) continue
				if( this._self_all.has( idea_link.str ) ) continue
				
				this._self_all.set( idea_link.str, null )
				return idea_link
				
			}
			
			$mol_fail( new Error( `Too long self generation` ) )
		}
		
		/** Land where Lord is King. Should contains only main info */
		home() {
			return this.Data( $hyoo_crus_home )
		}
		
		/** Makes new Area based on Idea or random. Once transfers rights from this Land. */
		@ $mol_action
		area_make( idea = Math.floor( Math.random() * 2**48 ) ) {
			
			this.saving()
			
			let id = ''
			while( true ) {
				
				idea = $mol_hash_numbers([ idea ])
				if( !idea ) continue
				
				id = $hyoo_crus_link.from_int( idea ).str
				if( /[æÆ]/.test( id ) ) continue
				
				break
			}
			
			const link = new $hyoo_crus_link( this.link().lord().str + '_' + id )
			
			const area = this.$.$hyoo_crus_glob.Land( link )
			const units = new Set< $hyoo_crus_unit >()
			
			for( const gift of this._gift.values() ) {
				
				// const clone = $hyoo_crus_gift.from( gift )
				// $hyoo_crus_unit_trusted.add( clone )
				
				// clone._land = area
				units.add( gift )
				const seal = this.unit_seal( gift )!
				if( seal ) units.add( seal )
				units.add( this.lord_pass( gift.lord() )! )
				const mate = gift.mate()
				if( mate.str ) units.add( this.lord_pass( mate )! )
				
			}
			area.diff_apply( [ ... units ] )
			
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
					land: ()=> this,//.sync(),
					head: $mol_const( head ),
				}) as InstanceType< Node >
			} )
		} 
		
		/** Total count of Units inside Land. */
		@ $mol_mem
		total() {
			
			let total = this._gift.size + this._seal_item.size
			
			for( const peers of this._sand.values() ) {
				for( const units of peers.values() ) {
					total += units.size
				}
			}
			
			return total
		}
		
		@ $mol_mem
		king_pass() {
			return this.lord_pass( this.link().lord() )!
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
		
		lord_tier( lord: $hyoo_crus_link ) {
			return $hyoo_crus_rank_tier_of( this.lord_rank( lord ) )
		}
		
		lord_rate( lord: $hyoo_crus_link ) {
			return $hyoo_crus_rank_rate_of( this.lord_rank( lord ) )
		}
		
		/** Rights level of Lord for Land. Works only when Pass for Lord exists in Land. */
		lord_rank( lord: $hyoo_crus_link, next?: typeof $hyoo_crus_rank.Value ) {
			
			if( lord.str === this.link().lord().str ) return $hyoo_crus_rank_rule
			
			if( next === undefined ) {
				return this._gift.get( lord.str )?.rank()
					?? this._gift.get( $hyoo_crus_link.hole.str )?.rank()
					?? ( this.encrypted() ? $hyoo_crus_rank_deny : $hyoo_crus_rank_read )
				
			}
			
			const pass = this.lord_pass( lord )
			if( !pass ) $mol_fail( new Error( `No Pass for ${ lord }` ) )
			
			return this.pass_rank( pass, next )
			
		}
		
		/** Picks units between Face and current state. */
		diff_units( skip_faces = new $hyoo_crus_face_map ): $hyoo_crus_unit[] {
			
			this.loading()
			
			const skipped = new Map< string, Set< $hyoo_crus_unit_base > >()
			const delta = new Set< $hyoo_crus_unit_base >()
			const passes = new Set< $hyoo_crus_auth_pass >()
			
			function collect( unit: $hyoo_crus_unit_base ) {
				
				const peer = unit.lord().peer().str
				const face_limit = skip_faces.get( peer )?.time_tick ?? 0
				
				if( unit.time_tick() > face_limit ) return delta.add( unit )

				const skipped_units = skipped.get( peer )
				
				if( skipped_units ) skipped_units.add( unit )
				else skipped.set( peer, new Set([ unit ]) )
			
			}
			
			
			for( const seal of this._seal_item.values() ) collect( seal )
			for( const gift of this._gift.values() ) {
				collect( gift )
				if( gift.mate().str ) {
					if( skip_faces.has( gift.lord().peer().str ) ) continue
					const mate_pass = this.lord_pass( gift.mate() )
					if( mate_pass ) passes.add( mate_pass )
				}
			}
			
			for( const kids of this._sand.values() ) {
				for( const peers of kids.values() ) {
					for( const sand of peers.values() ) collect( sand )
				}
			}
			
			// detect Unit absence and then restore all for Peer
			for( const [ peer, face ] of skip_faces ) {
				
				const skipped_units = skipped.get( peer )
				
				const mass = skipped_units?.size ?? 0
				if( mass <= face.summ ) continue
				
				if( skipped_units ) for( const unit of skipped_units ) delta.add( unit )
				
			}
			
			for( const unit of delta ) {
				if( skip_faces.has( unit.lord().peer().str ) ) continue
				passes.add( this.lord_pass( unit.lord() )! )
			}
			
			return [ ... passes, ... delta ]
			
		}
		
		/** Makes binary Delta between Face and current state. */
		diff_pack( faces = new $hyoo_crus_face_map ): $hyoo_crus_pack | null {
			
			const units = this.diff_units( faces )
			if( !units.length ) return null
			
			return $hyoo_crus_pack.make([[
				this.link().str,
				new $hyoo_crus_pack_part( units )
			]])
			
		}
		
		@ $mol_action
		face_pack(): $hyoo_crus_pack {
			return $hyoo_crus_pack.make([[
				this.link().str,
				new $hyoo_crus_pack_part( [], this.faces.clone() ),
			]])
		}
		
		/** Applies Diff to current state with verification. */
		@ $mol_action
		diff_apply( units: readonly $hyoo_crus_unit[], skip_load?: 'skip_load' ) {
			
			if( units.length === 0 ) return
			
			if( !skip_load ) this.loading()
			
			units = $mol_wire_sync( this.$ ).$hyoo_crus_unit_sort( units )
			
			const passes = new Map< string/*Lord*/, $hyoo_crus_auth_pass >()
			
			const mixin_area = this.link().toBin()
			const mixin_lord = this.link().lord().toBin()
			
			for( const unit of units ) {
				if( unit instanceof $hyoo_crus_auth_pass ) {
					passes.set( unit.hash().str, unit )
				}
			}
			
			for( const unit of units ) {
				if( unit instanceof $hyoo_crus_unit_seal ) {
					
					const lord_pass = this.lord_pass( unit.lord() ) ?? passes.get( unit.lord().str )
					if( !lord_pass ) return this.$.$mol_fail( new Error( `No Pass for Lord`, { cause: unit.lord() } ) )
					
					if( !this.$.$hyoo_crus_unit_trusted_check( unit ) ) {
					
						const mixin = unit.wide() ? mixin_lord : mixin_area
						const sens = unit.shot().mix( mixin )
						
						const checked = $mol_wire_sync( lord_pass ).verify( sens, unit.sign() )
						if( !checked ) return $mol_fail( new Error( `Wrong Sign` ) )
						
						$hyoo_crus_unit_trusted_grant( unit )
						
					}
					
				}
			}
			
			for( const unit of units ) {
				
				if( unit instanceof $hyoo_crus_auth_pass ) continue
				
				if( this.lord_tier( unit.lord() ) < unit.tier_min() ) {
					return this.$.$mol_fail( new Error( 'Too low Tier' ) )
				}
				
				switch( unit.kind() ) {
					
					case 'seal': {
						
						const seal = unit as $hyoo_crus_unit_seal
						
						if( this.lord_rate( unit.lord() ) < seal.rate_min() ) {
							return this.$.$mol_fail( new Error( 'Too low Rate' ) )
						}
				
						const lord_pass = this.lord_pass( seal.lord() ) ?? passes.get( seal.lord().str )
						if( !lord_pass ) return this.$.$mol_fail( new Error( `No Pass for Lord`, { cause: unit.lord() } ) )
						
						this.seal_add( seal )
						this.pass_add( lord_pass )
						
						break
					}
					
					case 'gift': {
						
						const gift = unit as $hyoo_crus_unit_gift
						
						if( !this.$.$hyoo_crus_unit_trusted_check( gift ) ) {
							const seal = this.unit_seal( gift )
							if( !seal ) return this.$.$mol_fail( new Error( `No Seal for Gift`, { cause: gift } ) )
						}
						
						if( gift.mate().str ) {
							
							const mate_pass = this.lord_pass( gift.mate() ) ?? passes.get( gift.mate().str )
							if( !mate_pass ) return this.$.$mol_fail( new Error( `No Pass for Mate`, { cause: gift } ) )
							
							this.pass_add( mate_pass )
							
						}
						
						this.gift_add( gift )
						
						break
					}
					
					case 'sand': {
						
						const sand = unit as $hyoo_crus_unit_sand
						
						if( !this.$.$hyoo_crus_unit_trusted_check( sand ) ) {
							const seal = this.unit_seal( sand )
							if( !seal ) return this.$.$mol_fail( new Error( `No Seal for Sand` ) )
						}
						
						this.sand_add( sand )
						
						break
					}
					
					default: {
						return this.$.$mol_fail( new Error( `Unsupported Kind` ) )
					}
					
				}
				
			}
			
			return units
		}
		
		apply_land( land: $hyoo_crus_land ) {
			return this.diff_apply( land.diff_units() )
		}
		
		rank_audit() {
			
			start: while( true ) {
			
				for( const [ shot, seal ] of this._seal_shot ) {
					
					const rank = this.lord_rank( seal.lord() )
					if( rank >= seal.rank_min() ) continue
					
					this.seal_del( seal )
					
				}
				
				for( const [ lord, gift ] of this._gift ) {
					
					// if( this.unit_seal( gift ) ) {
						const tier = this.lord_tier( gift.lord() )
						if( tier >= gift.tier_min() ) continue
					// }
					
					this.gift_del( gift )
					
					continue start
				}
				
				for( const [ head, peers ] of this._sand ) {
					for( const [ peer, sands ] of peers ) {
						for( const [ self, sand ] of sands ) {
							
							const tier = this.lord_tier( sand.lord() )
							if( tier >= sand.tier_min() ) continue
							
							this.sand_del( sand )
							
						}
					}
				}
			
				break
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
				? [ ... this._sand.get( head.str )?.get( peer!.str )?.values() ?? [] ]
				: [ ... this._sand.get( head.str )?.values() ?? [] ].flatMap( units => [ ... units.values() ] )
			
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
			
			const compare = ( left: $hyoo_crus_unit_sand, right: $hyoo_crus_unit_sand )=> {
				return ( slices.get( left ) - slices.get( right ) ) || $hyoo_crus_unit_sand.compare( left, right )
			}
			
			queue.sort( compare )
			
			let entry = {
				sand: null as null | $hyoo_crus_unit_sand,
				next: '',
				prev: '',
			}
			
			const key = peer === null ? ( sand: $hyoo_crus_unit_sand )=> sand.path() : ( sand: $hyoo_crus_unit_sand )=> sand.self().str
			
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
			
			const res = [] as $hyoo_crus_unit_sand[]
			
			while( entry.next ) {
				entry = by_key.get( entry.next )!
				res.push( entry.sand! )
			}
			
			return res
		}
		
		@ $mol_mem
		@ $mol_action
		join() {
			this.encrypted( this.encrypted() )
		}
		
		/**
		 * Gives access rights to Lord by Auth key.
		 * `null` - gives rights for all Peers.
		 */
		@ $mol_action
		give(
			mate_pass: $hyoo_crus_auth_pass | null,
			rank: typeof $hyoo_crus_rank.Value,
		) {
			
			this.join()
			
			const gift = $hyoo_crus_unit_gift.make()
			const lord_pass = this.auth().pass()
			
			gift._land = this
			
			gift.lord( lord_pass.lord() )
			gift.rank( rank )
			gift.time_tick( this.faces.tick().time_tick )
			
			if( mate_pass ) gift.mate( mate_pass.lord() )
			
			if( rank >= $hyoo_crus_rank_read ) {
				
				const secret_land = this.secret()
				if( secret_land ) {
					
					if( !mate_pass ) return $mol_fail( new Error( `Encrypted land can't be shared to everyone` ) )
					
					const secret_mutual = this.auth().secret_mutual( mate_pass )
					if( secret_mutual ) {
						const code = $mol_wire_sync( secret_mutual ).close( secret_land, gift.salt() )
						gift.code().set( code )
					}
					
				}
				
			}
			
			$hyoo_crus_unit_trusted_grant( gift )
			
			this.diff_apply( [ lord_pass, ... $mol_maybe( mate_pass ), gift ] )
			
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
			tag: keyof typeof $hyoo_crus_unit_sand_tag = 'term',
		) {
			
			this.join()
			
			if( vary instanceof $hyoo_crus_link ) vary = vary.relate( this.link() )
			
			const lord_pass = this.auth().pass()
			const encrypted = this.encrypted()
			
			let { tip, bin } = $hyoo_crus_vary_encode( vary )
			
			const length = encrypted ? Math.ceil( ( bin.byteLength + 1 ) / 16 ) * 16 : bin.byteLength
			const sand = $hyoo_crus_unit_sand.make( length )
			
			sand._open = bin
			sand._land = this
			
			$hyoo_crus_unit_trusted_grant( sand )
			
			sand.hint( tip, tag )
			sand.time_tick( this.faces.tick().time_tick )
			sand.lord( lord_pass.lord() )
			sand.lead( lead )
			sand.head( head )
			sand._vary = vary
			
			sand.self( self.str ? self : this.self_make( sand.idea() ) )
			
			this.diff_apply( [ lord_pass, sand ] )
			
			this.broadcast()
			return sand
		}
		
		@ $mol_action
		sand_move(
			sand: $hyoo_crus_unit_sand,
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
			sand: $hyoo_crus_unit_sand,
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
			return new this.$.$mol_bus< ArrayBuffer >(
				`$hyoo_crus_land:${ this.link() }`,
				$mol_wire_async( buf => {
					
					const pack = new $hyoo_crus_pack( buf )
					const part = new Map( pack.parts() ).get( this.link().str )!
					
					for( const unit of part.units ) {
						$hyoo_crus_unit_trusted_grant( unit )
						this.mine().units_persisted.add( unit )
					}
					
					this.diff_apply( part.units )
					
				} ),
			)
		}
		
		@ $mol_mem
		loading() {
			
			let units = $mol_wire_sync( this.mine() ).units_load()
			
			if( this.$.$hyoo_crus_log() ) $mol_wire_sync( this.$ ).$mol_log3_rise({
				place: this,
				message: '🌱 Load Unit',
				units: units,
			})
			
			$mol_wire_sync( this ).diff_apply( units, 'skip_load' )
			
		}
		
		@ $mol_mem
		saving() {
			
			this.loading()
			
			const mine = this.mine()
			
			const encoding = [] as $hyoo_crus_unit_sand[]
			const signing = [] as $hyoo_crus_unit_base[]
			const persisting = [] as $hyoo_crus_unit[]
			
			const check_lord = ( lord: $hyoo_crus_link )=> {
				
				const pass = this.lord_pass( lord )
				if( !pass ) return
				
				if( mine.units_persisted.has( pass ) ) return
				
				persisting.push( pass )
				mine.units_persisted.add( pass )
				
			}
			
			for( const gift of this._gift.values() ) {
				
				if( mine.units_persisted.has( gift ) ) continue
				
				if( !this.unit_seal( gift ) ) signing.push( gift )
				
				persisting.push( gift )
				mine.units_persisted.add( gift )
				
				check_lord( gift.lord() )
				check_lord( gift.mate() )
				
			}
			
			for( const kids of this._sand.values() ) {
				for( const units of kids.values() ) {
					for( const sand of units.values() ) {
						
						if( mine.units_persisted.has( sand ) ) continue
						
						if( !this.unit_seal( sand ) ) {
							encoding.push( sand )
							signing.push( sand )
						}
						
						persisting.push( sand )
						mine.units_persisted.add( sand )
						
						check_lord( sand.lord() )
				
					}
				}
			}
			
			if( !persisting ) return
			
			this.save( encoding, signing, persisting )
		
		}
		
		async save(
			encoding: $hyoo_crus_unit_sand[],
			signing: $hyoo_crus_unit_base[],
			persisting: $hyoo_crus_unit[],
		) {
			
			const mine = this.mine()
			
			await Promise.all( encoding.map( unit => this.sand_encode( unit ) ) )
			const seals = signing.length ? await this.units_sign( signing ) : []
			persisting = [ ... persisting, ... seals ]
			
			if( persisting.length )	{
				
				const part =  new $hyoo_crus_pack_part( persisting )
				const pack = $hyoo_crus_pack.make([[ this.link().str, part ]])
				this.bus().send( pack.buffer )
				
				await $mol_wire_async( mine ).units_save({ ins: persisting, del: [] })
			
				if( this.$.$hyoo_crus_log() ) this.$.$mol_log3_done({
					place: this,
					message: '💾 Saved Units',
					units: persisting,
				})

			}
			
			for( const seal of seals ) this.seal_add( seal )
			
		}
		
		async units_sign( units: readonly $hyoo_crus_unit_base[] ) {
			
			const auth = this.auth()
			const rate = $hyoo_crus_rank_rate_of( this.pass_rank( auth.pass() ) )
			const wide = Boolean( this.link().area().str )
			
			const threads = $mol_array_chunks( units, 14 ).map( async( units )=> {
				
				const seal = $hyoo_crus_unit_seal.make( units.length, wide )
				
				seal.time_tick( this.faces.tick().time_tick )
				seal.lord( auth.pass().lord() )
				seal.hash_list( units.map( unit => unit.hash() ) )
				
				const shot = seal.shot().mix( this.link() )
				do {
					seal.sign( await auth.sign( shot ) )
				} while( seal.rate_min() > rate )
				
				return seal
			} )
			
			return Promise.all( threads )
			
		}
		
		async sand_encode( sand: $hyoo_crus_unit_sand ) {
			
			if( sand._open === null ) return sand
			if( sand.tip() === 'nil' ) return sand
			
			let bin = sand._open
			const secret = sand._land!.secret()!
			
			if( secret ) bin = await secret.encrypt( bin, sand.salt() )
			
			sand.ball( bin )
			
			return sand
		}
		
		@ $mol_mem_key
		sand_decode( sand: $hyoo_crus_unit_sand ): $hyoo_crus_vary_type {
			
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
		sand_decode_raw( sand: $hyoo_crus_unit_sand ): $hyoo_crus_vary_type {
			
			if( this.sand_get( sand.head(), sand.lord(), sand.self() ) !== sand ) {
				for( const id of this.Tine().items_vary() ?? [] ) {
					const vary = this.$.$hyoo_crus_glob.Land( $hyoo_crus_vary_cast_link( id! )! ).sand_decode_raw( sand )
					if( vary !== undefined ) return vary
				}
				return undefined!
			}
			
			const secret = this.secret()
			
			if( sand._vary !== undefined ) return sand._vary
			if( sand._open !== null ) return sand._vary = $hyoo_crus_vary_decode({ tip: sand.tip(), bin: sand._open })
			
			let bin = sand.size() > $hyoo_crus_unit_sand.size_equator ? $mol_wire_sync( this.mine() ).ball_load( sand.path() ) : sand.data()
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
			return !this._sand.size
		}
		
		@ $mol_mem
		encrypted( next?: boolean ) {
			
			$mol_wire_solid()
			
			const gift = this._gift.get( this.link().str )
			const prev = gift?.code_exists() ?? false
			
			if( next === undefined ) return prev
			
			if( this.faces.size ) {
				if( prev === next ) return prev
				$mol_fail( new Error( `Change encryption is forbidden` ) )
			}
			
			const auth = this.auth()
			
			const unit = $mol_wire_sync( $hyoo_crus_unit_gift ).make()
			$hyoo_crus_unit_trusted_grant( unit )
			
			unit.rank( $hyoo_crus_rank_rule )
			unit.time_tick( this.faces.tick().time_tick )
			unit.lord( auth.pass().lord() )
			unit.mate( auth.pass().lord() )
			unit._land = this
			
			if( next ) {
				const secret = $mol_wire_sync( $mol_crypto_sacred ).make()
				const secret_mutual = auth.secret_mutual( auth.public() )
				const secret_closed = $mol_wire_sync( secret_mutual ).close( secret, unit.salt() )
				unit.code().set( secret_closed )
			}
			
			this.diff_apply( [ auth.pass(), unit ] )
			
			return next
		}
		
		@ $mol_mem
		secret() {
			
			if( !this.encrypted() ) return null
			
			const auth = this.auth()
			const gift = this._gift.get( auth.pass().lord().str )
			if( !gift ) return $mol_fail( new Error( `Access denied` ) )
			
			if( !gift.code_exists() ) return $mol_fail( new Error( `No key to decrypt` ) )
			
			const secret_mutual = auth.secret_mutual( this.lord_pass( gift.lord() )! )
			if( !secret_mutual ) return $mol_fail( new Error( `Can't decrypt secret` ) )
			
			return new $mol_crypto_sacred( $mol_wire_sync( secret_mutual ).open( gift.code(), gift.salt() ).buffer )
			
		}
		
		dump() {
			
			this.saving()
			
			const units = [] as $hyoo_crus_unit_base[]
			const rocks = [] as [ string, Uint8Array< ArrayBuffer > ][]
			
			for( const gift of this._gift.values() ) units.push( gift )
			
			for( const heads of this._sand.values() ) {
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
				$mol_dev_format_auto( this.faces.stat ),
		 	)
		 }
		
	}
	
}
