namespace $ {

	/** Hint how interpret inner Units: term, solo, vals, keys */
	export enum $hyoo_crus_sand_tag {
		/** Itself value. Ignore */
		term = 0b00,
		/** Value in first sub node. Ignore all after first */
		solo = 0b01,
		/** List of values */
		vals = 0b10,
		/** List of keys */
		keys = 0b11,
	}

	/**  (Meta) Data */
	export class $hyoo_crus_sand extends $hyoo_crus_unit {

		_vary = undefined as undefined | $hyoo_crus_vary_type
		_open = null as null | Uint8Array

		hint(
			tip: keyof typeof $hyoo_crus_vary_tip = 'nil',
			tag: keyof typeof $hyoo_crus_sand_tag = 'term',
		) {
			this.uint8( 0, ( $hyoo_crus_sand_tag[ tag ] << 1 ) | ( $hyoo_crus_vary_tip[ tip ] << 3 ) )
		}

		tag() {
			return $hyoo_crus_sand_tag[ ( this.uint8( 0 ) >> 1 ) & 0b11 ] as keyof typeof $hyoo_crus_sand_tag
		}

		tip() {
			const tip = $hyoo_crus_vary_tip[ this.uint8( 0 ) >> 3 ] || $hyoo_crus_vary_tip.nil
			// if( !tip ) $mol_fail( new Error( 'Empty tip' ) )
			return tip as keyof typeof $hyoo_crus_vary_tip
		}

		utf() {
			return Boolean( this.uint8( 0 ) & 0b10000000 )
		}

		size( next?: number ) {
			return this.uint8( 1, next )
		}

		_head!: $hyoo_crus_link
		head( next?: $hyoo_crus_link ) {
			if( next === undefined && this._head !== undefined ) return this._head
			else return this._head = this.id6( 14, next )
		}

		_self!: $hyoo_crus_link
		self( next?: $hyoo_crus_link ) {
			if( next === undefined && this._self !== undefined ) return this._self
			else return this._self = this.id6( 20, next )
		}

		_lead!: $hyoo_crus_link
		lead( next?: $hyoo_crus_link ) {
			if( next === undefined && this._lead !== undefined ) return this._lead
			else return this._lead = this.id6( 26, next )
		}

		path(): string {
			return `sand:${ this.head() }/${ this.pass().peer() }/${ this.self() }`
		}
		
		ball_link( next?: $hyoo_crus_link ) {
			return this.size() > 32 ? this.id18( 32, next ) : null
		}
		
		_ball = null as Uint8Array< ArrayBuffer > | null
		ball( next?: Uint8Array< ArrayBuffer >) {
			if( next === undefined ) return this._ball
			this.ball_link( $hyoo_crus_link.hash_bin( next ) )
			return this._ball = next
		}

		hash(
			next?: $hyoo_crus_link,
			tip: keyof typeof $hyoo_crus_vary_tip = 'nil' as const,
			tag: keyof typeof $hyoo_crus_sand_tag = 'term',
		): $hyoo_crus_link | null {
			const bin = new Uint8Array( this.buffer, this.byteOffset + 32, 20 )
			if( next !== undefined ) {
				this.hint( tip, tag )
				this.size( 255 )
				bin.set( next.toBin() )
			}
			if( this.size() <= 32 ) return null
			return $hyoo_crus_link.from_bin( bin )
		}

		data(
			next?: Uint8Array,
			tip: keyof typeof $hyoo_crus_vary_tip = 'nil',
			tag: keyof typeof $hyoo_crus_sand_tag = 'term',
		) {
			if( next === undefined ) {
				const size = this.size()
				if( size > 32 ) $mol_fail( new Error( 'Too long data' ) )
				return new Uint8Array( this.buffer, this.byteOffset + 32, size )
			} else {
				this.hint( tip, tag )
				if( next.byteLength > 32 ) $mol_fail( new Error( 'Too long data' ) )
				this.uint8( 1, next.byteLength )
				const bin = new Uint8Array( this.buffer, this.byteOffset + 32, next.byteLength )
				bin.set( next )
				new Uint8Array( this.buffer, this.byteOffset + 32 + next.length, 32 - next.length ).fill( 0 )
				return bin
			}
		}

		idea() {
			const bin = new Uint8Array( this.buffer, this.byteOffset + 20, 44 )
			const hash = $mol_crypto_hash( bin )
			const buf = new $mol_buffer( hash.buffer )
			return buf.uint48( 0 )
		}

		dump() {
			return {
				kind: this.kind(),
				peer: this.pass().peer(),
				lead: this.lead(),
				head: this.head(),
				self: this.self(),
				tip: this.tip(),
				tag: this.tag(),
				size: this.size(),
				time: $hyoo_crus_time_dump( this.time() ),
			}
		}

		rank_min() {
			return $hyoo_crus_rank( $hyoo_crus_rank_tier.post | ( $hyoo_crus_rank_rate.just - this.work() ) )
		}
		
		[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {},
				$mol_dev_format_native( this ),
				' ',
				$mol_dev_format_auto( this.pass_link() ),
				' ',
				this.lead(),
				$mol_dev_format_shade( '\\' ),
				$mol_dev_format_accent( this.head() ),
				$mol_dev_format_shade( '/' ),
				this.self(),
				' ',
				$mol_dev_format_shade(
					$hyoo_crus_time_dump( this.time() ),
					' #',
					this.tick(),
				),
				' ',
				{
					term: '💼',
					solo: '1️⃣',
					vals: '🎹',
					keys: '🔑',
				}[ this.tag() ],
				this.tip(),
				' ',
				$mol_dev_format_auto( this._vary ) //??
				// ( this.size() > 32
				// 	? $mol_dev_format_shade( this.hash() )
				// 	: $mol_dev_format_native( $hyoo_crus_vary_decode({ tip: this.tip(), bin: this.data() }) )
				// ),
			)
		}

	}

}
