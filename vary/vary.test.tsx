/** @jsx $mol_jsx */
namespace $.$$ {
	
	function check( vary: $hyoo_crowds_vary_type ) {
		$mol_assert_like(
			vary,
			$hyoo_crowds_vary_decode( $hyoo_crowds_vary_encode( vary ) ),
		)
	}	
	
	$mol_test({
		
		"Bin"( $ ) {
			check( null )
			check( new Uint8Array([ 1, 2, 3 ]) )
		},
		
		"Bool"( $ ) {
			check( false )
			check( true )
		},
		
		"Int"( $ ) {
			check( 0n )
			check( 4611686018427387904n )
		},
		
		"Real"( $ ) {
			check( 0 )
			check( Math.PI )
			check( Number.NaN )
			check( Number.POSITIVE_INFINITY )
			check( Number.NEGATIVE_INFINITY )
			check( Number.MAX_SAFE_INTEGER )
			check( Number.MIN_SAFE_INTEGER )
			check( Number.MAX_VALUE )
			check( Number.MIN_VALUE )
		},
		
		"Ref"( $ ) {
			check( $hyoo_crowds_ref.make() )
			check( $hyoo_crowds_ref.make( 4611686018427387904n, 2, 3 ) )
		},
		
		"Str"( $ ) {
			check( '' )
			check( '123' )
			check( '🐱‍👤' )
		},
		
		"Time"( $ ) {
			check( new $mol_time_moment( '1984-08-04T09:05:13.666+03:00' ) )
			check( new $mol_time_moment )
		},
		
		"JSON"( $ ) {
			check({ foo: [ 'bar' ] })
			check([ { foo: 'bar' } ])
		},
		
		"DOM"( $ ) {
			
			const xml = (
				<div>
					<span class="bar">xxx</span>
				</div>
			)
			
			$mol_assert_like(
				$mol_dom_serialize( $hyoo_crowds_vary_decode( $hyoo_crowds_vary_encode( xml ) ) as Node ),
				$mol_dom_serialize( xml ),
			)
			
		},
		
		"Tree"( $ ) {
			
			const tree = $.$mol_tree2_from_string(`
				foo \\bar
					foo \\bar
			`)
			
			$mol_assert_like(
				$.$mol_tree2_to_string( $hyoo_crowds_vary_decode( $hyoo_crowds_vary_encode( tree ) ) as $mol_tree2 ),
				$.$mol_tree2_to_string( tree ),
			)
			
		},
		
	})
	
	
}
