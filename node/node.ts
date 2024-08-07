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
			return ''
		}
		
		/** Reference to Land/Lord. */
		land_ref() {
			return this.land()?.ref() ?? this.$.$hyoo_crus_auth.current().lord()
		}
		
		/** Reference to Node/Land/Lord. */
		@ $mol_memo.method
		ref() {
			return $hyoo_crus_ref_resolve( this.land_ref(),  $hyoo_crus_ref( '___' + this.head() ) )
		}
		
		toJSON() {
			return this.ref().description
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
		@ $mol_mem
		units() {
			return this.land().sand_ordered( this.head() ).filter( unit => unit.tip() !== 'nil' )
		}
		
		filled() {
			return this.units().length > 0
		}
		
		/** Ability to make changes inside Land */
		can_change( lord = this.land().auth().lord() ) {
			return this.land().lord_rank( lord ) >= $hyoo_crus_rank.add
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
				peers.add( sand.peer() )
				if( sand.tag() === 'term' ) return
				land.Node( $hyoo_crus_node ).Item( sand.self() ).units().forEach( visit )
			}
			this.units().forEach( visit )
			
			return [ ... peers ]
			
		}
		
		/** All author Lords of Node subtree */
		@ $mol_mem
		author_lords() {
			const land = this.land()
			return this.author_peers()
				.map( peer => land.pass.get( peer )?.lord() )
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
