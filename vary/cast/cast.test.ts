namespace $.$$ {
	
	$mol_test({
		
		"Cast from bin"( $ ) {
			
			const vary = new Uint8Array([ 1, 2, 3 ])
			
			$mol_assert_equal( $hyoo_crus_vary_cast_bin( vary ), vary )
			$mol_assert_equal( $hyoo_crus_vary_cast_bool( vary ), true )
			$mol_assert_equal( $hyoo_crus_vary_cast_int( vary ), 3n )
			$mol_assert_equal( $hyoo_crus_vary_cast_real( vary ), 3 )
			$mol_assert_equal( $hyoo_crus_vary_cast_ref( vary ), null )
			
			$mol_assert_equal( $hyoo_crus_vary_cast_str( vary ), '010203' )
			$mol_assert_equal( $hyoo_crus_vary_cast_time( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dur( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_range( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_json( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_jsan( vary ), [ 1, 2, 3 ] )
			$mol_assert_equal( $hyoo_crus_vary_cast_dom( vary )?.outerHTML, '<body>AQID</body>' )
			$mol_assert_equal( $hyoo_crus_vary_cast_tree( vary )?.toString(), '\\01\n\\02\n\\03\n' )
			
		},
		
		
		"Cast from false"( $ ) {
			
			const vary = false
			
			$mol_assert_equal( $hyoo_crus_vary_cast_bin( vary ), new Uint8Array([ 0 ]) )
			$mol_assert_equal( $hyoo_crus_vary_cast_bool( vary ), false )
			$mol_assert_equal( $hyoo_crus_vary_cast_int( vary ), 0n )
			$mol_assert_equal( $hyoo_crus_vary_cast_real( vary ), 0 )
			$mol_assert_equal( $hyoo_crus_vary_cast_ref( vary ), null )
			
			$mol_assert_equal( $hyoo_crus_vary_cast_str( vary ), 'false' )
			$mol_assert_equal( $hyoo_crus_vary_cast_time( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dur( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_range( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_json( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_jsan( vary ), [ false ] )
			$mol_assert_equal( $hyoo_crus_vary_cast_dom( vary )?.outerHTML, '<body>false</body>' )
			$mol_assert_equal( $hyoo_crus_vary_cast_tree( vary )?.toString(), 'false\n' )
			
		},
		
		"Cast from true"( $ ) {
			
			const vary = true
			
			$mol_assert_equal( $hyoo_crus_vary_cast_bin( vary ), new Uint8Array([ 1 ]) )
			$mol_assert_equal( $hyoo_crus_vary_cast_bool( vary ), true )
			$mol_assert_equal( $hyoo_crus_vary_cast_int( vary ), 1n )
			$mol_assert_equal( $hyoo_crus_vary_cast_real( vary ), 1 )
			$mol_assert_equal( $hyoo_crus_vary_cast_ref( vary ), null )
			
			$mol_assert_equal( $hyoo_crus_vary_cast_str( vary ), 'true' )
			$mol_assert_equal( $hyoo_crus_vary_cast_time( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dur( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_range( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_json( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_jsan( vary ), [ true ] )
			$mol_assert_equal( $hyoo_crus_vary_cast_dom( vary )?.outerHTML, '<body>true</body>' )
			$mol_assert_equal( $hyoo_crus_vary_cast_tree( vary )?.toString(), 'true\n' )
			
		},
		
		"Cast from 0n"( $ ) {
			
			const vary = 0n
			
			$mol_assert_equal( $hyoo_crus_vary_cast_bin( vary ), new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]) )
			$mol_assert_equal( $hyoo_crus_vary_cast_bool( vary ), false )
			$mol_assert_equal( $hyoo_crus_vary_cast_int( vary ), 0n )
			$mol_assert_equal( $hyoo_crus_vary_cast_real( vary ), 0 )
			$mol_assert_equal( $hyoo_crus_vary_cast_ref( vary ), null )
			
			$mol_assert_equal( $hyoo_crus_vary_cast_str( vary ), '0' )
			$mol_assert_equal( $hyoo_crus_vary_cast_time( vary )?.toOffset(0).toString(), '1970-01-01T00:00:00+00:00' )
			$mol_assert_equal( $hyoo_crus_vary_cast_dur( vary )?.toString(), 'PT' )
			$mol_assert_equal( $hyoo_crus_vary_cast_range( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_json( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_jsan( vary ), [ '0' ] )
			$mol_assert_equal( $hyoo_crus_vary_cast_dom( vary )?.outerHTML, '<body>0</body>' )
			$mol_assert_equal( $hyoo_crus_vary_cast_tree( vary )?.toString(), '0\n' )
			
		},
		
		"Cast from big int"( $ ) {
			
			const vary = 4611686018427387903n
			
			$mol_assert_equal( $hyoo_crus_vary_cast_bin( vary ), new Uint8Array([ 255, 255, 255, 255, 255, 255, 255, 0x3F ]) )
			$mol_assert_equal( $hyoo_crus_vary_cast_bool( vary ), true )
			$mol_assert_equal( $hyoo_crus_vary_cast_int( vary ), 4611686018427387903n )
			$mol_assert_equal( $hyoo_crus_vary_cast_real( vary ), 4611686018427388000 )
			$mol_assert_equal( $hyoo_crus_vary_cast_ref( vary ), null )
			
			$mol_assert_equal( $hyoo_crus_vary_cast_str( vary ), '4611686018427387903' )
			$mol_assert_equal( $hyoo_crus_vary_cast_time( vary )?.toOffset(0).toString(), '10889-08-02T05:31:50.655+00:00' )
			$mol_assert_equal( $hyoo_crus_vary_cast_dur( vary )?.toString(), 'PT281474976710.655S' )
			$mol_assert_equal( $hyoo_crus_vary_cast_range( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_json( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_jsan( vary ), ['4611686018427387903'] )
			$mol_assert_equal( $hyoo_crus_vary_cast_dom( vary )?.outerHTML, '<body>4611686018427387903</body>' )
			$mol_assert_equal( $hyoo_crus_vary_cast_tree( vary )?.toString(), '4611686018427387903\n' )
			
		},
		
		"Cast from 0"( $ ) {
			
			const vary = 0
			
			$mol_assert_equal( $hyoo_crus_vary_cast_bin( vary ), new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]) )
			$mol_assert_equal( $hyoo_crus_vary_cast_bool( vary ), false )
			$mol_assert_equal( $hyoo_crus_vary_cast_int( vary ), 0n )
			$mol_assert_equal( $hyoo_crus_vary_cast_real( vary ), 0 )
			$mol_assert_equal( $hyoo_crus_vary_cast_ref( vary ), null )
			
			$mol_assert_equal( $hyoo_crus_vary_cast_str( vary ), '0' )
			$mol_assert_equal( $hyoo_crus_vary_cast_time( vary )?.toOffset(0).toString(), '1970-01-01T00:00:00+00:00' )
			$mol_assert_equal( $hyoo_crus_vary_cast_dur( vary )?.toString(), 'PT' )
			$mol_assert_equal( $hyoo_crus_vary_cast_range( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_json( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_jsan( vary ), [0] )
			$mol_assert_equal( $hyoo_crus_vary_cast_dom( vary )?.outerHTML, '<body>0</body>' )
			$mol_assert_equal( $hyoo_crus_vary_cast_tree( vary )?.toString(), '0\n' )
			
		},
		
		"Cast from PI"( $ ) {
			
			const vary = Math.PI
			
			$mol_assert_equal( $hyoo_crus_vary_cast_bin( vary ), new Uint8Array([ 24, 45, 68, 84, 251, 33, 9, 64 ]) )
			$mol_assert_equal( $hyoo_crus_vary_cast_bool( vary ), true )
			$mol_assert_equal( $hyoo_crus_vary_cast_int( vary ), 3n )
			$mol_assert_equal( $hyoo_crus_vary_cast_real( vary ), Math.PI  )
			$mol_assert_equal( $hyoo_crus_vary_cast_ref( vary ), null )
			
			$mol_assert_equal( $hyoo_crus_vary_cast_str( vary ), '3.141592653589793' )
			$mol_assert_equal( $hyoo_crus_vary_cast_time( vary )?.toOffset(0).toString(), '1970-01-01T00:00:00.003+00:00' )
			$mol_assert_equal( $hyoo_crus_vary_cast_dur( vary )?.toString(), "PT0.0031415926535897933S" )
			$mol_assert_equal( $hyoo_crus_vary_cast_range( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_json( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_jsan( vary ), [Math.PI] )
			$mol_assert_equal( $hyoo_crus_vary_cast_dom( vary )?.outerHTML, '<body>3.141592653589793</body>' )
			$mol_assert_equal( $hyoo_crus_vary_cast_tree( vary )?.toString(), '3.141592653589793\n' )
			
		},
		
		"Cast from NaN"( $ ) {
			
			const vary = Number.NaN
			
			$mol_assert_equal( $hyoo_crus_vary_cast_bin( vary ), new Uint8Array([ 0, 0, 0, 0, 0, 0, 248, 127 ]) )
			$mol_assert_equal( $hyoo_crus_vary_cast_bool( vary ), false )
			$mol_assert_equal( $hyoo_crus_vary_cast_int( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_real( vary ), Number.NaN )
			$mol_assert_equal( $hyoo_crus_vary_cast_ref( vary ), null )
			
			$mol_assert_equal( $hyoo_crus_vary_cast_str( vary ), 'NaN' )
			$mol_assert_equal( $hyoo_crus_vary_cast_time( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dur( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_range( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_json( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_jsan( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dom( vary )?.outerHTML, '<body>NaN</body>' )
			$mol_assert_equal( $hyoo_crus_vary_cast_tree( vary )?.toString(), 'NaN\n' )
			
		},
		
		"Cast from Infinity"( $ ) {
			
			const vary = Number.POSITIVE_INFINITY
			
			$mol_assert_equal( $hyoo_crus_vary_cast_bin( vary ), new Uint8Array([ 0, 0, 0, 0, 0, 0, 240, 127 ]) )
			$mol_assert_equal( $hyoo_crus_vary_cast_bool( vary ), true )
			$mol_assert_equal( $hyoo_crus_vary_cast_int( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_real( vary ), Number.POSITIVE_INFINITY )
			$mol_assert_equal( $hyoo_crus_vary_cast_ref( vary ), null )
			
			$mol_assert_equal( $hyoo_crus_vary_cast_str( vary ), 'Infinity' )
			$mol_assert_equal( $hyoo_crus_vary_cast_time( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dur( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_range( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_json( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_jsan( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dom( vary )?.outerHTML, '<body>Infinity</body>' )
			$mol_assert_equal( $hyoo_crus_vary_cast_tree( vary )?.toString(), 'Infinity\n' )
			
		},
		
		"Cast from empty string"( $ ) {
			
			const vary = ''
			
			$mol_assert_equal( $hyoo_crus_vary_cast_bin( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_bool( vary ), false )
			$mol_assert_equal( $hyoo_crus_vary_cast_int( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_real( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_ref( vary ), null )
			
			$mol_assert_equal( $hyoo_crus_vary_cast_str( vary ), '' )
			$mol_assert_equal( $hyoo_crus_vary_cast_time( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dur( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_range( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_json( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_jsan( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dom( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_tree( vary ), null )
			
		},
		
		"Cast from number string"( $ ) {
			
			const vary = '123456789012345678901234567890123456789'
			
			$mol_assert_equal( $hyoo_crus_vary_cast_bin( vary ), new Uint8Array([
				49, 50, 51, 52, 53, 54, 55, 56, 57, 48,
				49, 50, 51, 52, 53, 54, 55, 56, 57, 48,
				49, 50, 51, 52, 53, 54, 55, 56, 57, 48,
				49, 50, 51, 52, 53, 54, 55, 56, 57,
			]) )
			$mol_assert_equal( $hyoo_crus_vary_cast_bool( vary ), true )
			$mol_assert_equal( $hyoo_crus_vary_cast_int( vary ), 123456789012345678901234567890123456789n )
			$mol_assert_equal( $hyoo_crus_vary_cast_real( vary ), 1.2345678901234568e+38 )
			$mol_assert_equal( $hyoo_crus_vary_cast_ref( vary ), null )
			
			$mol_assert_equal( $hyoo_crus_vary_cast_str( vary ), '123456789012345678901234567890123456789' )
			$mol_assert_equal( $hyoo_crus_vary_cast_time( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dur( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_range( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_json( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_jsan( vary ), [ 1.2345678901234568e+38 ] )
			$mol_assert_equal( $hyoo_crus_vary_cast_dom( vary )?.outerHTML, '<body>123456789012345678901234567890123456789</body>' )
			$mol_assert_equal( $hyoo_crus_vary_cast_tree( vary )?.toString(), '\\123456789012345678901234567890123456789\n' )
			
		},
		
		"Cast from wild string"( $ ) {
			
			const vary = 'foo'
			
			$mol_assert_equal( $hyoo_crus_vary_cast_bin( vary ), new Uint8Array([ 102, 111, 111 ]) )
			$mol_assert_equal( $hyoo_crus_vary_cast_bool( vary ), true )
			$mol_assert_equal( $hyoo_crus_vary_cast_int( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_real( vary ), Number.NaN )
			$mol_assert_equal( $hyoo_crus_vary_cast_ref( vary ), null )
			
			$mol_assert_equal( $hyoo_crus_vary_cast_str( vary ), 'foo' )
			$mol_assert_equal( $hyoo_crus_vary_cast_time( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dur( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_range( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_json( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_jsan( vary ), [ 'foo' ] )
			$mol_assert_equal( $hyoo_crus_vary_cast_dom( vary )?.outerHTML, '<body>foo</body>' )
			$mol_assert_equal( $hyoo_crus_vary_cast_tree( vary )?.toString(), '\\foo\n' )
			
		},
		
		"Cast from ref"( $ ) {
			
			const vary = $hyoo_crus_ref( 'qwertyui_asdfghjk_zxcvbnm0' )
			
			$mol_assert_equal( $hyoo_crus_vary_cast_bin( vary ), new Uint8Array([
				171, 7, 171, 183, 43, 162,
				106, 199, 95, 130, 24, 228,
				207, 23, 47, 110, 121, 180,
			]) )
			$mol_assert_equal( $hyoo_crus_vary_cast_bool( vary ), true )
			$mol_assert_equal( $hyoo_crus_vary_cast_int( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_real( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_ref( vary ), vary )
			
			$mol_assert_equal( $hyoo_crus_vary_cast_str( vary ), vary.description! )
			$mol_assert_equal( $hyoo_crus_vary_cast_time( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_dur( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_range( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_json( vary ), null )
			$mol_assert_equal( $hyoo_crus_vary_cast_jsan( vary ), ['qwertyui_asdfghjk_zxcvbnm0'] )
			$mol_assert_equal( $hyoo_crus_vary_cast_dom( vary )?.outerHTML, '<body>qwertyui_asdfghjk_zxcvbnm0</body>' )
			$mol_assert_equal( $hyoo_crus_vary_cast_tree( vary )?.toString(), 'qwertyui_asdfghjk_zxcvbnm0\n' )
			
		},
		
	})
	
}
