namespace $ {
	
	export function $hyoo_crus_time_moment( time: number ) {
		const stamp = Math.floor( time / 65536 ) * 1000
		return new $mol_time_moment( stamp )
	}
	
	export function $hyoo_crus_time_counter( time: number ) {
		return time % 65536
	}
	
	export function $hyoo_crus_time_dump( time: number ) {
		return $hyoo_crus_time_moment( time ).toString( 'YYYY-MM-DD hh:mm:ss' )
			+ ' @' + $hyoo_crus_time_counter( time )
	}
	
}
