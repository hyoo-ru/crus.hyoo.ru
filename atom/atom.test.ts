namespace $.$$ {
	
	$mol_test({
		
		"Empty representation"( $ ) {
			
			const land = $hyoo_crus_land.make({ $ })
			const reg = land.Node( $hyoo_crus_atom_time ).Item('')
			
			$mol_assert_equal( reg.val(), null )
			
			reg.vary( null )
			$mol_assert_equal( reg.val(), null )
			
		},
		
		"Narrow registers"( $ ) {
			
			const land = $.$hyoo_crus_realm.home().land()
			
			const bin = land.Node( $hyoo_crus_atom_bin ).Item('11111111')
			$mol_assert_equal( bin.val(), null )
			bin.val( new Uint8Array([ 1, 2, 3 ]) )
			$mol_assert_equal( bin.val(), new Uint8Array([ 1, 2, 3 ]) )
			
			const str = land.Node( $hyoo_crus_atom_str ).Item('22222222')
			$mol_assert_equal( str.val(), null )
			str.val( 'foo' )
			$mol_assert_equal( str.val(), 'foo' )
			
		},
		
		"Store custom types"( $ ) {
			
			class Email extends $hyoo_crus_atom( $mol_data_email ) {}
			
			const land = $hyoo_crus_land.make({ $ })
			const reg = land.Node( Email ).Item('')
			
			$mol_assert_equal( reg.val(), null )
			
			reg.val( 'foo@exaple.org' )
			$mol_assert_equal( reg.val(), 'foo@exaple.org' )
			
			$mol_assert_fail( ()=> reg.val( 'xxx' ), 'xxx is not a /.+@.+/' )
			$mol_assert_equal( reg.val(), 'foo@exaple.org' )
			
			reg.vary( 'xxx' )
			$mol_assert_equal( reg.val(), null )
			
		},
		
		"Hyper link to another land"( $ ) {
			
			const land = $.$hyoo_crus_realm.home().land()
			
			const reg = land.Node( $hyoo_crus_atom_ref_to( ()=> $hyoo_crus_atom_vary ) ).Item( '11111111' )
			const remote = reg.remote_ensure({ '': $hyoo_crus_rank.get })!
			
			$mol_assert_unique( reg.land(), remote.land() )
			$mol_assert_equal( reg.vary()!, remote.ref() )
			$mol_assert_equal( reg.remote(), remote )
			
		},
		
		"Register with linked nodes"( $ ) {
			
			const land = $.$hyoo_crus_realm.home().land()
			
			const str = land.Node( $hyoo_crus_atom_str ).Item('11111111')
			const ref = land.Node( $hyoo_crus_atom_ref_to( ()=> $hyoo_crus_atom_str ) ).Item('11111111')
			$mol_assert_equal( ref.remote(), null )
			
			ref.remote( str )
			$mol_assert_equal( ref.vary(), ref.remote()!.ref(), str.ref() )
			
		},
		
		"Enumerated reg type"( $ ) {
			
			class FileType extends $hyoo_crus_atom_enum( [ 'file', 'dir', 'link' ] as const ) {}
			
			type Infered = $mol_type_assert<
				ReturnType< FileType['val'] >,
				'file' | 'dir' | 'link' | null
			>
			
			const land = $.$hyoo_crus_realm.home().land()
			
			const type = land.Data( FileType )
			$mol_assert_equal( type.val(), null )
			
			type.val( 'file' )
			$mol_assert_equal( type.val(), 'file' )
			
			$mol_assert_fail( ()=> type.val( 'drive' as any ), 'Wrong value (drive)' )
			$mol_assert_equal( type.val(), 'file' )
			
			type.vary( 'drive' )
			$mol_assert_equal( type.val(), null )
			
		},
		
	})
	
}
