namespace $ {
	export class $hyoo_crus_dict extends $hyoo_crus_list {
		
		static tag = $hyoo_crus_gist_tag[ $hyoo_crus_gist_tag.keys ] as keyof typeof $hyoo_crus_gist_tag
		Value = $hyoo_crus_node
		
		@ $mol_mem
		keys(): readonly $hyoo_crus_vary_type[] {
			return this.items()
		}
		
		dive< Node extends typeof $hyoo_crus_node = typeof this['Value'] >(
			key: $hyoo_crus_vary_type, Node = this.Value as Node
		) {
			this.has( key, true, Node.tag )
			const unit = this.find( key )!
			return this.land().Node( Node ).Item( unit.self() )
		}
		
		// @ $mol_mem_key
		static of<
			Value extends typeof $hyoo_crus_node
		>( Value: Value ) {
			
			return class Dict extends $hyoo_crus_dict {
				
				Value = Value
				
				static toJSON() {
					return '$hyoo_crus_dict.of(' + Value + ')'
				}
				
			}
			
		}
		
		static with<
			This extends typeof $hyoo_crus_dict,
			Schema extends Record< string, { tag: keyof typeof $hyoo_crus_gist_tag, new(): { value: any } } >
		>( this: This, schema: Schema ) {
			
			const Entity = class Entity extends ( this as any ) {} as This & {
				new( ...args: any[] ): InstanceType< This > & {
					[ Key in keyof Schema ]: InstanceType< Schema[ Key ] >
				} & {
					readonly [ Key in keyof Schema as Uncapitalize< Extract< Key, string > > ]:
						( next?: ReturnType< InstanceType< Schema[ Key ] >[ 'value' ] > )=> ReturnType< InstanceType< Schema[ Key ] >[ 'value' ] > | null
				}
			}

			for( const Field in schema ) {
				
				const field = Field[0].toLowerCase() + Field.slice(1)
				
				Object.defineProperty( Entity.prototype, Field, { get: function() {
					return ( this as any as $hyoo_crus_dict ).dive( field, schema[ Field ] as any )
				} } )
				
				Object.defineProperty( Entity.prototype, field, {
					value: function( next?: any ){ return ( next === undefined && !this.has( field ) ) ? null : this[ Field ].value( next ) }
				} )
				
				$mol_wire_field( Entity.prototype, Field )
			}
			
			return Entity
			
		}
		
		;[ $mol_dev_format_head ]() {
			const nodes = this.nodes(null)
			return $mol_dev_format_span( {} ,
				$mol_dev_format_native( this ) ,
				' ',
				this.head(),
				' ',
				$mol_dev_format_auto( this.keys().map( ( key, index )=> new Pair( key, nodes[ index ] ) ) ),
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
