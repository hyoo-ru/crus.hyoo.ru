namespace $.$$ {
	
	$mol_test({
		
		"Cast from blob"( $ ) {
			
			const vary = new Uint8Array([ 1, 2, 3 ])
			
			$mol_assert_equal( $hyoo_crus_vary_cast_blob( vary ), vary )
			$mol_assert_equal( $hyoo_crus_vary_cast_bool( vary ), true )
			$mol_assert_equal( $hyoo_crus_vary_cast_bint( vary ), 3n )
			$mol_assert_equal( $hyoo_crus_vary_cast_real( vary ), 3 )
			$mol_assert_equal( $hyoo_crus_vary_cast_link( vary ), null )
			
			$mol_assert_equal( $hyoo_crus_vary_cast_text( vary ), 'AQID' )
			$mol_assert_equal( $hyoo_crus_vary_cast_time( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dura( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_span( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dict( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_list( vary ), [ 1, 2, 3 ] )
			$mol_assert_equal( $hyoo_crus_vary_cast_elem( vary )?.outerHTML, '<body>AQID</body>' )
			$mol_assert_equal( $hyoo_crus_vary_cast_tree( vary )?.toString(), '\\01\n\\02\n\\03\n' )
			
		},
		
		
		"Cast from false"( $ ) {
			
			const vary = false
			
			$mol_assert_equal( $hyoo_crus_vary_cast_blob( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_bool( vary ), false )
			$mol_assert_equal( $hyoo_crus_vary_cast_bint( vary ), 0n )
			$mol_assert_equal( $hyoo_crus_vary_cast_real( vary ), 0 )
			$mol_assert_equal( $hyoo_crus_vary_cast_link( vary ), null )
			
			$mol_assert_equal( $hyoo_crus_vary_cast_text( vary ), 'false' )
			$mol_assert_equal( $hyoo_crus_vary_cast_time( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dura( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_span( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dict( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_list( vary ), [ false ] )
			$mol_assert_equal( $hyoo_crus_vary_cast_elem( vary )?.outerHTML, '<body>false</body>' )
			$mol_assert_equal( $hyoo_crus_vary_cast_tree( vary )?.toString(), 'false\n' )
			
		},
		
		"Cast from true"( $ ) {
			
			const vary = true
			
			$mol_assert_equal( $hyoo_crus_vary_cast_blob( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_bool( vary ), true )
			$mol_assert_equal( $hyoo_crus_vary_cast_bint( vary ), 1n )
			$mol_assert_equal( $hyoo_crus_vary_cast_real( vary ), 1 )
			$mol_assert_equal( $hyoo_crus_vary_cast_link( vary ), null )
			
			$mol_assert_equal( $hyoo_crus_vary_cast_text( vary ), 'true' )
			$mol_assert_equal( $hyoo_crus_vary_cast_time( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dura( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_span( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dict( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_list( vary ), [ true ] )
			$mol_assert_equal( $hyoo_crus_vary_cast_elem( vary )?.outerHTML, '<body>true</body>' )
			$mol_assert_equal( $hyoo_crus_vary_cast_tree( vary )?.toString(), 'true\n' )
			
		},
		
		"Cast from 0n"( $ ) {
			
			const vary = 0n
			
			$mol_assert_equal( $hyoo_crus_vary_cast_blob( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_bool( vary ), false )
			$mol_assert_equal( $hyoo_crus_vary_cast_bint( vary ), 0n )
			$mol_assert_equal( $hyoo_crus_vary_cast_real( vary ), 0 )
			$mol_assert_equal( $hyoo_crus_vary_cast_link( vary ), null )
			
			$mol_assert_equal( $hyoo_crus_vary_cast_text( vary ), '0' )
			$mol_assert_equal( $hyoo_crus_vary_cast_time( vary )?.toOffset(0).toString(), '1970-01-01T00:00:00+00:00' )
			$mol_assert_equal( $hyoo_crus_vary_cast_dura( vary )?.toString(), 'PT' )
			$mol_assert_equal( $hyoo_crus_vary_cast_span( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dict( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_list( vary ), [ '0' ] )
			$mol_assert_equal( $hyoo_crus_vary_cast_elem( vary )?.outerHTML, '<body>0</body>' )
			$mol_assert_equal( $hyoo_crus_vary_cast_tree( vary )?.toString(), '0\n' )
			
		},
		
		"Cast from big int"( $ ) {
			
			const vary = 4611686018427387903n
			
			$mol_assert_equal( $hyoo_crus_vary_cast_blob( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_bool( vary ), true )
			$mol_assert_equal( $hyoo_crus_vary_cast_bint( vary ), 4611686018427387903n )
			$mol_assert_equal( $hyoo_crus_vary_cast_real( vary ), 4611686018427388000 )
			$mol_assert_equal( $hyoo_crus_vary_cast_link( vary ), null )
			
			$mol_assert_equal( $hyoo_crus_vary_cast_text( vary ), '4611686018427387903' )
			$mol_assert_equal( $hyoo_crus_vary_cast_time( vary )?.toOffset(0).toString(), '10889-08-02T05:31:50.655+00:00' )
			$mol_assert_equal( $hyoo_crus_vary_cast_dura( vary )?.toString(), 'PT281474976710.655S' )
			$mol_assert_equal( $hyoo_crus_vary_cast_span( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dict( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_list( vary ), ['4611686018427387903'] )
			$mol_assert_equal( $hyoo_crus_vary_cast_elem( vary )?.outerHTML, '<body>4611686018427387903</body>' )
			$mol_assert_equal( $hyoo_crus_vary_cast_tree( vary )?.toString(), '4611686018427387903\n' )
			
		},
		
		"Cast from 0"( $ ) {
			
			const vary = 0
			
			$mol_assert_equal( $hyoo_crus_vary_cast_blob( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_bool( vary ), false )
			$mol_assert_equal( $hyoo_crus_vary_cast_bint( vary ), 0n )
			$mol_assert_equal( $hyoo_crus_vary_cast_real( vary ), 0 )
			$mol_assert_equal( $hyoo_crus_vary_cast_link( vary ), null )
			
			$mol_assert_equal( $hyoo_crus_vary_cast_text( vary ), '0' )
			$mol_assert_equal( $hyoo_crus_vary_cast_time( vary )?.toOffset(0).toString(), '1970-01-01T00:00:00+00:00' )
			$mol_assert_equal( $hyoo_crus_vary_cast_dura( vary )?.toString(), 'PT' )
			$mol_assert_equal( $hyoo_crus_vary_cast_span( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dict( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_list( vary ), [0] )
			$mol_assert_equal( $hyoo_crus_vary_cast_elem( vary )?.outerHTML, '<body>0</body>' )
			$mol_assert_equal( $hyoo_crus_vary_cast_tree( vary )?.toString(), '0\n' )
			
		},
		
		"Cast from PI"( $ ) {
			
			const vary = Math.PI
			
			$mol_assert_equal( $hyoo_crus_vary_cast_blob( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_bool( vary ), true )
			$mol_assert_equal( $hyoo_crus_vary_cast_bint( vary ), 3n )
			$mol_assert_equal( $hyoo_crus_vary_cast_real( vary ), Math.PI  )
			$mol_assert_equal( $hyoo_crus_vary_cast_link( vary ), null )
			
			$mol_assert_equal( $hyoo_crus_vary_cast_text( vary ), '3.141592653589793' )
			$mol_assert_equal( $hyoo_crus_vary_cast_time( vary )?.toOffset(0).toString(), '1970-01-01T00:00:00.003+00:00' )
			$mol_assert_equal( $hyoo_crus_vary_cast_dura( vary )?.toString(), "PT0.0031415926535897933S" )
			$mol_assert_equal( $hyoo_crus_vary_cast_span( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dict( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_list( vary ), [Math.PI] )
			$mol_assert_equal( $hyoo_crus_vary_cast_elem( vary )?.outerHTML, '<body>3.141592653589793</body>' )
			$mol_assert_equal( $hyoo_crus_vary_cast_tree( vary )?.toString(), '3.141592653589793\n' )
			
		},
		
		"Cast from NaN"( $ ) {
			
			const vary = Number.NaN
			
			$mol_assert_equal( $hyoo_crus_vary_cast_blob( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_bool( vary ), false )
			$mol_assert_equal( $hyoo_crus_vary_cast_bint( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_real( vary ), Number.NaN )
			$mol_assert_equal( $hyoo_crus_vary_cast_link( vary ), null )
			
			$mol_assert_equal( $hyoo_crus_vary_cast_text( vary ), 'NaN' )
			$mol_assert_equal( $hyoo_crus_vary_cast_time( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dura( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_span( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dict( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_list( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_elem( vary )?.outerHTML, '<body>NaN</body>' )
			$mol_assert_equal( $hyoo_crus_vary_cast_tree( vary )?.toString(), 'NaN\n' )
			
		},
		
		"Cast from Infinity"( $ ) {
			
			const vary = Number.POSITIVE_INFINITY
			
			$mol_assert_equal( $hyoo_crus_vary_cast_blob( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_bool( vary ), true )
			$mol_assert_equal( $hyoo_crus_vary_cast_bint( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_real( vary ), Number.POSITIVE_INFINITY )
			$mol_assert_equal( $hyoo_crus_vary_cast_link( vary ), null )
			
			$mol_assert_equal( $hyoo_crus_vary_cast_text( vary ), 'Infinity' )
			$mol_assert_equal( $hyoo_crus_vary_cast_time( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dura( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_span( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dict( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_list( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_elem( vary )?.outerHTML, '<body>Infinity</body>' )
			$mol_assert_equal( $hyoo_crus_vary_cast_tree( vary )?.toString(), 'Infinity\n' )
			
		},
		
		"Cast from empty string"( $ ) {
			
			const vary = ''
			
			$mol_assert_equal( $hyoo_crus_vary_cast_blob( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_bool( vary ), false )
			$mol_assert_equal( $hyoo_crus_vary_cast_bint( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_real( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_link( vary ), null )
			
			$mol_assert_equal( $hyoo_crus_vary_cast_text( vary ), '' )
			$mol_assert_equal( $hyoo_crus_vary_cast_time( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dura( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_span( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dict( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_list( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_elem( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_tree( vary ), null )
			
		},
		
		"Cast from number string"( $ ) {
			
			const vary = '123456789012345678901234567890123456789'
			
			$mol_assert_equal( $hyoo_crus_vary_cast_blob( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_bool( vary ), true )
			$mol_assert_equal( $hyoo_crus_vary_cast_bint( vary ), 123456789012345678901234567890123456789n )
			$mol_assert_equal( $hyoo_crus_vary_cast_real( vary ), 1.2345678901234568e+38 )
			$mol_assert_equal( $hyoo_crus_vary_cast_link( vary ), null )
			
			$mol_assert_equal( $hyoo_crus_vary_cast_text( vary ), '123456789012345678901234567890123456789' )
			$mol_assert_equal( $hyoo_crus_vary_cast_time( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dura( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_span( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dict( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_list( vary ), [ 1.2345678901234568e+38 ] )
			$mol_assert_equal( $hyoo_crus_vary_cast_elem( vary )?.outerHTML, '<body>123456789012345678901234567890123456789</body>' )
			$mol_assert_equal( $hyoo_crus_vary_cast_tree( vary )?.toString(), '\\123456789012345678901234567890123456789\n' )
			
		},
		
		"Cast from wild string"( $ ) {
			
			const vary = 'foo'
			
			$mol_assert_equal( $hyoo_crus_vary_cast_blob( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_bool( vary ), true )
			$mol_assert_equal( $hyoo_crus_vary_cast_bint( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_real( vary ), Number.NaN )
			$mol_assert_equal( $hyoo_crus_vary_cast_link( vary ), null )
			
			$mol_assert_equal( $hyoo_crus_vary_cast_text( vary ), 'foo' )
			$mol_assert_equal( $hyoo_crus_vary_cast_time( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dura( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_span( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dict( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_list( vary ), [ 'foo' ] )
			$mol_assert_equal( $hyoo_crus_vary_cast_elem( vary )?.outerHTML, '<body>foo</body>' )
			$mol_assert_equal( $hyoo_crus_vary_cast_tree( vary )?.toString(), '\\foo\n' )
			
		},
		
		"Cast from Link"( $ ) {
			
			const vary = new $hyoo_crus_link( 'qwertyui_asdfghjk_zxcvbnm0' )
			
			$mol_assert_equal( $hyoo_crus_vary_cast_blob( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_bool( vary ), true )
			$mol_assert_equal( $hyoo_crus_vary_cast_bint( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_real( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_link( vary ), vary )
			
			$mol_assert_equal( $hyoo_crus_vary_cast_text( vary ), vary.str )
			$mol_assert_equal( $hyoo_crus_vary_cast_time( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dura( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_span( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dict( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_list( vary ), ['qwertyui_asdfghjk_zxcvbnm0'] )
			$mol_assert_equal( $hyoo_crus_vary_cast_elem( vary )?.outerHTML, '<body>qwertyui_asdfghjk_zxcvbnm0</body>' )
			$mol_assert_equal( $hyoo_crus_vary_cast_tree( vary )?.toString(), 'qwertyui_asdfghjk_zxcvbnm0\n' )
			
		},
		
	})
	
}
