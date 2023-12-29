namespace $ {
	export function $hyoo_crus_dict_obj<
		Schema extends Record< string, typeof $hyoo_crus_node >
	>( schema: Schema ) {
		
		const Entity = class Entity extends $hyoo_crus_dict {} as Pick< typeof $hyoo_crus_dict, keyof typeof $hyoo_crus_dict > & {
			new(): $hyoo_crus_dict & {
				[ Key in keyof Schema ]: InstanceType< Schema[ Key ] >
			}
		}

		for( const field in schema ) {
			Object.defineProperty( Entity.prototype, field, { get: function() {
				return ( this as any as $hyoo_crus_dict ).dive( field, schema[ field ] )
			} } )
			$mol_wire_field( Entity.prototype, field )
		}
		
		return Entity
		
	}

}
