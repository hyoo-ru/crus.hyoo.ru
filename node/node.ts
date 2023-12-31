namespace $ {
	
	/** Adapter to CROWDS tree. */
	export class $hyoo_crus_node extends $mol_object {
		
		static tag = $hyoo_crus_gist_tag[ $hyoo_crus_gist_tag.vals ] as keyof typeof $hyoo_crus_gist_tag
		
		land() {
			return null as any as $hyoo_crus_land
		}
		
		head() {
			return ''
		}
		
		lord() {
			return this.land().lord()
		}
		
		realm() {
			return this.lord()?.realm() ?? null
		}
		
		lord_ref() {
			return this.lord()?.ref() ?? this.$.$hyoo_crus_auth.current().lord()
		}
		
		@ $mol_memo.method
		ref() {
			return Symbol.for( this.lord_ref().description + ( this.land().numb() || 'AAAAAAAA' ) + this.head() )
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
				term: land.Node( Node || $hyoo_crus_reg ),
				solo: land.Node( Node || $hyoo_crus_reg ),
				vals: land.Node( Node || $hyoo_crus_list ),
				keys: land.Node( Node || $hyoo_crus_dict ),
			}
			return this.units().map( unit => map[ unit.tag() ].Item( unit.self() ) ) as any
		}
		
		@ $mol_mem
		units() {
			return this.land().gists_ordered( this.head() )
		}
		
		can_change( lord = this.land().auth().lord() ) {
			return this.land().lord_rang( lord ) >= $hyoo_crus_rang.add
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
