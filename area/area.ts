namespace $ {
	
	export class $hyoo_crowds_area extends $mol_object {
		
		land() {
			return null as null | $hyoo_crowds_land
		}
		
		numb() {
			return 0
		}
		
		lord() {
			return this.land()?.lord() ?? this.auth().lord()
		}
		
		realm() {
			return this.land()?.realm() ?? null
		}
		
		auth() {
			return this.$.$hyoo_crowds_auth.current()
		}
		
		@ $mol_mem
		ref() {
			return $hyoo_crowds_ref.make( this.lord(), this.numb(), 0 )
		}
		
		slug() {
			const slug = this.ref().toString().slice( 10 )
			return slug.length < 2 ? 'Base' : slug
			// return this.ref().toString().replace( /^[^_]*_?/, '' ) || 'Base'
		}
		
		pass = new $mol_wire_dict< number /*peer*/, $hyoo_crowds_pass >()
		gift = new $mol_wire_dict< bigint /*lord*/, $hyoo_crowds_gift >()
		gist = new $mol_wire_dict< number /*head*/, $mol_wire_dict< number /*self*/, $hyoo_crowds_gist > >()
		self_all = new Set< number >()
		
		face = new $hyoo_crowds_face

		@ $mol_action
		self_make( idea = Math.floor( Math.random() * 2**48 ) ) {
			for( let i = 0; i < 4096; ++i ) {
				
				idea = ( idea + 1  ) % 2**48
				if( !idea ) continue
				if( this.self_all.has( idea ) ) continue
				
				this.self_all.add( idea )
				return idea
				
			}
			$mol_fail( new Error( `Too long self generation` ) )
		}
		
		@ $mol_mem_key
		Root< Node extends typeof $hyoo_crowds_node >( Node: Node ) {
			return this.Node( Node ).Item( 0 )
		} 
		
		@ $mol_mem_key
		Node< Node extends typeof $hyoo_crowds_node >( Node: Node ) {
			return new $hyoo_crowds_fund( ( head: number )=> Node.make({
				area: $mol_const( this ),
				head: $mol_const( head ),
			}) as InstanceType< Node > )
		} 
		
		@ $mol_mem
		total() {
			let total = this.pass.size + this.gift.size
			for( const units of this.gist.values() ) total += units.size
			return total
		}
		
		@ $mol_mem
		joined_list() {
			return [ ... this.pass.values() ].map( unit => unit.lord() )
		}
		
		@ $mol_mem_key
		lord_rang( lord: bigint ) {
			if( lord === this.lord() ) return $hyoo_crowds_rang.law
			return this.gift.get( lord )?.rang() ?? $hyoo_crowds_rang.get
		}
		
		peer_rang( peer: number ) {
			const auth = this.pass.get( peer )!
			if( !auth ) return $hyoo_crowds_rang.get
			return this.lord_rang( auth.lord() )
		}
		
		/** Picks units between Face and current state. */
		delta_unit( face = new $hyoo_crowds_face ) {
			
			const delta = [] as $hyoo_crowds_unit[]
			
			for( const unit of this.pass.values() ) {
				if( face.get( unit.peer() ) ) continue
				delta.push( unit )
			}
			
			for( const [ lord, unit ] of this.gift ) {
				const time = face.get( Number( lord >> 16n ) )
				if( !time || time < unit.time() ) delta.push( unit )
			}
			
			for( const kids of this.gist.values() ) {
				for( const unit of kids.values() ) {
					const time = face.get( unit.peer() )
					if( !time || time < unit.time() ) delta.push( unit )
				}
			}
			
			return delta
			
		}
		
		/** Makes binary Delta between Face and current state. */
		delta_buffer( face = new $hyoo_crowds_face ) {
			
			const delta = this.delta_unit( face )
			const bytes = new Uint8Array( delta.length * $hyoo_crowds_unit.size )
			
			for( let i = 0; i < delta.length; ++ i ) {
				const unit = delta[ i ]
				bytes.set( unit.asArray(), i * $hyoo_crowds_unit.size )
			}
			
			return bytes
		}
		
		/** Applies Delta to current state. */
		apply_unit( delta: readonly $hyoo_crowds_unit[] ) {
			return delta.map( unit => {
				
				const error = this.check_unit( unit )
				if( error ) return error
				
				let need_recheck = false
				const res = unit.choose({
					
					pass: next => {
						
						const peer = next.peer()
						
						const exists = this.pass.get( peer )
						if( exists ) return 'Already joined'
						
						this.pass.set( peer, next )
						this.face.see_peer( next.peer(), 0 )
						
					},
					
					gift: next => {
						
						const dest = next.dest()
						
						const prev = this.gift.get( dest )
						if( prev && $hyoo_crowds_gift.compare( prev, next ) <= 0 ) return 'Unit too old'
						
						this.gift.set( dest, next )
						this.face.see_peer( Number( dest >> 16n ), next.time() )
						
						if( ( prev?.rang() ?? $hyoo_crowds_rang.get ) > next.rang() ) need_recheck = true
						
					},
					
					gist: next => {
						
						const head = next.head()
						const self = next.self()
						
						let units = this.gist.get( head )
						if( !units ) this.gist.set( head, units = new $mol_wire_dict )
							
						const prev = units.get( self )
						if( prev && $hyoo_crowds_gist.compare( prev, next ) <= 0 ) return 'Unit too old'
						
						units.set( self, next )
						this.self_all.add( self )
						this.face.see_peer( next.peer(), next.time() )
						
					},
					
				})
				
				if( need_recheck ) this.recheck()
				return res ?? ''
				
			})
		}
		
		apply_area( area: $hyoo_crowds_area ) {
			return this.apply_unit( area.delta_unit() )
		}
		
		recheck() {
			
			for( const [ peer, pass ] of this.pass ) {
				if( this.check_unit( pass ) ) this.pass.delete( peer )
			}
			
			for( const [ lord, gift ] of this.gift ) {
				if( this.check_unit( gift ) ) this.gift.delete( lord )
			}
			
			for( const [ head, units ] of this.gist ) {
				for( const [ self, gist ] of units ) {
					if( this.check_unit( gist ) ) units.delete( self )
				}
			}
			
		}
		
		check_unit( unit: $hyoo_crowds_unit ) {
			return unit.choose({
				
				pass: next => this.lord_rang( next.lord() ) < $hyoo_crowds_rang.add ? 'Need add rang to join' : '',
				
				gift: next => this.peer_rang( next.peer() ) < $hyoo_crowds_rang.law ? 'Need law rang to change rang': '',
				
				gist: next => next.peer() === next.self()
					? this.peer_rang( next.peer() ) < $hyoo_crowds_rang.add ? 'Need add rang to post self data' : ''
					: this.peer_rang( next.peer() ) < $hyoo_crowds_rang.mod ? 'Need mod rang to post any data' : '',
				
			})
		}
		
		@ $mol_mem_key
		gists_ordered( head: number ) {
			
			const queue = [ ... this.gist.get( head )?.values() ?? [] ]
			if( queue.length < 2 ) return queue.filter( unit => !unit.nil() )
			
			queue.sort( $hyoo_crowds_gist.compare )
			
			const res = [] as $hyoo_crowds_gist[]
			
			const locate = ( self: number )=> {
				
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
					
					while( res[ index ] && ( $hyoo_crowds_gist.compare( res[ index ], kid ) < 0 ) ) ++ index
					
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
		join() {
			
			const auth = this.auth()
			
			const prev = this.pass.get( auth.peer() )
			if( prev ) return prev
			
			const next = new $hyoo_crowds_pass
			next.auth( auth.public().asArray() )
			
			const error = this.apply_unit([ next ])[0]
			if( error ) $mol_fail( new Error( error ) )
			
			return next
		}
		
		/** Places data to tree. */
		give(
			dest: bigint,
			rang: $hyoo_crowds_rang,
		) {
				
			this.join()
			
			const auth  = this.auth()
			const unit = new $hyoo_crowds_gift
			
			unit.rang( rang )
			unit.time( this.face.tick( auth.peer() ) )
			unit.peer( auth.peer() )
			unit.dest( dest )
			
			const error = this.apply_unit([ unit ])[0]
			if( error ) $mol_fail( new Error( error ) )
			
			return unit
		}
		
		/** Places data to tree. */
		post(
			lead: number,
			head: number,
			self: number,
			data: $hyoo_crowds_vary_type,
			tag = 'term' as keyof typeof $hyoo_crowds_gist_tag,
		) {
			
			this.join()
			const secret = this.secret()
			
			const auth = this.auth()
			const unit = new $hyoo_crowds_gist
			
			unit.time( this.face.tick( auth.peer() ) )
			unit.peer( auth.peer() )
			unit.lead( lead )
			unit.head( head )
			
			let { tip, bin } = $hyoo_crowds_vary_encode( data )
			if( secret ) bin = new Uint8Array( $mol_wire_sync( secret ).encrypt( bin, unit.salt() ) )
			
			if( bin.byteLength > 32 ) unit.hash( this.$.$hyoo_crowds_mine.save( bin ), tip, tag )
			else unit.data( bin, tip, tag )
		
			unit.self( self || ( this.lord_rang( auth.lord() ) >= $hyoo_crowds_rang.mod ? this.self_make( unit.idea() ) : auth.peer() ) )
			
			const error = this.apply_unit([ unit ])[0]
			if( error ) $mol_fail( new Error( error ) )
			
			return unit
		}
		
		gist_move(
			gist: $hyoo_crowds_gist,
			head: number,
			seat: number,
		) {
			
			if( gist.nil() ) $mol_fail( new RangeError( `Can't move wiped gist` ) )
			
			const units = this.gists_ordered( head )
			if( seat > units.length ) $mol_fail( new RangeError( `Seat (${seat}) out of units length (${units.length})` ) )
			
			const lead = seat && units[ seat - 1 ].self()
			
			if( gist.head() === head ) {
				
				const seat_prev = units.indexOf( gist )
				
				if( seat === seat_prev ) return
				if( seat === seat_prev + 1 ) return
				
				const prev = seat_prev && units[ seat_prev - 1 ].self()
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
				this.gist_decode( gist ),
				gist.tag(),
			)
			
		}
		
		gist_wipe( gist: $hyoo_crowds_gist ) {
			
			const units = this.gists_ordered( gist.head() )
			const seat = units.indexOf( gist )
			
			this.post(
				seat && units[ seat - 1 ].self(),
				gist.head(),
				gist.self(),
				null,
				'term',
			)
			
		}
		
		gist_decode( gist: $hyoo_crowds_gist ) {
			let bin = gist.size() > 32 ? this.$.$hyoo_crowds_mine.load( gist.hash() ) : gist.data()
			if( bin && this.secret() ) bin = new Uint8Array( $mol_wire_sync( this.secret()! ).decrypt( bin, gist.salt() ) )
			const vary = bin ? $hyoo_crowds_vary_decode({ tip: gist.tip(), bin }) : null
			return vary
		}
		
		@ $mol_mem_key
		key_public( peer: number ) {
			const key = this.pass.get( peer )?.auth()
			return key ? $mol_crypto_key_public.from( key ) : null
		}
		
		@ $mol_mem_key
		secret_mutual( peer: number ) {
			
			const key = this.key_public( peer )
			if( !key ) return null
			
			return $mol_wire_sync( $mol_crypto_secret ).derive(
				this.auth().toString(),
				key.toString(),
			)
			
		}
		
		@ $mol_action
		encrypt() {
			
			if( !this.numb() ) $mol_fail( new Error( 'Home Area never encrypted' ) )
			if( this.secret() ) return
			
			this.join()
			
			const auth = this.auth()
			const secret = $mol_wire_sync( $mol_crypto_secret ).generate()
			const secret_area = $mol_wire_sync( secret ).serial()
			const secret_mutual = auth.secret_mutual( auth.public().toString() )
			
			const unit = new $hyoo_crowds_gift
			
			unit.rang( $hyoo_crowds_rang.law )
			unit.time( this.face.tick( auth.peer() ) )
			unit.peer( auth.peer() )
			unit.dest( auth.lord() )
			
			const secret_closed = $mol_wire_sync( secret_mutual ).encrypt( secret_area, unit.salt() )
			unit.bill().set( new Uint8Array( secret_closed ) )
			
			const error = this.apply_unit([ unit ])[0]
			if( error ) $mol_fail( new Error( error ) )
			
		}
		
		@ $mol_mem
		secret() {
			
			if( !this.numb() ) return null // home area never encrypted
			
			const auth = this.auth()
			const gift = this.gift.get( auth.lord() )
			if( !gift ) return null
			
			const secret_mutual = auth.secret_mutual( this.key_public( gift.peer() )!.toString() )
			if( !secret_mutual ) return null
			
			const secret_area = $mol_wire_sync( secret_mutual ).decrypt( gift.bill(), gift.salt() )
			return $mol_wire_sync( $mol_crypto_secret ).from( secret_area )
			
		}
		
		;[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {} ,
				$mol_dev_format_native( this ) ,
				' ',
				this.slug(),
			)
		}
		
	}
	
}