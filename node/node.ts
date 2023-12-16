namespace $ {
	
	/** Adapter to CROWDS tree. */
	export class $hyoo_cras_node extends $mol_object {
		
		static tag = $hyoo_cras_gist_tag[ $hyoo_cras_gist_tag.vals ] as keyof typeof $hyoo_cras_gist_tag
		
		land() {
			return null as any as $hyoo_cras_land
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
			return this.lord()?.numb() ?? this.$.$hyoo_cras_auth.current().lord()
		}
		
		@ $mol_memo.method
		ref() {
			return $hyoo_cras_ref.make( this.lord_numb(), this.land().numb(), this.head() )
		}
		
		slug() {
			return this.ref().toString().slice( 24 )
		}
		
		/** Returns another representation of this node. */
		@ $mol_mem_key
		cast< Node extends typeof $hyoo_cras_node >( Node: Node ): InstanceType< Node > {
			return this.land().Node( Node ).Item( this.head() )
		}
		
		/** Ordered inner alive Node. */
		@ $mol_mem_key
		nodes< Node extends typeof $hyoo_cras_node >( Node: Node | null ): readonly InstanceType< Node >[] {
			const land = this.land()
			const map = {
				term: land.Node( Node || $hyoo_cras_reg ),
				head: land.Node( Node || $hyoo_cras_reg ),
				vals: land.Node( Node || $hyoo_cras_list ),
				keys: land.Node( Node || $hyoo_cras_dict ),
			}
			return this.units().map( unit => map[ unit.tag() ].Item( unit.self() ) ) as any
		}
		
		@ $mol_mem
		units() {
			return this.land().gists_ordered( this.head() )
		}
		
		can_change( lord = this.land().auth().lord() ) {
			return this.land().lord_rang( lord ) >= $hyoo_cras_rang.add
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
