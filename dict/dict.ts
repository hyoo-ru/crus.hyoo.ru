namespace $ {
	/** Mergeable dictionary node with any keys mapped to any embedded Node types */
	export class $hyoo_crus_dict extends $hyoo_crus_list_vary {
		
		static tag = $hyoo_crus_sand_tag[ $hyoo_crus_sand_tag.keys ] as keyof typeof $hyoo_crus_sand_tag
		
		/** List of Vary keys. */
		@ $mol_mem
		keys(): readonly $hyoo_crus_vary_type[] {
			return this.items_vary()
		}
		
		/** Inner Node by key. */
		dive< Node extends typeof $hyoo_crus_node >(
			key: $hyoo_crus_vary_type,
			Node: Node,
			auto?: any,
		) {
			if( this.can_change() && auto !== undefined ) this.has( key, true, Node.tag )
			const unit = this.find( key )
			return unit ? this.land().Node( Node ).Item( unit.self() ) : null
		}
		
		static schema = {} as Record< string, typeof $hyoo_crus_node >
		
		/** Mergeable dictionary node with defined keys mapped to different embedded Node types */
		static with<
			This extends typeof $hyoo_crus_dict,
			const Schema extends Record< string, { tag: keyof typeof $hyoo_crus_sand_tag, new(): {} } >
		>( this: This, schema: Schema ) {
			
			const Entity = class Entity extends ( this as any ) {
				// static get schema() { return { ... this.schema, ... schema } }
			} as Omit< This, 'prototype' > & {
				new( ...args: any[] ): $mol_type_override< InstanceType< This >, {
					readonly [ Key in keyof Schema ]: ( auto?: any )=> InstanceType< Schema[ Key ] > | null
				} >
			}

			for( const Field in schema ) {
				
				Object.defineProperty( Entity.prototype, Field, {
					value: function( this: InstanceType< This >, auto?: any ) {
						return this.dive( Field, schema[ Field ] as any, auto )
					}
				} )
				
				// $mol_wire_field( Entity.prototype, Field as any )
			}
			
			return Object.assign( Entity, { schema: { ... this.schema, ... schema } } )
			
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
	
	/** Mergeable dictionary with any keys mapped to any embedded Node types */
	export function $hyoo_crus_dict_to<
		Value extends { tag: keyof typeof $hyoo_crus_sand_tag, new(): {} }
	>( Value: Value ) {
		
		return class $hyoo_crus_dict_to extends $hyoo_crus_dict {
			
			Value = Value
			
			key( key: $hyoo_crus_vary_type, auto?: any ) {
				return this.dive( key, this.Value as any as typeof $hyoo_crus_node, auto ) as InstanceType< Value >
			}
			
			static toString() {
				return this === $hyoo_crus_dict_to ? '$hyoo_crus_dict_to<' + Value + '>' : super.toString()
			}
			
		}
		
	}
	
}
