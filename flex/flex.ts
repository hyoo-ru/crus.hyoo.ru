namespace $ {
	
	/** Any Thing */
	export class $hyoo_crus_flex_thing extends $hyoo_crus_dict.with({
		kind: $hyoo_crus_atom_ref_to( ()=> $hyoo_crus_flex_kind ), // Schema of fields
		title: $hyoo_crus_atom_str,
	}) {}
	
	/** Atomic Ref to any Thing */
	export class $hyoo_crus_flex_thing_ref extends $hyoo_crus_atom_ref_to( ()=> $hyoo_crus_flex_thing ) {}
	
	/** Kind of Thing */
	export class $hyoo_crus_flex_kind extends $hyoo_crus_flex_thing.with({
		props: $hyoo_crus_list_ref_to( ()=> $hyoo_crus_flex_prop ),
	}) {}
	
	/** Property of Kind */
	export class $hyoo_crus_flex_prop extends $hyoo_crus_flex_thing.with({
		key: $hyoo_crus_atom_str, // Key to store value
		type: $hyoo_crus_atom_str, // Type of value
		target: $hyoo_crus_atom_ref_to( ()=> $hyoo_crus_flex_kind ), // Target kind
		enum: $hyoo_crus_atom_ref_to( ()=> $hyoo_crus_list_vary ), // Variants of values
		base: $hyoo_crus_atom_vary, // Base value
	}) {}
	
	/** All schemas in one place */
	export class $hyoo_crus_flex_domain extends $hyoo_crus_flex_thing.with({
		kinds: $hyoo_crus_list_ref_to( ()=> $hyoo_crus_flex_kind ),
		props: $hyoo_crus_list_ref_to( ()=> $hyoo_crus_flex_prop ),
		types: $hyoo_crus_list_str,
	}) {
		
		@ $mol_action
		static ensure( land: $hyoo_crus_land ): $hyoo_crus_flex_domain {
			
			const domain = land.Data( this )
			if( domain.units().length ) return domain
			// if( land.auth().lord() !== $hyoo_crus_ref( 'JinYqktA_qNR7zÆe8' ) ) return domain
			
			domain.title!.val( 'Base Domain' )
			domain.types!.items_vary([ 'vary', 'enum', 'bool', 'int', 'real', 'str', 'ref', 'time', 'dict', 'text', 'list' ])
			
			const Thing = domain.kinds!.local_make()
			const Kind = domain.kinds!.local_make()
			const Prop = domain.kinds!.local_make()
			const Domain = domain.kinds!.local_make()
			
			Kind.title!.val( 'Kind' )
			Prop.title!.val( 'Property' )
			Thing.title!.val( 'Thing' )
			Domain.title!.val( 'Domain' )
			
			Kind.kind!.remote( Kind )
			Prop.kind!.remote( Kind )
			Thing.kind!.remote( Kind )
			Domain.kind!.remote( Kind )
			domain.kind!.remote( Domain )
			
			const thing_kind = domain.props!.local_make()
			const thing_title = domain.props!.local_make()
			const kind_props = domain.props!.local_make()
			const prop_key = domain.props!.local_make()
			const prop_type = domain.props!.local_make()
			const prop_target = domain.props!.local_make()
			const prop_enum = domain.props!.local_make()
			const prop_base = domain.props!.local_make()
			const domain_kinds = domain.props!.local_make()
			const domain_props = domain.props!.local_make()
			const domain_types = domain.props!.local_make()
			
			thing_kind.key!.val( 'kind' )
			thing_title.key!.val( 'title' )
			kind_props.key!.val( 'props' )
			prop_key.key!.val( 'key' )
			prop_type.key!.val( 'type' )
			prop_target.key!.val( 'target' )
			prop_enum.key!.val( 'enum' )
			prop_base.key!.val( 'base' )
			domain_kinds.key!.val( 'kinds' )
			domain_props.key!.val( 'props' )
			domain_types.key!.val( 'types' )
			
			thing_kind.title!.val( 'Kind' )
			thing_title.title!.val( 'Title' )
			kind_props.title!.val( 'Props' )
			prop_key.title!.val( 'Key' )
			prop_type.title!.val( 'Type' )
			prop_target.title!.val( 'Target kind' )
			prop_enum.title!.val( 'Variants' )
			prop_base.title!.val( 'Default' )
			domain_kinds.title!.val( 'Kinds' )
			domain_props.title!.val( 'Props' )
			domain_types.title!.val( 'Types' )
			
			thing_kind.kind!.remote( Prop )
			thing_title.kind!.remote( Prop )
			kind_props.kind!.remote( Prop )
			prop_key.kind!.remote( Prop )
			prop_type.kind!.remote( Prop )
			prop_target.kind!.remote( Prop )
			prop_enum.kind!.remote( Prop )
			prop_base.kind!.remote( Prop )
			domain_kinds.kind!.remote( Prop )
			domain_props.kind!.remote( Prop )
			domain_types.kind!.remote( Prop )
			
			Kind.props!.add( thing_kind.ref() )
			Prop.props!.add( thing_kind.ref() )
			Thing.props!.add( thing_kind.ref() )
			Domain.props!.add( thing_kind.ref() )
			
			Kind.props!.add( thing_title.ref() )
			Prop.props!.add( thing_title.ref() )
			Thing.props!.add( thing_title.ref() )
			Domain.props!.add( thing_title.ref() )
			
			Kind.props!.add( kind_props.ref() )
			
			Prop.props!.add( prop_key.ref() )
			Prop.props!.add( prop_type.ref() )
			Prop.props!.add( prop_target.ref() )
			Prop.props!.add( prop_enum.ref() )
			Prop.props!.add( prop_base.ref() )
			
			Domain.props!.add( domain_kinds.ref() )
			Domain.props!.add( domain_props.ref() )
			Domain.props!.add( domain_types.ref() )
			
			thing_kind.type!.val( 'ref' )
			thing_title.type!.val( 'str' )
			kind_props.type!.val( 'list' )
			prop_key.type!.val( 'str' )
			prop_type.type!.val( 'enum' )
			prop_target.type!.val( 'ref' )
			prop_enum.type!.val( 'ref' )
			prop_base.type!.val( 'vary' )
			domain_kinds.type!.val( 'list' )
			domain_props.type!.val( 'list' )
			domain_types.type!.val( 'list' )
			
			thing_kind.target!.remote( Thing )
			kind_props.target!.remote( Prop )
			prop_target.target!.remote( Kind )
			prop_enum.target!.remote( Thing )
			prop_base.target!.remote( Thing )
			domain_kinds.target!.remote( Kind )
			domain_props.target!.remote( Prop )
			
			thing_kind.enum!.vary( domain.kinds!.ref() )
			kind_props.enum!.vary( domain.props!.ref() )
			prop_type.enum!.vary( domain.types!.ref() )
			prop_target.enum!.vary( domain.kinds!.ref() )
			prop_enum.enum!.vary( domain.ref() )
			
			thing_title.base!.vary( '' )
			thing_kind.base!.vary( Thing.ref() )
			prop_type.base!.vary( 'vary' )
			prop_target.base!.vary( Thing.ref() )

			return domain
		}
		
	}
	
}
