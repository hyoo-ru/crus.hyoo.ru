namespace $ {
	
	/** Moment from time. */
	export function $hyoo_crus_time_moment( time: number ) {
		const stamp = Math.floor( time / 65536 ) * 1000
		return new $mol_time_moment( stamp )
	}
	
	/** Tick from time. */
	export function $hyoo_crus_time_tick( time: number ) {
		return time % 65536
	}
	
	/** User readable time+tick view. */
	export function $hyoo_crus_time_dump( time: number ) {
		return $hyoo_crus_time_moment( time ).toString( 'YYYY-MM-DD hh:mm:ss' )
		+ ' @' + $hyoo_crus_time_tick( time )
	}

	/** Current time with 0 tick. */
	export function $hyoo_crus_time_now() {
		return now || Math.floor( Date.now() / 1000 ) * 65536
	}
	
	let now = 0

	/** Run atomic transaction by temp freezing time. */
	export function $hyoo_crus_time_freeze( task: ()=> void ) {

		if( now ) return task()
		
		now = $hyoo_crus_time_now()
		try {
			return task()
		} finally {
			now = 0
		}

	}
	
}
