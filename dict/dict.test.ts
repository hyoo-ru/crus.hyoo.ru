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
			land2.face.tick( land2.auth().peer() )
			dict2.dive( 123, $hyoo_crus_reg ).value_vary( 777 )
			land1.apply_unit( land2.delta_unit() )
			$mol_assert_equal( dict1.dive( 123, $hyoo_crus_reg ).value_vary(), 777 )
			
			dict1.dive( 'xxx', $hyoo_crus_list ).items([ 'foo' ])
			land2.face.tick( land2.auth().peer() )
			dict2.dive( 'xxx', $hyoo_crus_list ).items([ 'bar' ])
			land1.apply_unit( land2.delta_unit() )
			$mol_assert_equal( dict1.dive( 'xxx', $hyoo_crus_list ).items(), [ 'bar', 'foo' ] )

		},
		
		"Narrowed Dictionary with linked Dictionaries and others"( $ ) {
			
			const realm = $hyoo_crus_realm.make({ $ })
			const land = realm.home().base().land()
			
			class User extends $hyoo_crus_dict.of({
				Title: $hyoo_crus_reg_str,
				Account: $hyoo_crus_reg_ref( ()=> Account ),
				Articles: $hyoo_crus_list_ref( ()=> Article ),
			}) {}
			
			class Account extends $hyoo_crus_dict.of({
				Title: $hyoo_crus_reg_str,
				User: $hyoo_crus_reg_ref( ()=> User ),
			}) {}
			
			class Article extends $hyoo_crus_dict.of({
				Title: $hyoo_crus_reg_str,
				Author: $hyoo_crus_reg_ref( ()=> User ),
			}) {}
			
			const user = land.Node( User ).Item('11111111')
			$mol_assert_equal( user.title() ?? '', user.Title.value(), '' )
			$mol_assert_equal( user.account(), user.Account.value(), null )
			$mol_assert_equal( user.articles() ?? [], user.Articles.remote_list(), [] )
			
			user.title( 'Jin' )
			$mol_assert_equal( user.title() ?? '', user.Title.value(), 'Jin' )
			
			const account = user.Account.value_ensure()
			$mol_assert_equal( user.account(), user.Account.value(), account )
			$mol_assert_equal( account.user(), account.User.value(), null )
			
			account.user( user )
			$mol_assert_equal( account.user(), account.User.value(), user )
			
			const articles = [ user.Articles.remote_add(), user.Articles.remote_add() ]
			$mol_assert_equal( user.articles() ?? [], user.Articles.remote_list(), articles )
			
			$mol_assert_unique( user.land(), account.land(), ... articles.map( article => article.land() ) )
			
		},
		
	})
	
}
