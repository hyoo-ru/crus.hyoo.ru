namespace $ {

	function html( dom: $hyoo_crus_dom ) {
		return dom.html().replace( / (id|xmlns)=".+?"/g, '' )
	}

	$mol_test({
		
		'plain text'( $ ) {
			
			const left = $hyoo_crus_land.make({ $ }).Data( $hyoo_crus_dom )
			left.html( 'foo bar' )

			$mol_assert_equal( html( left ), '<span>foo</span><span> bar</span>' )

		},
		
		'simple tags'( $ ) {
			
			const left = $hyoo_crus_land.make({ $ }).Data( $hyoo_crus_dom )
			left.html( '<br /><hr />' )
			
			$mol_assert_equal( html( left ), '<br /><hr />' )

		},
		
		'tags with attrs'( $ ) {
			
			const left = $hyoo_crus_land.make({ $ }).Data( $hyoo_crus_dom )
			left.html( '<br hidden="" /><hr tabindex="-1" />' )
			
			$mol_assert_equal( html( left ), '<br hidden="" /><hr tabindex="-1" />' )

		},
		
		'nested tags'( $ ) {
			
			const left = $hyoo_crus_land.make({ $ }).Data( $hyoo_crus_dom )
			left.html( '<p><br /></p>' )
			
			$mol_assert_equal( html( left ), '<p><br /></p>' )

		},
		
		'paragraphs'( $ ) {
			
			const left = $hyoo_crus_land.make({ $ }).Data( $hyoo_crus_dom )
			left.html( '<p>foo bar</p><p>xxx yyy</p>' )
			
			$mol_assert_equal( html( left ), '<p><span>foo</span><span> bar</span></p><p><span>xxx</span><span> yyy</span></p>' )

		},
		
		'import exported html'( $ ) {
			
			const left = $hyoo_crus_land.make({ $ }).Data( $hyoo_crus_dom )
			left.html( 'foo<a data-xxx="yyy" href="hhh:zzz">ton</a>bar' )
			
			const right = $hyoo_crus_land.make({ $ }).Data( $hyoo_crus_dom )
			right.html( left.html() )
			
			$mol_assert_equal( html( left ), html( right ) )
			$mol_assert_equal( left.html(), right.html() )
			
		},
		
		'import wild spans'( $ ) {
			
			const left = $hyoo_crus_land.make({ $ }).Data( $hyoo_crus_dom )
			left.html( '<span>foo bar<a href="hhh:ton"/></span>' )

			$mol_assert_equal( html( left ), '<span>foo</span><span> bar</span><a href="hhh:ton"></a>' )
			
		},
		
	})
}
