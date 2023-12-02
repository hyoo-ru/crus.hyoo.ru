namespace $.$$ {
	
	$mol_test({
		
		"Empty representation"( $ ) {
			
			const land = $hyoo_crowds_area.make({ $ })
			const reg = land.Node( $hyoo_crowds_reg ).Item(0)
			
			$mol_assert_like( reg.value_bool(), false )
			$mol_assert_like( reg.value_int(), 0n )
			$mol_assert_like( reg.value_real(), Number.NaN )
			$mol_assert_like( reg.value_bin(), null )
			$mol_assert_like( reg.value_str(), '' )
			$mol_assert_like( reg.value_ref(), null )
			
		},
		
		"Bool representation"( $ ) {
			
			const land = $hyoo_crowds_area.make({ $ })
			const reg = land.Node( $hyoo_crowds_reg ).Item(0)
			
			reg.value_bool( true )
			$mol_assert_like( reg.value_bool(), true )
			$mol_assert_like( reg.value_int(), 1n )
			$mol_assert_like( reg.value_real(), 1 )
			$mol_assert_like( reg.value_bin(), null )
			$mol_assert_like( reg.value_str(), 'true' )
			$mol_assert_like( reg.value_ref(), null )
			
			reg.value_bool( false )
			$mol_assert_like( reg.value_bool(), false )
			$mol_assert_like( reg.value_int(), 0n )
			$mol_assert_like( reg.value_real(), 0 )
			$mol_assert_like( reg.value_bin(), null )
			$mol_assert_like( reg.value_str(), 'false' )
			$mol_assert_like( reg.value_ref(), null )
			
		},
		
		"Int representation"( $ ) {
			
			const land = $hyoo_crowds_area.make({ $ })
			const reg = land.Node( $hyoo_crowds_reg ).Item(0)
			
			reg.value_int( 4611686018427387904n )
			$mol_assert_like( reg.value_bool(), true )
			$mol_assert_like( reg.value_int(), 4611686018427387904n )
			$mol_assert_like( reg.value_real(), 4611686018427388000 )
			$mol_assert_like( reg.value_bin(), null )
			$mol_assert_like( reg.value_str(), '4611686018427387904' )
			$mol_assert_like( reg.value_ref(), null )
			
			reg.value_int( 0n )
			$mol_assert_like( reg.value_bool(), false )
			$mol_assert_like( reg.value_int(), 0n )
			$mol_assert_like( reg.value_real(), 0 )
			$mol_assert_like( reg.value_bin(), null )
			$mol_assert_like( reg.value_str(), '0' )
			$mol_assert_like( reg.value_ref(), null )
			
		},
		
		"Real representation"( $ ) {
			
			const land = $hyoo_crowds_area.make({ $ })
			const reg = land.Node( $hyoo_crowds_reg ).Item(0)
			
			reg.value_real( Math.PI )
			$mol_assert_like( reg.value_bool(), true )
			$mol_assert_like( reg.value_int(), 3n )
			$mol_assert_like( reg.value_real(), Math.PI )
			$mol_assert_like( reg.value_bin(), null )
			$mol_assert_like( reg.value_str(), '3.141592653589793' )
			$mol_assert_like( reg.value_ref(), null )
			
			reg.value_real( 0 )
			$mol_assert_like( reg.value_bool(), false )
			$mol_assert_like( reg.value_int(), 0n )
			$mol_assert_like( reg.value_real(), 0 )
			$mol_assert_like( reg.value_bin(), null )
			$mol_assert_like( reg.value_str(), '0' )
			$mol_assert_like( reg.value_ref(), null )
			
			reg.value_real( -Math.PI )
			$mol_assert_like( reg.value_bool(), true )
			$mol_assert_like( reg.value_int(), -3n )
			$mol_assert_like( reg.value_real(), -Math.PI )
			$mol_assert_like( reg.value_bin(), null )
			$mol_assert_like( reg.value_str(), '-3.141592653589793' )
			$mol_assert_like( reg.value_ref(), null )
			
			reg.value_real( Number.NaN )
			$mol_assert_like( reg.value_bool(), false )
			$mol_assert_like( reg.value_int(), 0n )
			$mol_assert_like( reg.value_real(), Number.NaN )
			$mol_assert_like( reg.value_bin(), null )
			$mol_assert_like( reg.value_str(), 'NaN' )
			$mol_assert_like( reg.value_ref(), null )
			
			reg.value_real( Number.POSITIVE_INFINITY )
			$mol_assert_like( reg.value_bool(), true )
			$mol_assert_like( reg.value_int(), 0n )
			$mol_assert_like( reg.value_real(), Number.POSITIVE_INFINITY )
			$mol_assert_like( reg.value_bin(), null )
			$mol_assert_like( reg.value_str(), 'Infinity' )
			$mol_assert_like( reg.value_ref(), null )
			
			reg.value_real( Number.NEGATIVE_INFINITY )
			$mol_assert_like( reg.value_bool(), true )
			$mol_assert_like( reg.value_int(), 0n )
			$mol_assert_like( reg.value_real(), Number.NEGATIVE_INFINITY )
			$mol_assert_like( reg.value_bin(), null )
			$mol_assert_like( reg.value_str(), '-Infinity' )
			$mol_assert_like( reg.value_ref(), null )
			
		},
		
		"Bin representation"( $ ) {
			
			const land = $hyoo_crowds_area.make({ $ })
			const reg = land.Node( $hyoo_crowds_reg ).Item(0)
			
			reg.value_bin( new Uint8Array([ 1, 2, 3 ]) )
			$mol_assert_like( reg.value_bool(), true )
			$mol_assert_like( reg.value_int(), 0n )
			$mol_assert_like( reg.value_real(), Number.NaN )
			$mol_assert_like( reg.value_bin(), new Uint8Array([ 1, 2, 3 ]) )
			$mol_assert_like( reg.value_str(), '1,2,3' )
			$mol_assert_like( reg.value_ref(), null )
			
			reg.value_bin( new Uint8Array([ 1,2,3,4,5,6,7,8,9,0, 1,2,3,4,5,6,7,8,9,0, 1,2,3,4,5,6,7,8,9,0, 1,2,3,4,5,6,7,8,9,0 ]) )
			$mol_assert_like( reg.value_bool(), true )
			$mol_assert_like( reg.value_int(), 0n )
			$mol_assert_like( reg.value_real(), Number.NaN )
			$mol_assert_like( reg.value_bin(), new Uint8Array([ 1,2,3,4,5,6,7,8,9,0, 1,2,3,4,5,6,7,8,9,0, 1,2,3,4,5,6,7,8,9,0, 1,2,3,4,5,6,7,8,9,0 ]) )
			$mol_assert_like( reg.value_str(), '1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0' )
			$mol_assert_like( reg.value_ref(), null )
			
			reg.value_bin( null )
			$mol_assert_like( reg.value_bool(), false )
			$mol_assert_like( reg.value_int(), 0n )
			$mol_assert_like( reg.value_real(), Number.NaN )
			$mol_assert_like( reg.value_bin(), null )
			$mol_assert_like( reg.value_str(), '' )
			$mol_assert_like( reg.value_ref(), null )
			
		},
		
		"String representation"( $ ) {
			
			const land = $hyoo_crowds_area.make({ $ })
			const reg = land.Node( $hyoo_crowds_reg ).Item(0)
			
			reg.value_str( 'foo' )
			$mol_assert_like( reg.value_bool(), true )
			$mol_assert_like( reg.value_int(), 0n )
			$mol_assert_like( reg.value_real(), Number.NaN )
			$mol_assert_like( reg.value_bin(), null )
			$mol_assert_like( reg.value_str(), 'foo' )
			$mol_assert_like( reg.value_ref(), null )
			
			reg.value_str( '1234567890123456789012345678901234567890' )
			$mol_assert_like( reg.value_bool(), true )
			$mol_assert_like( reg.value_int(), 1234567890123456789012345678901234567890n )
			$mol_assert_like( reg.value_real(), 1.2345678901234568e+39 )
			$mol_assert_like( reg.value_bin(), null )
			$mol_assert_like( reg.value_str(), '1234567890123456789012345678901234567890' )
			$mol_assert_like( reg.value_ref(), null )
			
			reg.value_str( '' )
			$mol_assert_like( reg.value_bool(), false )
			$mol_assert_like( reg.value_int(), 0n )
			$mol_assert_like( reg.value_real(), Number.NaN )
			$mol_assert_like( reg.value_bin(), null )
			$mol_assert_like( reg.value_str(), '' )
			$mol_assert_like( reg.value_ref(), null )
			
		},
		
		"Reference representation"( $ ) {
			
			const land = $hyoo_crowds_area.make({ $ })
			const reg = land.Node( $hyoo_crowds_reg ).Item(0)
			
			reg.value_ref( reg.ref() )
			$mol_assert_like( reg.value_bool(), true )
			$mol_assert_like( reg.value_int(), land.lord() )
			$mol_assert_like( reg.value_real(), Number.NaN )
			$mol_assert_like( reg.value_bin(), null )
			$mol_assert_like( reg.value_str(), reg.ref().toString() )
			$mol_assert_like( reg.value_ref(), reg.ref() )
			
			reg.value_ref( null )
			$mol_assert_like( reg.value_bool(), false )
			$mol_assert_like( reg.value_int(), 0n )
			$mol_assert_like( reg.value_real(), Number.NaN )
			$mol_assert_like( reg.value_bin(), null )
			$mol_assert_like( reg.value_str(), '' )
			$mol_assert_like( reg.value_ref(), null )
			
		},
		
		"Store custom types"( $ ) {
			
			const land = $hyoo_crowds_area.make({ $ })
			const reg = land.Node( $hyoo_crowds_reg ).Item(0)
			
			$mol_assert_like( reg.value_as( $mol_data_email ), null )
			
			reg.value_as( $mol_data_email, 'foo@exaple.org' )
			$mol_assert_like( reg.value_as( $mol_data_email ), 'foo@exaple.org' )
			
			$mol_assert_fail( ()=> reg.value_as( $mol_data_email, 'xxx' ), 'xxx is not a /.+@.+/' )
			$mol_assert_like( reg.value_as( $mol_data_email ), 'foo@exaple.org' )
			
			reg.value_str( 'xxx' )
			$mol_assert_like( reg.value_as( $mol_data_email ), null )
			
		},
		
		"Hyper link to another land"( $ ) {
			
			const realm = $hyoo_crowds_realm.make({ $ })
			const area = realm.home().base().area()
			
			const reg = area.Node( $hyoo_crowds_reg ).Item(1)
			const remote = reg.yoke( null )!.Root( $hyoo_crowds_reg )
			
			$mol_assert_unique( reg.area(), remote.area() )
			$mol_assert_like( reg.value_ref(), remote.ref() )
			$mol_assert_like( reg.yoke( null )!.Root( $hyoo_crowds_reg ), remote )
			
		},
		
	})
	
}
