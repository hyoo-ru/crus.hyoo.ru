namespace $.$$ {
	
	const auth1 = $hyoo_crus_auth.from( '_4eLnQsSr5wj6XOzgS5bZa254pkEOf_hg1nReCSR4Zkd-E07aLSwj-II-rZt4ZubInw_f1rZiA0Qa92qR0Gq3I6xYWCkW9Aagc7-97L2P-gI84NaLwdabp_DrZEX3RJTY' )
	
	$mol_test({
		
		async 'Dictionary invariants'( $ ) {
			
			const land = $hyoo_crus_land.make({ $ })
			const dict = land.Node( $hyoo_crus_dict ).Data()
			$mol_assert_equal( dict.keys(), [] )
			
			dict.dive( 123, $hyoo_crus_atom_vary, null )
			dict.dive( 'xxx', $hyoo_crus_atom_vary, null )
			$mol_assert_equal( dict.keys(), [ 'xxx', 123 ] )
			$mol_assert_equal( dict.has( 123 ), true )
			$mol_assert_equal( dict.has( 'xxx' ), true )
			$mol_assert_equal( dict.has( 'yyy' ), false )
			$mol_assert_equal( dict.dive( 123, $hyoo_crus_atom_vary )!.vary(), null )
			$mol_assert_equal( dict.dive( 'xxx', $hyoo_crus_atom_vary )!.vary(), null )
			
			dict.dive( 123, $hyoo_crus_atom_vary )!.vary( 777 )
			$mol_assert_equal( dict.dive( 123, $hyoo_crus_atom_vary )!.vary(), 777 )

			dict.dive( 'xxx', $hyoo_crus_list_vary )!.items_vary([ 'foo', 'bar' ])
			$mol_assert_equal( dict.dive( 'xxx', $hyoo_crus_list_vary )!.items_vary(), [ 'foo', 'bar' ] )
			
			dict.has( 123, false )
			$mol_assert_equal( dict.keys(), [ 'xxx' ] )

		},
		
		async 'Dictionary merge'( $ ) {
			
			const land1 = $hyoo_crus_land.make({ $ })
			const land2 = $hyoo_crus_land.make({ $ })
			
			const dict1 = land1.Node( $hyoo_crus_dict ).Data()
			const dict2 = land2.Node( $hyoo_crus_dict ).Data()

			dict1.dive( 123, $hyoo_crus_atom_vary, null )!.vary( 666 )
			land2.faces.tick()
			dict2.dive( 123, $hyoo_crus_atom_vary, null )!.vary( 777 )
			land1.diff_apply( land2.diff_units() )
			$mol_assert_equal( dict1.dive( 123, $hyoo_crus_atom_vary )!.vary(), 777 )
			
			dict1.dive( 'xxx', $hyoo_crus_list_vary, null )!.items_vary([ 'foo' ])
			land2.faces.tick()
			dict2.dive( 'xxx', $hyoo_crus_list_vary, null )!.items_vary([ 'bar' ])
			land1.diff_apply( land2.diff_units() )
			$mol_assert_equal( dict1.dive( 'xxx', $hyoo_crus_list_vary )!.items_vary(), [ 'bar', 'foo' ] )

		},
		
		"Narrowed Dictionary with linked Dictionaries and others"( $ ) {
			
			class User extends $hyoo_crus_dict.with({
				Title: $hyoo_crus_atom_str,
				Account: $hyoo_crus_atom_link_to( ()=> Account ),
				Articles: $hyoo_crus_list_link_to( ()=> Article ),
			}) {}
			
			class Account extends $hyoo_crus_dict.with({
				Title: $hyoo_crus_atom_str,
				User: $hyoo_crus_atom_link_to( ()=> User ),
			}) {}
			
			class Article extends $hyoo_crus_dict.with({
				Title: $hyoo_crus_dict_to( $hyoo_crus_atom_str ),
				Author: $hyoo_crus_atom_link_to( ()=> User ),
			}) {}
			
			const land = $.$hyoo_crus_glob.home().land()
			
			const user = land.Node( User ).Item( new $hyoo_crus_link( '11111111' ) )
			$mol_assert_equal( user.Title()?.val() ?? null, null )
			$mol_assert_equal( user.Account()?.remote() ?? null, null )
			$mol_assert_equal( user.Articles()?.remote_list() ?? [], [] )
			
			user.Title(null)!.val( 'Jin' )
			$mol_assert_equal( user.Title()!.val() ?? '', 'Jin' )
			
			const account = user.Account(null)!.ensure([[ null, $hyoo_crus_rank_read ]])!
			$mol_assert_equal( user.Account()?.remote() ?? null, account )
			$mol_assert_equal( account.User()?.remote() ?? null, null )
			
			account.User(null)!.remote( user )
			$mol_assert_equal( account.User()?.remote(), user )
			
			const articles = [
				user.Articles(null)!.make([[ null, $hyoo_crus_rank_read ]]),
				user.Articles(null)!.make([[ null, $hyoo_crus_rank_read ]]),
			]
			$mol_assert_equal( user.Articles()?.remote_list(), articles )
			
			articles[0].Title(null)!.key( 'en', 'auto' )!.val( 'Hello!' )
			$mol_assert_equal(
				articles[0].Title()?.key( 'en' )!.val(),
				'Hello!',
			)
			$mol_assert_equal( articles[1].Title()?.key( 'ru' )?.val() ?? null, null )
			$mol_assert_equal(
				articles[1].Title()?.key( 'ru' )?.val() ?? null,
				null,
			)
			
			$mol_assert_unique( user.land(), account.land(), ... articles.map( article => article.land() ) )
			
		},
		
	})
	
}
