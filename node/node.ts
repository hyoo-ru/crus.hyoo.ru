namespace $ {
	
	/** Adapter to CROWDS tree. */
	export class $hyoo_crowds_node extends $mol_object {
		
		static tag = $hyoo_crowds_gist_tag[ $hyoo_crowds_gist_tag.vals ] as keyof typeof $hyoo_crowds_gist_tag
		
		@ $mol_mem
		land() {
			return null as any as $hyoo_crowds_land
		}
		
		head() {
			return 0
		}
		
		lord() {
			return this.land().lord()
		}
		
		realm() {
			return this.lord()?.realm() ?? null
		}
		
		lord_numb() {
			return this.lord()?.numb() ?? this.$.$hyoo_crowds_auth.current().lord()
		}
		
		ref() {
			return $hyoo_crowds_ref.make( this.lord_numb(), this.land().numb(), this.head() )
		}
		
		slug() {
			return this.ref().toString().slice( 16 ) || 'Root'
		}
		
		/** Returns another representation of this node. */
		@ $mol_mem_key
		cast< Node extends typeof $hyoo_crowds_node >( Node: Node ): InstanceType< Node > {
			return this.land().Node( Node ).Item( this.head() )
		}
		
		/** Ordered inner alive Node. */
		@ $mol_mem_key
		nodes< Node extends typeof $hyoo_crowds_node >( Node: Node | null ): readonly InstanceType< Node >[] {
			const land = this.land()
			const map = {
				term: land.Node( Node || $hyoo_crowds_reg ),
				head: land.Node( Node || $hyoo_crowds_reg ),
				vals: land.Node( Node || $hyoo_crowds_list ),
				keys: land.Node( Node || $hyoo_crowds_dict ),
			}
			return this.units().map( unit => map[ unit.tag() ].Item( unit.self() ) ) as any
		}
		
		@ $mol_mem
		units() {
			return this.land().gists_ordered( this.head() )
		}
		
		can_change( lord = this.land().auth().lord() ) {
			return this.land().lord_rang( lord ) >= $hyoo_crowds_rang.add
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
