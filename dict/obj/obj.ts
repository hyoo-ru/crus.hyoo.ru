namespace $ {
	export function $hyoo_cras_dict_obj<
		Schema extends Record< string, typeof $hyoo_cras_node >
	>( schema: Schema ) {
		
		const Entity = class Entity extends $hyoo_cras_dict {} as Pick< typeof $hyoo_cras_dict, keyof typeof $hyoo_cras_dict > & {
			new(): $hyoo_cras_dict & {
				[ Key in keyof Schema ]: InstanceType< Schema[ Key ] >
			}
		}

		for( const field in schema ) {
			Object.defineProperty( Entity.prototype, field, { get: function() {
				return ( this as any as $hyoo_cras_dict ).dive( field, schema[ field ] )
			} } )
			$mol_wire_field( Entity.prototype, field )
		}
		
		return Entity
		
	}

}
