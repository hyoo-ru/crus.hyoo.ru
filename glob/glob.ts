namespace $ {
	/** Whole global graph database which contains Lands. */
	export class $hyoo_crus_glob extends $mol_object {
		
		static lands_touched = new $mol_wire_set< string >()
		
		/** Glob synchronizer. */
		@ $mol_mem
		static yard() {
			return new this.$.$hyoo_crus_yard
		}
		
		/** Land where Lord is King. Contains only ain info */
		static home< Node extends typeof $hyoo_crus_home = typeof $hyoo_crus_home >( Node?: Node ) {
			return this.Land( this.$.$hyoo_crus_auth.current().pass().lord() ).Data( Node ?? $hyoo_crus_home ) as InstanceType< Node >
		}
		
		@ $mol_action
		static king_grab( preset : $hyoo_crus_rank_preset = [[ null, $hyoo_crus_rank_read ]] ) {
			
			const mapping = new Map( preset )
			
			const king = this.$.$hyoo_crus_auth.grab()
			const colony = ( $mol_wire_sync( $hyoo_crus_land ) as typeof $hyoo_crus_land ).make({ $: this.$ })
			colony.auth = $mol_const( king )
			
			colony.encrypted( ( mapping.get( null ) ?? $hyoo_crus_rank_deny ) === $hyoo_crus_rank_deny )
			
			const self = this.$.$hyoo_crus_auth.current().pass()
			colony.give( self, $hyoo_crus_rank_rule )
			
			for( const [ key, rank ] of mapping ) colony.give( key, rank )
			
			this.Land( colony.link() ).diff_apply( colony.diff_units() )
			
			return king
		}
		
		@ $mol_action
		static land_grab( preset : $hyoo_crus_rank_preset = [[ null, $hyoo_crus_rank_read ]] ) {
			return this.Land( this.king_grab( preset ).pass().lord() )
		}
		
		/** Standalone part of Glob which syncs separately, have own rights, and contains Units */
		@ $mol_mem_key
		static Land( link: $hyoo_crus_link ): $hyoo_crus_land {
			this.lands_touched.add( link.str )
			return $hyoo_crus_land.make({
				link: $mol_const( link ),
			})
		}
		
		/** High level representation of stored data. */
		static Node< Node extends typeof $hyoo_crus_node > ( link: $hyoo_crus_link, Node: Node ) {
			const land = this.Land( link.land() )
			return land.Node( Node ).Item( link.head() )
		}
		
		@ $mol_action
		static apply_pack( pack: $hyoo_crus_pack ) {
			return this.apply_parts( pack.parts() )
		}
		
		@ $mol_action
		static apply_parts( parts: $hyoo_crus_pack_parts ) {
			
			for( const [ land_id, part ] of parts ) {
				const land = this.Land( new $hyoo_crus_link( land_id ) )
				land.diff_apply( part.units )
			}

		}
		
	}
	
}
