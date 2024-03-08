namespace $ {
	
	export class $hyoo_crus_flex_thing extends $hyoo_crus_dict.with({
		Kind: $hyoo_crus_reg.ref( ()=> $hyoo_crus_flex_kind ), // Schema of fields
		Title: $hyoo_crus_reg_str,
	}) {}
	
	export class $hyoo_crus_flex_kind extends $hyoo_crus_flex_thing.with({
		Props: $hyoo_crus_list.ref( ()=> $hyoo_crus_flex_prop ),
	}) {}
	
	export class $hyoo_crus_flex_prop extends $hyoo_crus_flex_thing.with({
		Key: $hyoo_crus_reg_str, // Key to store value
		Type: $hyoo_crus_reg_str, // Type of value
		Target: $hyoo_crus_reg.ref( ()=> $hyoo_crus_flex_kind ), // Target kind
		Enum: $hyoo_crus_reg.ref( ()=> $hyoo_crus_list ), // Variants of values
		Base: $hyoo_crus_reg, // Base value
	}) {}
	
	export class $hyoo_crus_flex_domain extends $hyoo_crus_flex_thing.with({
		Kinds: $hyoo_crus_list.ref( ()=> $hyoo_crus_flex_kind ),
		Props: $hyoo_crus_list.ref( ()=> $hyoo_crus_flex_prop ),
		Types: $hyoo_crus_list_str,
	}) {
		
		@ $mol_action
		static ensure( land: $hyoo_crus_land ): $hyoo_crus_flex_domain {
			
			const domain = land.Data( this )
			if( domain.units().length ) return domain
			
			domain.title( 'Base Domain' )
			domain.types([ 'reg', 'str', 'ref', 'list', 'dict' ])
			
			const Kind = domain.Kinds!.local_make()
			const Prop = domain.Kinds!.local_make()
			const Thing = domain.Kinds!.local_make()
			const Domain = domain.Kinds!.local_make()
			
			Kind.title( 'Kind' )
			Prop.title( 'Property' )
			Thing.title( 'Thing' )
			Domain.title( 'Domain' )
			
			Kind.kind( Kind )
			Prop.kind( Kind )
			Thing.kind( Kind )
			Domain.kind( Kind )
			domain.kind( Domain )
			
			const thing_kind = domain.Props!.local_make()
			const thing_title = domain.Props!.local_make()
			const kind_props = domain.Props!.local_make()
			const prop_key = domain.Props!.local_make()
			const prop_type = domain.Props!.local_make()
			const prop_target = domain.Props!.local_make()
			const prop_enum = domain.Props!.local_make()
			const prop_base = domain.Props!.local_make()
			const domain_kinds = domain.Props!.local_make()
			const domain_props = domain.Props!.local_make()
			const domain_types = domain.Props!.local_make()
			
			thing_kind.key( 'kind' )
			thing_title.key( 'title' )
			kind_props.key( 'props' )
			prop_key.key( 'key' )
			prop_type.key( 'type' )
			prop_target.key( 'target' )
			prop_enum.key( 'enum' )
			prop_base.key( 'base' )
			domain_kinds.key( 'kinds' )
			domain_props.key( 'props' )
			domain_types.key( 'types' )
			
			thing_kind.title( 'Kind' )
			thing_title.title( 'Title' )
			kind_props.title( 'Props' )
			prop_key.title( 'Key' )
			prop_type.title( 'Type' )
			prop_target.title( 'Target kind' )
			prop_enum.title( 'Variants' )
			prop_base.title( 'Default' )
			domain_kinds.title( 'Kinds' )
			domain_props.title( 'Props' )
			domain_types.title( 'Types' )
			
			thing_kind.kind( Prop )
			thing_title.kind( Prop )
			kind_props.kind( Prop )
			prop_key.kind( Prop )
			prop_type.kind( Prop )
			prop_target.kind( Prop )
			prop_enum.kind( Prop )
			prop_base.kind( Prop )
			domain_kinds.kind( Prop )
			domain_props.kind( Prop )
			domain_types.kind( Prop )
			
			Kind.Props!.add( thing_kind.ref() )
			Prop.Props!.add( thing_kind.ref() )
			Thing.Props!.add( thing_kind.ref() )
			Domain.Props!.add( thing_kind.ref() )
			
			Kind.Props!.add( thing_title.ref() )
			Prop.Props!.add( thing_title.ref() )
			Thing.Props!.add( thing_title.ref() )
			Domain.Props!.add( thing_title.ref() )
			
			Kind.Props!.add( kind_props.ref() )
			
			Prop.Props!.add( prop_key.ref() )
			Prop.Props!.add( prop_type.ref() )
			Prop.Props!.add( prop_target.ref() )
			Prop.Props!.add( prop_enum.ref() )
			Prop.Props!.add( prop_base.ref() )
			
			Domain.Props!.add( domain_kinds.ref() )
			Domain.Props!.add( domain_props.ref() )
			Domain.Props!.add( domain_types.ref() )
			
			thing_kind.type( 'ref' )
			thing_title.type( 'str' )
			kind_props.type( 'list' )
			prop_key.type( 'str' )
			prop_type.type( 'str' )
			prop_target.type( 'ref' )
			prop_enum.type( 'ref' )
			prop_base.type( 'reg' )
			domain_kinds.type( 'list' )
			domain_props.type( 'list' )
			domain_types.type( 'list' )
			
			thing_kind.target( Thing )
			kind_props.target( Prop )
			prop_target.target( Kind )
			prop_enum.target( Thing )
			prop_base.target( Thing )
			domain_kinds.target( Kind )
			domain_props.target( Prop )
			
			thing_kind.Enum!.value_ref( domain.Kinds!.ref() )
			prop_type.Enum!.value_ref( domain.Types!.ref() )
			prop_target.Enum!.value_ref( domain.Kinds!.ref() )
			prop_enum.Enum!.value_ref( domain.ref() )
			
			thing_title.base( '' )
			thing_kind.base( Thing.ref() )
			prop_type.base( 'reg' )
			prop_target.base( Thing.ref() )

			return domain
		}
		
	}
	
}
