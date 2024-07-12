namespace $ {
	/** Whole global graph database which contains Lands. */
	export class $hyoo_crus_realm extends $mol_object {
		
		static lands_touched = new $mol_wire_set< $hyoo_crus_ref >()
		/** @deprecated Use `this.$.$hyoo_crus_realm` */
		lands_touched = $hyoo_crus_realm.lands_touched
		
		/** Realm synchronizer. */
		@ $mol_mem
		static yard() {
			return new this.$.$hyoo_crus_yard
		}
		
		/** @deprecated Use `this.$.$hyoo_crus_realm` */
		yard() {
			return this.$.$hyoo_crus_realm.yard()
		}
		
		/** Land where Lord is King. Contains only ain info */
		static home() {
			return this.Land( this.$.$hyoo_crus_auth.current().lord() ).home()
		}
		
		/** @deprecated Use `this.$.$hyoo_crus_realm` */
		home() {
			return this.$.$hyoo_crus_realm.home()
		}
		
		@ $mol_action
		static king_grab( preset : $hyoo_crus_rank_preset = { '': $hyoo_crus_rank.get } ) {
			
			const king = this.$.$hyoo_crus_auth.grab()
			const colony = ( $mol_wire_sync( $hyoo_crus_land ) as typeof $hyoo_crus_land ).make({ $: this.$ })
			colony.auth = $mol_const( king )
			
			if( ( preset[''] ?? $hyoo_crus_rank.nil ) === $hyoo_crus_rank.nil ) {
				colony.encrypted( true )
			}
			
			const self = this.$.$hyoo_crus_auth.current()
			colony.give( self, $hyoo_crus_rank.law )
			
			for( const key in preset ) colony.give( key ? $hyoo_crus_auth.from( key ) : null, preset[ key ] )
			
			this.Land( colony.ref() ).apply_unit_trust( colony.delta_unit() )
			
			return king
		}
		
		/** @deprecated Use `this.$.$hyoo_crus_realm` */
		king_grab( preset : $hyoo_crus_rank_preset = { '': $hyoo_crus_rank.get } ) {
			return this.$.$hyoo_crus_realm.king_grab( preset )
		}
		
		@ $mol_action
		static land_grab( preset : $hyoo_crus_rank_preset = { '': $hyoo_crus_rank.get } ) {
			return this.Land( this.king_grab( preset ).lord() )
		}
		
		/** @deprecated Use `this.$.$hyoo_crus_realm` */
		land_grab( preset : $hyoo_crus_rank_preset = { '': $hyoo_crus_rank.get } ) {
			return this.$.$hyoo_crus_realm.land_grab( preset )
		}
		
		/** Standalone part of Realm which syncs separately, have own rights, and contains Units */
		@ $mol_mem_key
		static Land( ref: $hyoo_crus_ref ): $hyoo_crus_land {
			this.lands_touched.add( ref )
			return $hyoo_crus_land.make({
				ref: $mol_const( ref ),
			})
		}
		
		/** @deprecated Use `this.$.$hyoo_crus_realm` */
		Land( ref: $hyoo_crus_ref ) {
			return this.$.$hyoo_crus_realm.Land( ref )
		}
		
		/** High level representation of stored data. */
		static Node< Node extends typeof $hyoo_crus_node > ( ref: $hyoo_crus_ref, Node: Node ) {
			const land = this.Land( $hyoo_crus_ref_land( ref ) )
			return land.Node( Node ).Item( $hyoo_crus_ref_head( ref ) )
		}
		
		/** @deprecated Use `this.$.$hyoo_crus_realm` */
		Node< Node extends typeof $hyoo_crus_node > ( ref: $hyoo_crus_ref, Node: Node ) {
			return this.$.$hyoo_crus_realm.Node( ref, Node )
		}
		
		@ $mol_action
		static apply_pack( pack: $hyoo_crus_pack ) {
			const { lands, rocks } = pack.parts()
			return this.apply_parts( lands, rocks )
		}
		
		/** @deprecated Use `this.$.$hyoo_crus_realm` */
		apply_pack( pack: $hyoo_crus_pack ) {
			return this.$.$hyoo_crus_realm.apply_pack( pack )
		}
		
		@ $mol_action
		static apply_parts(
			lands: Record< $hyoo_crus_ref, {
				faces: $hyoo_crus_face_map
				units: $hyoo_crus_unit[]
			}>,
			rocks: [ Uint8Array, Uint8Array | null ][],
		) {
			
			for( const land of Reflect.ownKeys( lands ) as $hyoo_crus_ref[] ) {
				
				const errors = this.Land( land ).apply_unit( lands[ land ].units ).filter( Boolean )
				
				for( const error of errors ) this.$.$mol_log3_warn({
					place: `${this}.apply_pack()`,
					message: error,
					hint: 'Send it to developer',
				})
				
			}
			
			for( const [ hash, rock ] of rocks ) {
				if( !rock ) continue
				this.$.$hyoo_crus_mine.rock_save( rock )
			}

		}
		
		/** @deprecated Use `this.$.$hyoo_crus_realm` */
		apply_parts(
			lands: Record< $hyoo_crus_ref, {
				faces: $hyoo_crus_face_map
				units: $hyoo_crus_unit[]
			}>,
			rocks: [ Uint8Array, Uint8Array | null ][],
		) {
			return this.$.$hyoo_crus_realm.apply_parts( lands, rocks )
		}
		
	}
	
}
