namespace $ {
	export function $hyoo_crus_dict_obj<
		Schema extends Record< string, typeof $hyoo_crus_node >
	>( schema: Schema ) {
		
		const Entity = class Entity extends $hyoo_crus_dict {} as Pick< typeof $hyoo_crus_dict, keyof typeof $hyoo_crus_dict > & {
			new(): $hyoo_crus_dict & {
				[ Key in keyof Schema ]: InstanceType< Schema[ Key ] >
			} & {
				[ Key in keyof Schema as Lowercase< Extract< Key, string > > ]:
					// @ts-ignore
					( next?: ReturnType< InstanceType< Schema[ Key ] >[ 'value' ] > )=> ReturnType< InstanceType< Schema[ Key ] >[ 'value' ] > | null
			}
		}

		for( const Field in schema ) {
			
			const field = Field.toLowerCase()
			
			Object.defineProperty( Entity.prototype, Field, { get: function() {
				return ( this as any as $hyoo_crus_dict ).dive( field, schema[ Field ] )
			} } )
			
			Object.defineProperty( Entity.prototype, field, {
				value: function( next?: any ){ return ( next === undefined && !this.has( field ) ) ? null : this[ Field ].value( next ) }
			} )
			
			$mol_wire_field( Entity.prototype, Field )
		}
		
		return Entity
		
	}

}
