namespace $ {
	export class $hyoo_crus_dict extends (
		$hyoo_crus_list as $mol_type_erase< typeof $hyoo_crus_list, 'value' >
	) {
		
		static tag = $hyoo_crus_gist_tag[ $hyoo_crus_gist_tag.keys ] as keyof typeof $hyoo_crus_gist_tag
		
		value() {
			return this
		}
		
		@ $mol_mem
		keys(): readonly $hyoo_crus_vary_type[] {
			return this.items()
		}
		
		dive< Node extends typeof $hyoo_crus_node >(
			key: $hyoo_crus_vary_type,
			Node: Node,
			auto?: any,
		) {
			if( this.can_change() && auto !== undefined ) this.has( key, true, Node.tag )
			const unit = this.find( key )
			return unit ? this.land().Node( Node ).Item( unit.self() ) : null
		}
		
		// @ $mol_mem_key
		static to<
			Value extends { tag: keyof typeof $hyoo_crus_gist_tag, new(): { value: any } }
		>( Value: Value ) {
			
			return class Dict extends $hyoo_crus_dict {
				
				Value = Value
				
				key( key: $hyoo_crus_vary_type ) {
					this.has( key, true, Value.tag )
					const unit = this.find( key )!
					return this.land().Node( this.Value as any as typeof $hyoo_crus_node ).Item( unit.self() ) as InstanceType< Value >
				}
				
				static toString() {
					return '$hyoo_crus_dict.to(' + Value + ')'
				}
				
			}
			
		}
		
		static with<
			This extends typeof $hyoo_crus_dict,
			Schema extends Record< string, { tag: keyof typeof $hyoo_crus_gist_tag, new(): { value: any } } >
		>( this: This, schema: Schema ) {
			
			const Entity = class Entity extends ( this as any ) {} as This & {
				new( ...args: any[] ): InstanceType< This > & {
					[ Key in keyof Schema ]: InstanceType< Schema[ Key ] > | null
				} & {
					readonly [ Key in keyof Schema as Uncapitalize< Extract< Key, string > > ]:
						( next?: ReturnType< InstanceType< Schema[ Key ] >[ 'value' ] > )=> ReturnType< InstanceType< Schema[ Key ] >[ 'value' ] > | null
				}
			}

			for( const Field in schema ) {
				
				const field = Field[0].toLowerCase() + Field.slice(1)
				
				Object.defineProperty( Entity.prototype, Field, { get: function() {
					return ( this as any as $hyoo_crus_dict ).dive( field, schema[ Field ] as any, null )
				} } )
				
				Object.defineProperty( Entity.prototype, field, {
					value: function( next?: any ){ return ( next === undefined && !this.has( field ) ) ? null : this[ Field ].value( next ) }
				} )
				
				$mol_wire_field( Entity.prototype, Field as any )
			}
			
			return Entity
			
		}
		
		;[ $mol_dev_format_head ]() {
			
			const keys = $mol_wire_probe( ()=> this.keys() )
			const nodes = $mol_wire_probe( ()=> this.nodes(null) ) ?? []
			
			return $mol_dev_format_span( {} ,
				$mol_dev_format_native( this ) ,
				' ',
				this.head(),
				' ',
				$mol_dev_format_auto( keys?.map( ( key, index )=> new Pair( key, nodes[ index ] ) ) ),
			)
			
		}
		
	}
	
	class Pair {
		constructor( readonly key: any, readonly val: any ) {
		}
		;[ $mol_dev_format_head ]() {
			return $mol_dev_format_tr( {} ,
				$mol_dev_format_td( {}, $mol_dev_format_auto(this.key) ),
				$mol_dev_format_td( {},': '),
				$mol_dev_format_td( {}, $mol_dev_format_auto(this.val) ),
			)
		}
	}
	
}
