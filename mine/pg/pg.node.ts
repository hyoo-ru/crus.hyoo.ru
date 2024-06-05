namespace $ {
	export class $hyoo_crus_mine_pg extends $hyoo_crus_mine {
		
		@ $mol_memo.method
		static urn() {
			return $mol_state_arg.value( 'db' )
		}
		
		@ $mol_memo.method
		static url() {
			return new URL( this.urn()! )
		}
		
		@ $mol_mem_key
		static rock( hash: Uint8Array, next?: Uint8Array ) {
			$mol_wire_solid()
			if( next ) return next
			return $mol_wire_sync( this ).rock_load( hash )
		}
		
		@ $mol_action
		static rock_save( blob: Uint8Array ) {
			
			const hash = this.hash( blob )
			this.rock( hash, blob )
			
			$mol_wire_sync( this ).db()?.query(
				`
					INSERT INTO Pass VALUES( $1::bytea, $2::bytea )
					ON CONFLICT( hash ) DO NOTHING
				`,
				[ hash, blob ]
			)
			
			return hash
		}
		
		static async rock_load( hash: Uint8Array ) {
			
			const db = await this.db()
			if( !db ) return null
			
			const res = await db.query(
				`SELECT rock FROM Rock WHERE hash = $1::bytea`,
				[ hash ]
			)
			
			return res.rows[0]?.rock as Uint8Array ?? null
		}
		
		static async units_save( land: $hyoo_crus_land, units: readonly $hyoo_crus_unit[] ) {
			
			const db = await this.db()
			if( !db ) return
			
			const tasks = units.map( unit => {
				const ref = land.ref().description
				const buf = Buffer.from( unit.buffer, unit.byteOffset, unit.byteLength )
				return db.query(
					`
						INSERT INTO Land VALUES( $1::varchar(17), $2::varchar(17), $3::bytea )
						ON CONFLICT( land, path ) DO UPDATE SET unit = $3::bytea;
					`,
					[ ref, unit.key, buf ]
				)
			} )
			
			await Promise.all( tasks )
		}
		
		@ $mol_action
		static async units_load( land: $hyoo_crus_land ) {
			
			const db = await this.db()
			if( !db ) return []

			const res = await db.query<{ unit: Uint8Array }>(
				`SELECT unit FROM Land WHERE land = $1::varchar(17)`,
				[ land.ref().description ]
			)
			
			const units = res.rows.map( row => {
				const bin = new $hyoo_crus_unit(
					row.unit.buffer,
					row.unit.byteOffset,
					row.unit.byteLength,
				)
				return bin.narrow()
			})
			
			return units

		}
		
		@ $mol_memo.method
		static async db() {
			
			const urn = this.urn()
			if( !urn ) return null
			
			const db = new $node.pg.Pool({
				connectionString: urn,
				ssl: { rejectUnauthorized: false },
			})
			
			await db.connect()
			
			await db.query(`
				CREATE TABLE IF NOT EXISTS Rock (
					hash bytea NOT NULL,
					rock bytea NOT NULL
				);
			`)
			
			await db.query(`
				CREATE TABLE IF NOT EXISTS Land (
					land varchar(17) NOT NULL,
					path varchar(17) NOT NULL,
					unit bytea NOT NULL
				);
			`)
			
			await db.query(`
				CREATE UNIQUE INDEX IF NOT EXISTS Rock ON Rock ( hash );
			`)
			
			await db.query(`
				CREATE UNIQUE INDEX IF NOT EXISTS Land ON Land ( land, path );
			`)
			
			this.$.$mol_log3_rise({
				place: this,
				message: 'Data Base Ready',
				type: this.url().protocol,
				origin: this.url().origin,
				database: this.url().pathname,
			})
			
			return db
		}
		
	}
}
