namespace $.$$ {
	
	const auth1 = $hyoo_crus_auth.from( '_4eLnQsSr5wj6XOzgS5bZa254pkEOf_hg1nReCSR4Zkd-E07aLSwj-II-rZt4ZubInw_f1rZiA0Qa92qR0Gq3I6xYWCkW9Aagc7-97L2P-gI84NaLwdabp_DrZEX3RJTY' )
	
	$mol_test({
		
		async 'Dictionary invariants'( $ ) {
			
			const land = $hyoo_crus_land.make({ $ })
			const dict = land.Node( $hyoo_crus_dict ).Item('')
			$mol_assert_equal( dict.keys(), [] )
			
			dict.dive( 123, $hyoo_crus_reg )
			dict.dive( 'xxx', $hyoo_crus_reg )
			$mol_assert_equal( dict.keys(), [ 'xxx', 123 ] )
			$mol_assert_equal( dict.has( 123 ), true )
			$mol_assert_equal( dict.has( 'xxx' ), true )
			$mol_assert_equal( dict.has( 'yyy' ), false )
			$mol_assert_equal( dict.dive( 123, $hyoo_crus_reg ).value_vary(), null )
			$mol_assert_equal( dict.dive( 'xxx', $hyoo_crus_reg ).value_vary(), null )
			
			dict.dive( 123, $hyoo_crus_reg ).value_vary( 777 )
			$mol_assert_equal( dict.dive( 123, $hyoo_crus_reg ).value_vary(), 777 )

			dict.dive( 'xxx', $hyoo_crus_list ).items([ 'foo', 'bar' ])
			$mol_assert_equal( dict.dive( 'xxx', $hyoo_crus_list ).items(), [ 'foo', 'bar' ] )
			
			dict.has( 123, false )
			$mol_assert_equal( dict.keys(), [ 'xxx' ] )

		},
		
		async 'Dictionary merge'( $ ) {
			
			const land1 = $hyoo_crus_land.make({ $ })
			const land2 = $hyoo_crus_land.make({ $ })
			
			const dict1 = land1.Node( $hyoo_crus_dict ).Item('')
			const dict2 = land2.Node( $hyoo_crus_dict ).Item('')

			dict1.dive( 123, $hyoo_crus_reg ).value_vary( 666 )
			land2.face.tick()
			dict2.dive( 123, $hyoo_crus_reg ).value_vary( 777 )
			land1.apply_unit( land2.delta_unit() )
			$mol_assert_equal( dict1.dive( 123, $hyoo_crus_reg ).value_vary(), 777 )
			
			dict1.dive( 'xxx', $hyoo_crus_list ).items([ 'foo' ])
			land2.face.tick()
			dict2.dive( 'xxx', $hyoo_crus_list ).items([ 'bar' ])
			land1.apply_unit( land2.delta_unit() )
			$mol_assert_equal( dict1.dive( 'xxx', $hyoo_crus_list ).items(), [ 'bar', 'foo' ] )

		},
		
		"Narrowed Dictionary with linked Dictionaries and others"( $ ) {
			
			class User extends $hyoo_crus_dict.with({
				Title: $hyoo_crus_reg_str,
				Account: $hyoo_crus_reg.ref( ()=> Account ),
				Articles: $hyoo_crus_list.ref( ()=> Article ),
			}) {}
			
			class Account extends $hyoo_crus_dict.with({
				Title: $hyoo_crus_reg_str,
				User: $hyoo_crus_reg.ref( ()=> User ),
			}) {}
			
			class Article extends $hyoo_crus_dict.with({
				Title: $hyoo_crus_dict.to( $hyoo_crus_reg_str ),
				Author: $hyoo_crus_reg.ref( ()=> User ),
			}) {}
			
			const realm = $hyoo_crus_realm.make({ $ })
			const land = realm.home().base().land()
			
			const user = land.Node( User ).Item('11111111')
			$mol_assert_equal( user.title(), user.Title.value(), null )
			$mol_assert_equal( user.account(), user.Account.remote(), null )
			$mol_assert_equal( user.articles() ?? [], user.Articles.remote_list(), [] )
			
			user.title( 'Jin' )
			$mol_assert_equal( user.title() ?? '', user.Title.value(), 'Jin' )
			
			const account = user.Account.remote_ensure()
			$mol_assert_equal( user.account(), user.Account.remote(), account )
			$mol_assert_equal( account.user(), account.User.remote(), null )
			
			account.user( user )
			$mol_assert_equal( account.user(), account.User.remote(), user )
			
			const articles = [ user.Articles.remote_make(), user.Articles.remote_make() ]
			$mol_assert_equal( user.articles() ?? [], user.Articles.remote_list(), articles )
			
			articles[0].Title.dive( 'en' ).value( 'Hello!' )
			$mol_assert_equal(
				articles[0].Title.dive( 'en' ).value(),
				articles[0].title()?.dive( 'en' ).value(),
				'Hello!',
			)
			$mol_assert_equal( articles[1].title()?.dive( 'ru' ).value(), undefined )
			$mol_assert_equal(
				articles[1].Title.dive( 'ru' ).value(),
				articles[1].title()?.dive( 'ru' ).value(),
				null,
			)
			
			$mol_assert_unique( user.land(), account.land(), ... articles.map( article => article.land() ) )
			
		},
		
		async "Schemas"( $ ) {
			
			class Kind extends $hyoo_crus_dict.with({
				Kind: $hyoo_crus_reg.ref( ()=> Kind ),
				Title: $hyoo_crus_reg_str,
				Props: $hyoo_crus_dict.to( $hyoo_crus_reg.ref( ()=> Property ) ),
			}) {}
			
			class Entity extends $hyoo_crus_dict.with({
				Kind: $hyoo_crus_reg.ref( ()=> Kind ), // Schema of fields
				Title: $hyoo_crus_reg_str,
			}) {}
			
			class Property extends Entity.with({
				Type: $hyoo_crus_reg.ref( ()=> Type ), // Type of value
				Base: $hyoo_crus_reg, // Base value
				Enum: $hyoo_crus_reg.ref( ()=> $hyoo_crus_dict ), // Variants of values
			}) {}
			
			class Type extends Entity.with({
			}) {}
			
			class Domain extends $hyoo_crus_dict.with({
				Kinds: $hyoo_crus_dict.to( Kind ),
				Props: $hyoo_crus_dict.to( Property ),
				Types: $hyoo_crus_dict.to( Type ),
			}) { }
			
			
			const realm = $hyoo_crus_realm.make({ $ })
			const land = realm.home().base().land()
			
			const domain = land.Root( Domain )
			await $mol_wire_async( land ).sync()
			
			const kind = domain.Kinds.dive( 'Kind' )
			const type = domain.Kinds.dive( 'Type' )
			const prop = domain.Kinds.dive( 'Prop' )
			const entity = domain.Kinds.dive( 'Entity' )
			
			kind.title( 'Kind' )
			type.title( 'Type' )
			prop.title( 'Property' )
			entity.title( 'Entity' )
			
			const reg = domain.Types.dive( 'Reg' )
			const str = domain.Types.dive( 'Str' )
			const ref = domain.Types.dive( 'Ref' )
			
			reg.title( 'Register' )
			str.title( 'String' )
			ref.title( 'Reference' )
			
			kind.kind( kind )
			type.kind( kind )
			prop.kind( kind )
			entity.kind( kind )
			
			const kind_kind = domain.Props.dive( 'kind.kind' )
			const prop_type = domain.Props.dive( 'prop.type' )
			const prop_enum = domain.Props.dive( 'prop.enum' )
			const prop_base = domain.Props.dive( 'prop.base' )
			
			kind_kind.title( 'Kind of entity' )
			prop_type.title( 'Property type' )
			prop_enum.title( 'Property value variants' )
			prop_base.title( 'Property base value' )
			
			kind.Props.dive( 'kind' ).remote( kind_kind )
			type.Props.dive( 'kind' ).remote( kind_kind )
			prop.Props.dive( 'kind' ).remote( kind_kind )
			entity.Props.dive( 'kind' ).remote( kind_kind )
			
			prop.Props.dive( 'type' ).remote( prop_type )
			prop.Props.dive( 'enum' ).remote( prop_enum )
			prop.Props.dive( 'base' ).remote( prop_base )
			
			kind_kind.type( ref )
			prop_type.type( ref )
			prop_enum.type( ref )
			prop_base.type( reg )
			
			kind_kind.enum( domain.Kinds )
			prop_type.enum( domain.Types )
			prop_enum.enum( domain )
			
			kind_kind.base( entity.ref() )
			prop_type.base( reg.ref() )
			
		},
		
	})
	
}
