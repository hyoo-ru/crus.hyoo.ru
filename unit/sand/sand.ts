namespace $ {

	/** Hint how interpret inner Units: term, solo, vals, keys */
	export enum $hyoo_crus_unit_sand_tag {
		/** Itself value. Ignore */
		term = 0b00_000_000,
		/** Value in first sub node. Ignore all after first */
		solo = 0b01_000_000,
		/** List of values */
		vals = 0b10_000_000,
		/** List of keys */
		keys = 0b11_000_000,
	}
	
	/**  (Meta) Data. Actually it's edge between nodes in graph model. */
	export class $hyoo_crus_unit_sand extends $hyoo_crus_unit_base {

		static size_equator = 216
		static size_max = 2 ** 16

		_vary = undefined as undefined | $hyoo_crus_vary_type
		_open = null as Uint8Array< ArrayBuffer > | null
		
		static length( size: number ) {
			if( size >= 2**16 ) throw new Error( `Size too large (${ size })` )
			return size > $hyoo_crus_unit_sand.size_equator ? 52 : Math.ceil( ( 40 + size ) / 8 ) * 8
		}
		
		static length_ball( size: number ) {
			if( size >= 2**16 ) throw new Error( `Size too large (${ size })` )
			return size > $hyoo_crus_unit_sand.size_equator ? Math.ceil( ( 4 + size ) / 8 ) * 8 - 4 : 0
		}

		@ $mol_action
		static make( size: number ) {
			
			const sand = this.from( this.length( size ) )
			sand.kind( 'sand' )
			sand.size( size )
			
			return sand
		}
		
		hint(
			tip: keyof typeof $hyoo_crus_vary_tip = 'nil',
			tag: keyof typeof $hyoo_crus_unit_sand_tag = 'term',
		) {
			this.uint8( 1, $hyoo_crus_unit_sand_tag[ tag ] | $hyoo_crus_vary_tip[ tip ] )
		}

		tag() {
			return $hyoo_crus_unit_sand_tag[ this.uint8( 1 ) & 0b11_000_000 ] as keyof typeof $hyoo_crus_unit_sand_tag
		}

		tip() {
			const tip = $hyoo_crus_vary_tip[ this.uint8( 1 ) & 0b111_111 ] || 'nil'
			return tip as keyof typeof $hyoo_crus_vary_tip
		}

		utf() {
			return Boolean( this.uint8( 1 ) & 0b100_000 )
		}

		size( next?: number ) {
			return this.uint16( 38, next )
		}

		_head!: $hyoo_crus_link
		head( next?: $hyoo_crus_link ) {
			if( next === undefined && this._head !== undefined ) return this._head
			else return this._head = this.id6( 20, next )
		}

		_self!: $hyoo_crus_link
		self( next?: $hyoo_crus_link ) {
			if( next === undefined && this._self !== undefined ) return this._self
			else return this._self = this.id6( 26, next )
		}

		_lead!: $hyoo_crus_link
		lead( next?: $hyoo_crus_link ) {
			if( next === undefined && this._lead !== undefined ) return this._lead
			else return this._lead = this.id6( 32, next )
		}

		path(): string {
			return `sand:${ this.head() }/${ this.lord() }/${ this.self() }`
		}
		
		_shot!: $hyoo_crus_link
		shot( next?: $hyoo_crus_link ) {
			if( this.size() <= $hyoo_crus_unit_sand.size_equator ) throw new Error( 'Access to Shot of small Sand is unavailable' )
			if( next ) return this._shot = this.id12( 40, next )
			else return this._shot = this._shot ?? this.id12( 40 )
		}
		
		_data!: Uint8Array< ArrayBuffer >
		data( next?: Uint8Array< ArrayBuffer > ) {
			
			const size = this.size()
			if( size > $hyoo_crus_unit_sand.size_equator ) throw new Error( 'Access to Data of large Sand is unavailable' )
				
			const data = this._data ?? new Uint8Array( this.buffer, this.byteOffset + 40, size )
			if( next ) data.set( next )
			
			return data
		}

		_ball!: Uint8Array< ArrayBuffer >
		ball( next?: Uint8Array< ArrayBuffer > ) {
			if( next === undefined ) {
				
				if( this._ball ) return this._ball
				
				const size = this.size()
				if( size > $hyoo_crus_unit_sand.size_equator ) return this._ball
				
				return this._ball = this.data()
				
			} else {
				
				this.size( next.byteLength )
				
				if( next.byteLength > $hyoo_crus_unit_sand.size_equator ) {
					
					this.shot( $hyoo_crus_link.hash_bin( next ) )
					return this._ball = next
					
				} else {
					
					return this._ball = this.data( next )
				
				}
				
			}
		}

		idea() {
			const size = this.size()
			const length = 6/*head*/ + 6/*lead*/ + 2/*size*/ + ( size > $hyoo_crus_unit_sand.size_equator ? 12/*shot*/ : size/*data*/ )
			const bin = new Uint8Array( this.buffer, this.byteOffset + 26, length )
			return $mol_hash_numbers( bin )
		}

		dump() {
			return {
				kind: this.kind(),
				lord: this.lord(),
				lead: this.lead(),
				head: this.head(),
				self: this.self(),
				tip: this.tip(),
				tag: this.tag(),
				size: this.size(),
				time: this.moment().toString( 'YYYY-MM-DD hh:mm:ss' ),
			}
		}

		tier_min() {
			return ( this.head().str === $hyoo_crus_land_root.tine.str )
				? $hyoo_crus_rank_tier.pull
				: $hyoo_crus_rank_tier.post
		}
		
		[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {},
				$mol_dev_format_native( this ),
				' ',
				$mol_dev_format_auto( this.lord() ),
				' 📦 ',
				this.lead(),
				$mol_dev_format_shade( '\\' ),
				$mol_dev_format_accent( this.head() ),
				$mol_dev_format_shade( '/' ),
				this.self(),
				' ',
				$mol_dev_format_shade(
					this.moment().toString( 'YYYY-MM-DD hh:mm:ss' ),
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
				$mol_dev_format_auto( this._vary ), //??
				// ( this.size() > 32
				// 	? $mol_dev_format_shade( this.hash() )
				// 	: $mol_dev_format_native( $hyoo_crus_vary_decode({ tip: this.tip(), bin: this.data() }) )
				// ),
				' ',
				$mol_dev_format_auto( this.hash() ),
			)
		}

	}

}
