namespace $ {
	
	export type $hyoo_crus_face_data = Iterable< readonly [ peer: string, face: $hyoo_crus_face ] >
	
	export class $hyoo_crus_face extends Object {
		
		static length() {
			return 16 as const
		}
		
		constructor(
			public time = 0,
			public tick = 0,
			public summ = 0,
		) {
			super()
		}
		
		clone() {
			return new $hyoo_crus_face( this.time, this.tick, this.summ )
		}
		
		get moment() {
			return $hyoo_crus_time_moment( this.time )
		}
		
		get time_tick() {
			return this.time * 2**16 + this.tick
		}
		
		sync_time( time: number, tick: number ) {
			if( this.time < time ) {
				this.time = time
				this.tick = tick
			} else if( this.time === time && this.tick < tick ) {
				this.tick = tick
			}
		}
		
		sync_summ( summ: number ) {
			if( this.summ < summ ) this.summ = summ
		}
		
		[ $mol_dev_format_head ]() {
			
			return $mol_dev_format_span( {},
				$mol_dev_format_native( this ),
				$mol_dev_format_shade(
					' ', $hyoo_crus_time_dump( this.time ),
					' #', this.tick,
					' @', this.summ,
				)
			)
			
		}
		
	}
	
	/** Statistics about Units in Land. it's total Units count & dictionary which maps Peer to Time */
	export class $hyoo_crus_face_map extends Map< string, $hyoo_crus_face > {
		
		/** Cumulative face for all peers. */
		stat = new $hyoo_crus_face
		
		constructor(
			entries?: $hyoo_crus_face_data
		) {
			super()
			if( entries ) this.sync( entries )
		}
	
		
		clone() {
			return new $hyoo_crus_face_map( this )
		}
		
		/** Synchronize this clock with another. */
		sync( right: $hyoo_crus_face_data ) {
			if( right instanceof $hyoo_crus_face_map ) this.stat = right.stat.clone()
			for( const [ peer, face ] of right ) {
				this.peer_time( peer, face.time, face.tick )
				this.peer_summ( peer, face.summ )
			}
		}
		
		/** Update last time for peer. */
		peer_time(
			peer: string,
			time: number,
			tick: number,
		) {
			
			this.stat.sync_time( time, tick )
			
			let prev = this.get( peer )
			if( prev ) prev.sync_time( time, tick )
			else this.set( peer, new $hyoo_crus_face( time, tick ) )
			
		}
		
		/** Update Summ for Peer. */
		peer_summ(
			peer: string,
			summ: number,
		) {
			
			this.stat.sync_summ( summ )
			
			let prev = this.get( peer )
			if( prev ) prev.sync_summ( summ )
			else this.set( peer, new $hyoo_crus_face( 0, 0, summ ) )
			
		}
		
		peer_summ_shift(
			peer: string,
			diff: number,
		) {
			this.peer_summ( peer, ( this.get( peer )?.summ ?? 0 ) + diff )
		}
		
		/** Generates new time for peer that greater then other seen. */
		@ $mol_action
		tick() {
			const now = $hyoo_crus_time_now()
			if( this.stat.time < now ) {
				this.stat.time = now
				this.stat.tick = 0
			} else {
				this.stat.tick += 1
				this.stat.tick %= 2**16
				if( !this.stat.tick ) ++ this.stat.time
			}
			return this.stat
		}

		[ $mol_dev_format_head ]() {
			
			return $mol_dev_format_span( {},
				$mol_dev_format_native( this ),
				' ',
				$mol_dev_format_auto( this.stat ),
			)
			
		}
		
	}
	
}
