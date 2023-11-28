namespace $ {
	
	export class $hyoo_crowds_node_ref {
		
		static size = 8 + 4 + 6
		
		constructor(
			readonly lord: bigint /*8B*/,
			readonly numb: number /*4B*/,
			readonly head: number /*6B*/,
		) {}
		
		static from( bin: ArrayBufferView ) {
			const buff = new $mol_buffer( bin.buffer, bin.byteOffset, bin.byteLength )
			return new this(
				buff.uint64( 0 ),
				buff.uint32( 8 ),
				buff.uint48( 12 ),
			)
		}
		
		toArray() {
			const bin = new Uint8Array( $hyoo_crowds_node_ref.size )
			const buff = new $mol_buffer( bin.buffer )
			buff.uint64( 0, this.lord )
			buff.uint32( 8, this.numb )
			buff.uint48( 12, this.head )
			return bin
		}
		
		toString() {
			// return $mol_base64_ae_encode( this.toArray() ).replace( /A+$/, '' )
			return `${ this.lord.toString(36) }_${ this.numb.toString(36) }_${ this.head.toString(36) }`
		}
		
		// toJSON() {
		// 	return this.toString()
		// }
		
		[Symbol.toPrimitive]() {
			return this.toString()
		}
		
		;[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {} ,
				$mol_dev_format_native( this ) ,
				' ',
				this.toString(),
			)
		}
		
	}
	
	/** Adapter to CROWDS tree. */
	export class $hyoo_crowds_node extends $mol_object {
		
		static tag = 'list' as keyof typeof $hyoo_crowds_gist_tag
		
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
			return new $hyoo_crowds_node_ref( this.lord(), this.area().numb(), this.head() )
		}
		
		guid() {
			return this.ref().toString()
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
				list: area.Node( Node || $hyoo_crowds_list ),
				dict: area.Node( Node || $hyoo_crowds_dict ),
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
		
		;[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {} ,
				$mol_dev_format_native( this ) ,
				' ',
				this.guid(),
			)
		}
		
	}

}
