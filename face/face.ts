namespace $ {
	
	export type $hyoo_crus_face_data = Iterable< readonly [ peer: string, face: $hyoo_crus_face ] >
	
	export const $hyoo_crus_face_size = 16 // bytes per face
	
	export class $hyoo_crus_face extends Object {
		
		constructor(
			public time = 0,
			public tick = 0,
			public mass = 0,
		) {
			super()
		}
		
		clone() {
			return new $hyoo_crus_face( this.time, this.tick, this.mass )
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
		
		sync_mass( mass: number ) {
			if( this.mass < mass ) this.mass = mass
		}
		
		[ $mol_dev_format_head ]() {
			
			return $mol_dev_format_span( {},
				$mol_dev_format_native( this ),
				$mol_dev_format_shade(
					' ', $hyoo_crus_time_dump( this.time ),
					' #', this.tick,
					' @', this.mass,
				)
			)
			
		}
		
	}
	
	/** Statistics about Units in Land. it's total Units count & dictionary which maps Peer to Time */
	export class $hyoo_crus_face_map extends Map< string, $hyoo_crus_face > {
		
		/** Cumulative face for all peers. */
		face = new $hyoo_crus_face
		
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
			if( right instanceof $hyoo_crus_face_map ) this.face = right.face.clone()
			for( const [ peer, face ] of right ) {
				this.peer_time( peer, face.time, face.tick )
				this.peer_mass( peer, face.mass )
			}
		}
		
		/** Update last time for peer. */
		peer_time(
			peer: string,
			time: number,
			tick: number,
		) {
			
			this.face.sync_time( time, tick )
			
			let prev = this.get( peer )
			if( prev ) prev.sync_time( time, tick )
			else this.set( peer, new $hyoo_crus_face( time, tick ) )
			
		}
		
		/** Update max mass for peer. */
		peer_mass(
			peer: string,
			mass: number,
		) {
			
			this.face.sync_mass( mass )
			
			let prev = this.get( peer )
			if( prev ) prev.sync_mass( mass )
			else this.set( peer, new $hyoo_crus_face( 0, 0, mass ) )
			
		}
		
		peer_mass_shift(
			peer: string,
			diff: number,
		) {
			this.peer_mass( peer, ( this.get( peer )?.mass ?? 0 ) + diff )
		}
		
		/** Generates new time for peer that greater then other seen. */
		@ $mol_action
		tick() {
			const now = $hyoo_crus_time_now()
			if( this.face.time < now ) {
				this.face.time = now
				this.face.tick = 0
			} else {
				this.face.tick += 1
				this.face.tick %= 2**16
				if( !this.face.tick ) ++ this.face.time
			}
			return this.face
		}

		[ $mol_dev_format_head ]() {
			
			return $mol_dev_format_span( {},
				$mol_dev_format_native( this ),
				' ',
				$mol_dev_format_auto( this.face ),
			)
			
		}
		
	}
	
}
