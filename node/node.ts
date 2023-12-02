namespace $ {
	
	/** Adapter to CROWDS tree. */
	export class $hyoo_crowds_node extends $mol_object {
		
		static tag = $hyoo_crowds_gist_tag[ $hyoo_crowds_gist_tag.vals ] as keyof typeof $hyoo_crowds_gist_tag
		
		@ $mol_mem
		area() {
			return null as any as $hyoo_crowds_area
		}
		
		head() {
			return 0
		}
		
		land() {
			return this.area().land()
		}
		
		realm() {
			return this.land()?.realm() ?? null
		}
		
		lord() {
			return this.land()?.lord() ?? this.$.$hyoo_crowds_auth.current().lord()
		}
		
		ref() {
			return $hyoo_crowds_ref.make( this.lord(), this.area().numb(), this.head() )
		}
		
		slug() {
			return this.ref().toString().slice( 16 ) || 'Root'
		}
		
		/** Returns another representation of this node. */
		@ $mol_mem_key
		cast< Node extends typeof $hyoo_crowds_node >( Node: Node ): InstanceType< Node > {
			return this.area().Node( Node ).Item( this.head() )
		}
		
		/** Ordered inner alive Node. */
		@ $mol_mem_key
		nodes< Node extends typeof $hyoo_crowds_node >( Node: Node | null ): readonly InstanceType< Node >[] {
			const area = this.area()
			const map = {
				term: area.Node( Node || $hyoo_crowds_reg ),
				head: area.Node( Node || $hyoo_crowds_reg ),
				vals: area.Node( Node || $hyoo_crowds_list ),
				keys: area.Node( Node || $hyoo_crowds_dict ),
			}
			return this.units().map( unit => map[ unit.tag() ].Item( unit.self() ) ) as any
		}
		
		@ $mol_mem
		units() {
			return this.area().gists_ordered( this.head() )
		}
		
		move(
			from: number,
			to: number,
		) {
			
			if( to === from ) return
			if( to === from + 1 ) return
			
			const units = this.units()
			const lead = to ? units[ to - 1 ].self() : 0
			const self = units[ from ]
			
			const prev = units[ from - 1 ]?.self() ?? 0
			const next = units[ from + 1 ]
			
			if( next ) this.area().post(
				prev,
				self.head(),
				next.self(),
				this.area().gist_decode( next ),
				next.tag(),
			)
			
			this.area().post(
				lead,
				self.head(),
				self.self(),
				this.area().gist_decode( self ),
				self.tag(),
			)
			
		}
		
		wipe( seat: number ) {
			
			const units = this.units()
			if( seat >= units.length ) return
			
			this.area().post(
				units[ seat - 1 ]?.self() ?? 0,
				units[ seat ].head(),
				units[ seat ].self(),
				null,
			)

		}
		
		can_change() {
			return this.area().lord_rang( this.area().auth().lord() ) >= $hyoo_crowds_rang.add
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
