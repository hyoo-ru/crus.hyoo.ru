namespace $ {
	/** Whole global graph database which contains Lands. */
	export class $hyoo_crus_glob extends $mol_object {
		
		static lands_touched = new $mol_wire_set< string >()
		/** @deprecated Use `this.$.$hyoo_crus_glob` */
		lands_touched = ( this.constructor as typeof $hyoo_crus_glob ).lands_touched
		
		/** Glob synchronizer. */
		@ $mol_mem
		static yard() {
			return new this.$.$hyoo_crus_yard
		}
		
		/** @deprecated Use `this.$.$hyoo_crus_glob` */
		yard() {
			return this.$.$hyoo_crus_glob.yard()
		}
		
		/** Land where Lord is King. Contains only ain info */
		static home< Node extends typeof $hyoo_crus_home = typeof $hyoo_crus_home >( Node?: Node ) {
			return this.Land( this.$.$hyoo_crus_auth.current().lord() ).Data( Node ?? $hyoo_crus_home ) as InstanceType< Node >
		}
		
		/** @deprecated Use `this.$.$hyoo_crus_glob` */
		home() {
			return this.$.$hyoo_crus_glob.home()
		}
		
		@ $mol_action
		static king_grab( preset : $hyoo_crus_rank_preset = { '': $hyoo_crus_rank_read } ) {
			
			const king = this.$.$hyoo_crus_auth.grab()
			const colony = ( $mol_wire_sync( $hyoo_crus_land ) as typeof $hyoo_crus_land ).make({ $: this.$ })
			colony.auth = $mol_const( king )
			
			if( ( preset[''] ?? $hyoo_crus_rank_deny ) === $hyoo_crus_rank_deny ) {
				colony.encrypted( true )
			}
			
			const self = this.$.$hyoo_crus_auth.current()
			colony.give( self, $hyoo_crus_rank_rule )
			
			for( const key in preset ) colony.give( key ? $hyoo_crus_auth.from( key ) : null, preset[ key ] )
			
			this.Land( colony.link() ).apply_unit( colony.delta_unit() )
			
			return king
		}
		
		/** @deprecated Use `this.$.$hyoo_crus_glob` */
		king_grab( preset : $hyoo_crus_rank_preset = { '': $hyoo_crus_rank_read } ) {
			return this.$.$hyoo_crus_glob.king_grab( preset )
		}
		
		@ $mol_action
		static land_grab( preset : $hyoo_crus_rank_preset = { '': $hyoo_crus_rank_read } ) {
			return this.Land( this.king_grab( preset ).lord() )
		}
		
		/** @deprecated Use `this.$.$hyoo_crus_glob` */
		land_grab( preset : $hyoo_crus_rank_preset = { '': $hyoo_crus_rank_read } ) {
			return this.$.$hyoo_crus_glob.land_grab( preset )
		}
		
		/** Standalone part of Glob which syncs separately, have own rights, and contains Units */
		@ $mol_mem_key
		static Land( link: $hyoo_crus_link ): $hyoo_crus_land {
			this.lands_touched.add( link.str )
			return $hyoo_crus_land.make({
				link: $mol_const( link ),
			})
		}
		
		/** @deprecated Use `this.$.$hyoo_crus_glob` */
		Land( link: $hyoo_crus_link ) {
			return this.$.$hyoo_crus_glob.Land( link )
		}
		
		/** High level representation of stored data. */
		static Node< Node extends typeof $hyoo_crus_node > ( link: $hyoo_crus_link, Node: Node ) {
			const land = this.Land( link.land() )
			return land.Node( Node ).Item( link.head() )
		}
		
		/** @deprecated Use `this.$.$hyoo_crus_glob` */
		Node< Node extends typeof $hyoo_crus_node > ( link: $hyoo_crus_link, Node: Node ) {
			return this.$.$hyoo_crus_glob.Node( link, Node )
		}
		
		@ $mol_action
		static apply_pack( pack: $hyoo_crus_pack ) {
			const { lands, rocks } = pack.parts()
			return this.apply_parts( lands, rocks )
		}
		
		/** @deprecated Use `this.$.$hyoo_crus_glob` */
		apply_pack( pack: $hyoo_crus_pack ) {
			return this.$.$hyoo_crus_glob.apply_pack( pack )
		}
		
		@ $mol_action
		static apply_parts(
			lands: Record< string, {
				faces: $hyoo_crus_face_map
				units: $hyoo_crus_unit[]
			}>,
			rocks: [ string, Uint8Array | null ][],
		) {
			
			for( const land of Reflect.ownKeys( lands ) as string[] ) {
				
				const errors = this.Land( new $hyoo_crus_link( land ) ).apply_unit( lands[ land ].units ).filter( Boolean )
				
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
		
	}
	
}
