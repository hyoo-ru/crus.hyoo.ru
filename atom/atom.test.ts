namespace $.$$ {
	
	$mol_test({
		
		"Empty representation"( $ ) {
			
			const land = $hyoo_crus_land.make({ $ })
			const reg = land.Node( $hyoo_crus_atom_time ).Item('')
			
			$mol_assert_equal( reg.value(), null )
			
			reg.value_vary( null )
			$mol_assert_equal( reg.value(), null )
			
		},
		
		"Narrow registers"( $ ) {
			
			const realm = $hyoo_crus_realm.make({ $ })
			const land = realm.home().land()
			
			const bin = land.Node( $hyoo_crus_atom_bin ).Item('11111111')
			$mol_assert_equal( bin.value(), null )
			bin.value( new Uint8Array([ 1, 2, 3 ]) )
			$mol_assert_equal( bin.value(), new Uint8Array([ 1, 2, 3 ]) )
			
			const str = land.Node( $hyoo_crus_atom_str ).Item('22222222')
			$mol_assert_equal( str.value(), null )
			str.value( 'foo' )
			$mol_assert_equal( str.value(), 'foo' )
			
		},
		
		"Store custom types"( $ ) {
			
			class Email extends $hyoo_crus_atom( $mol_data_email ) {}
			
			const land = $hyoo_crus_land.make({ $ })
			const reg = land.Node( Email ).Item('')
			
			$mol_assert_equal( reg.value(), null )
			
			reg.value( 'foo@exaple.org' )
			$mol_assert_equal( reg.value(), 'foo@exaple.org' )
			
			$mol_assert_fail( ()=> reg.value( 'xxx' ), 'xxx is not a /.+@.+/' )
			$mol_assert_equal( reg.value(), 'foo@exaple.org' )
			
			reg.value_vary( 'xxx' )
			$mol_assert_equal( reg.value(), null )
			
		},
		
		"Hyper link to another land"( $ ) {
			
			const realm = $hyoo_crus_realm.make({ $ })
			const land = realm.home().land()
			
			const reg = land.Node( $hyoo_crus_atom_ref_to( ()=> $hyoo_crus_atom_vary ) ).Item( '11111111' )
			const remote = reg.remote_ensure( $hyoo_crus_rank_public )!
			
			$mol_assert_unique( reg.land(), remote.land() )
			$mol_assert_equal( reg.value_vary()!, remote.ref() )
			$mol_assert_equal( reg.remote(), remote )
			
		},
		
		"Register with linked nodes"( $ ) {
			
			const realm = $hyoo_crus_realm.make({ $ })
			const land = realm.home().land()
			
			const str = land.Node( $hyoo_crus_atom_str ).Item('11111111')
			const ref = land.Node( $hyoo_crus_atom_ref_to( ()=> $hyoo_crus_atom_str ) ).Item('11111111')
			$mol_assert_equal( ref.remote(), null )
			
			ref.remote( str )
			$mol_assert_equal( ref.value_vary(), ref.remote()!.ref(), str.ref() )
			
		},
		
		"Enumerated reg type"( $ ) {
			
			class FileType extends $hyoo_crus_atom_enum( [ 'file', 'dir', 'link' ] as const ) {}
			
			type Infered = $mol_type_assert<
				ReturnType< FileType['value'] >,
				'file' | 'dir' | 'link' | null
			>
			
			const realm = $hyoo_crus_realm.make({ $ })
			const land = realm.home().land()
			
			const type = land.Data( FileType )
			$mol_assert_equal( type.value(), null )
			
			type.value( 'file' )
			$mol_assert_equal( type.value(), 'file' )
			
			$mol_assert_fail( ()=> type.value( 'drive' as any ), 'Wrong value (drive)' )
			$mol_assert_equal( type.value(), 'file' )
			
			type.value_vary( 'drive' )
			$mol_assert_equal( type.value(), null )
			
		},
		
	})
	
}
