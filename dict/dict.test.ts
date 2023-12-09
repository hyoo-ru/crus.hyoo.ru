namespace $.$$ {
	
	const auth1 = $hyoo_cras_auth.from( '_4eLnQsSr5wj6XOzgS5bZa254pkEOf_hg1nReCSR4Zkd-E07aLSwj-II-rZt4ZubInw_f1rZiA0Qa92qR0Gq3I6xYWCkW9Aagc7-97L2P-gI84NaLwdabp_DrZEX3RJTY' )
	
	$mol_test({
		
		async 'Dictionary invariants'( $ ) {
			
			const land = $hyoo_cras_land.make({ $ })
			const dict = land.Node( $hyoo_cras_dict ).Item(0)
			$mol_assert_like( dict.keys(), [] )
			
			dict.dive( 123, $hyoo_cras_reg )
			dict.dive( 'xxx', $hyoo_cras_reg )
			$mol_assert_like( dict.keys(), [ 'xxx', 123 ] )
			$mol_assert_ok( dict.has( 123 ) )
			$mol_assert_ok( dict.has( 'xxx' ) )
			$mol_assert_not( dict.has( 'yyy' ) )
			$mol_assert_like( dict.dive( 123, $hyoo_cras_reg ).value_vary(), null )
			$mol_assert_like( dict.dive( 'xxx', $hyoo_cras_reg ).value_vary(), null )
			
			dict.dive( 123, $hyoo_cras_reg ).value_vary( 777 )
			$mol_assert_like( dict.dive( 123, $hyoo_cras_reg ).value_vary(), 777 )

			dict.dive( 'xxx', $hyoo_cras_list ).items([ 'foo', 'bar' ])
			$mol_assert_like( dict.dive( 'xxx', $hyoo_cras_list ).items(), [ 'foo', 'bar' ] )
			
			dict.has( 123, false )
			$mol_assert_like( dict.keys(), [ 'xxx' ] )

		},
		
		async 'Dictionary merge'( $ ) {
			
			const land1 = $hyoo_cras_land.make({ $ })
			const land2 = $hyoo_cras_land.make({ $ })
			
			const dict1 = land1.Node( $hyoo_cras_dict ).Item(0)
			const dict2 = land2.Node( $hyoo_cras_dict ).Item(0)

			dict1.dive( 123, $hyoo_cras_reg ).value_vary( 666 )
			land2.face.tick( land2.auth().peer() )
			dict2.dive( 123, $hyoo_cras_reg ).value_vary( 777 )
			land1.apply_unit( land2.delta_unit() )
			$mol_assert_like( dict1.dive( 123, $hyoo_cras_reg ).value_vary(), 777 )
			
			dict1.dive( 'xxx', $hyoo_cras_list ).items([ 'foo' ])
			land2.face.tick( land2.auth().peer() )
			dict2.dive( 'xxx', $hyoo_cras_list ).items([ 'bar' ])
			land1.apply_unit( land2.delta_unit() )
			$mol_assert_like( dict1.dive( 'xxx', $hyoo_cras_list ).items(), [ 'bar', 'foo' ] )

		},
		
		"Narrowed Dictionary with linked Dictionaries and others"( $ ) {
			
			const realm = $hyoo_cras_realm.make({ $ })
			const land = realm.home().base().land()
			
			class User extends $hyoo_cras_dict.of({
				Title: $hyoo_cras_reg.of( 'str' ),
				Account: $hyoo_cras_reg.ref( ()=> Account ),
				Articles: $hyoo_cras_list.ref( ()=> Article ),
			}) {}
			
			class Account extends $hyoo_cras_dict.of({
				Title: $hyoo_cras_reg.of( 'str' ),
				User: $hyoo_cras_reg.ref( ()=> User ),
			}) {}
			
			class Article extends $hyoo_cras_dict.of({
				Title: $hyoo_cras_reg.of( 'str' ),
				Author: $hyoo_cras_reg.ref( ()=> User ),
			}) {}
			
			const user = land.Node( User ).Item(1)
			$mol_assert_like( user.Account().value(), null )
			$mol_assert_like( user.Articles().remotes(), [] )
			
			const account = user.Account().ensure()
			$mol_assert_like( user.Account().value(), account )
			$mol_assert_like( account.User().value(), null )
			
			account.User().value( user )
			$mol_assert_like( account.User().value(), user )
			
			const articles = [ user.Articles().remote_make(), user.Articles().remote_make() ]
			$mol_assert_like( user.Articles().remotes(), articles )
			
			$mol_assert_unique( user.land(), account.land(), ... articles.map( article => article.land() ) )
		},
		
	})
	
}
