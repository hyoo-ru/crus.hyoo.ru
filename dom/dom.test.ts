namespace $ {

	function html( dom: $hyoo_crus_dom ) {
		return dom.html().replace( / (id|xmlns)=".+?"/g, '' )
	}

	$mol_test({
		
		'plain text'( $ ) {
			
			const left = $hyoo_crus_land.make({ $ }).Data( $hyoo_crus_dom )
			left.html( '<body>foo bar</body>' )

			$mol_assert_equal( html( left ), '<body><span>foo </span><span>bar</span></body>' )

		},
		
		'simple tags'( $ ) {
			
			const left = $hyoo_crus_land.make({ $ }).Data( $hyoo_crus_dom )
			left.html( '<body><br /><hr /></body>' )
			
			$mol_assert_equal( html( left ), '<body><br /><hr /></body>' )

		},
		
		'tags with attrs'( $ ) {
			
			const left = $hyoo_crus_land.make({ $ }).Data( $hyoo_crus_dom )
			left.html( '<body><br hidden="" /><hr tabindex="-1" /></body>' )
			
			$mol_assert_equal( html( left ), '<body><br hidden="" /><hr tabindex="-1" /></body>' )

		},
		
		'nested tags'( $ ) {
			
			const left = $hyoo_crus_land.make({ $ }).Data( $hyoo_crus_dom )
			left.html( '<body><p><br /></p></body>' )
			
			$mol_assert_equal( html( left ), '<body><p><br /></p></body>' )

		},
		
		'paragraphs'( $ ) {
			
			const left = $hyoo_crus_land.make({ $ }).Data( $hyoo_crus_dom )
			left.html( '<body><p>foo bar</p><p>xxx yyy</p></body>' )
			
			$mol_assert_equal( html( left ), '<body><p><span>foo </span><span>bar</span></p><p><span>xxx </span><span>yyy</span></p></body>' )

		},
		
		'import exported html'( $ ) {
			
			const left = $hyoo_crus_land.make({ $ }).Data( $hyoo_crus_dom )
			left.html( '<body>foo<a data-xxx="yyy" href="hhh:zzz">ton</a>bar</body>' )
			
			const right = $hyoo_crus_land.make({ $ }).Data( $hyoo_crus_dom )
			right.html( left.html() )
			
			$mol_assert_equal( html( left ), html( right ) )
			$mol_assert_equal( left.html(), right.html() )
			
		},
		
		'import wild spans'( $ ) {
			
			const left = $hyoo_crus_land.make({ $ }).Data( $hyoo_crus_dom )
			left.html( '<body><span>foo bar<a href="hhh:ton"/></span></body>' )

			$mol_assert_equal( html( left ), '<body><span>foo </span><span>bar</span><a href="hhh:ton"></a></body>' )
			
		},
		
	})
}
