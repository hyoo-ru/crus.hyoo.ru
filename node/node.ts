namespace $ {
	
	/** Virtual Node that represents contained units as high-level data types. */
	export class $hyoo_crus_node extends $mol_object {
		
		static tag: keyof typeof $hyoo_crus_sand_tag = 'vals'
		
		/** Standalone part of Glob which syncs separately, have own rights, and contains Units */
		land() {
			return null as any as $hyoo_crus_land
		}
		
		/** Land local Node id */
		head() {
			return $hyoo_crus_link.hole
		}
		
		/** Link to Land/Lord. */
		land_link() {
			return this.land()?.link() ?? this.$.$hyoo_crus_auth.current().lord()
		}
		
		/** Link to Node/Land/Lord. */
		@ $mol_memo.method
		link() {
			return new $hyoo_crus_link( '___' + this.head() ).resolve( this.land_link() )
		}
		
		toJSON() {
			return this.link().str
		}
		
		/** Returns another representation of this node. */
		@ $mol_mem_key
		cast< Node extends typeof $hyoo_crus_node >( Node: Node ): InstanceType< Node > {
			return this.land().Node( Node ).Item( this.head() )
		}
		
		/** Ordered inner alive Node. */
		@ $mol_mem_key
		nodes< Node extends typeof $hyoo_crus_node >( Node: Node | null ): readonly InstanceType< Node >[] {
			const land = this.land()
			const map = {
				term: ()=> land.Node( Node || $hyoo_crus_atom_vary ),
				solo: ()=> land.Node( Node || $hyoo_crus_atom_vary ),
				vals: ()=> land.Node( Node || $hyoo_crus_list_vary ),
				keys: ()=> land.Node( Node || $hyoo_crus_dict ),
			}
			return this.units().map( unit => map[ unit.tag() ]().Item( unit.self() ) ) as any
		}
		
		/** All ordered alive Units */
		units() {
			return this.units_of( $hyoo_crus_link.hole )
		}
		
		@ $mol_mem_key
		units_of( peer: $hyoo_crus_link | null ) {
			return this.land().sand_ordered({ head: this.head(), peer }).filter( unit => unit.tip() !== 'nil' )
		}
		
		filled() {
			return this.units().length > 0
		}
		
		/** Ability to make changes by current peer. */
		can_change() {
			return this.land().lord_rank( this.land().auth().lord() ) >= $hyoo_crus_rank_tier.join
		}
		
		/** Time of last changed unit inside Node subtree */
		@ $mol_mem
		last_change() {
			
			const land = this.land()
			let last = 0
			
			const visit = ( sand: $hyoo_crus_sand )=> {
				if( sand.time() > last ) last = sand.time()
				if( sand.tag() === 'term' ) return
				land.Node( $hyoo_crus_node ).Item( sand.self() ).units().forEach( visit )
			}
			this.units().forEach( visit )
			
			return last ? $hyoo_crus_time_moment( last ) : null
			
		}
		
		/** All author Peers of Node subtree */
		@ $mol_mem
		author_peers() {
			
			const land = this.land()
			const peers = new Set< string >()
			
			const visit = ( sand: $hyoo_crus_sand )=> {
				peers.add( sand.peer().str )
				if( sand.tag() === 'term' ) return
				land.Node( $hyoo_crus_node ).Item( sand.self() ).units_of( null ).forEach( visit )
			}
			this.units_of( null ).forEach( visit )
			
			return [ ... peers ].map( str => new $hyoo_crus_link( str ) )
			
		}
		
		/** All author Lords of Node subtree */
		@ $mol_mem
		author_lords() {
			const land = this.land()
			return this.author_peers()
				.map( peer => land.pass.get( peer.str )?.lord() )
				.filter( $mol_guard_defined )
		}
		
		;[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {} ,
				$mol_dev_format_native( this ) ,
				' ',
				this.head(),
			)
		}
		
	}

}
