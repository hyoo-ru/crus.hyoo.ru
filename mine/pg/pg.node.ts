namespace $ {
	export class $hyoo_crus_mine_pg extends $hyoo_crus_mine {
		
		@ $mol_memo.method
		static url() {
			return new URL( $mol_state_arg.value( 'db' )! || process.env.DATABASE_URL! )
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
					INSERT INTO Pass VALUES(
						$1::bytea, $2::bytea
					)
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
				return unit.choose({
					pass: unit => db.query(
						`
							INSERT INTO Pass VALUES(
								$1::varchar(17), $2::varchar(8), $3::bytea
							)
							ON CONFLICT( land, peer ) DO UPDATE
							SET unit = $3::bytea;
						`,
						[ ref, unit.peer, buf ]
					),
					gift: unit => db.query(
						`
							INSERT INTO Gift VALUES(
								$1::varchar(17), $2::varchar(17), $3::bytea
							)
							ON CONFLICT( land, dest ) DO UPDATE
							SET unit = $3::bytea;
						`,
						[ ref, unit.dest, buf ]
					),
					gist: unit => db.query(
						`
							INSERT INTO Gist VALUES(
								$1::varchar(17), $2::varchar(8), $2::varchar(8), $3::bytea
							)
							ON CONFLICT( land, head, self ) DO UPDATE
							SET unit = $3::bytea;
						`,
						[ ref, unit.head, unit.self, buf ]
					),
				})
			} )
			
			await Promise.all( tasks )
		}
		
		@ $mol_action
		static async units_load( land: $hyoo_crus_land ) {
			
			const db = await this.db()
			if( !db ) return []

			const res = await db.query<{ unit: Uint8Array }>(
				`
					SELECT unit FROM Pass WHERE land = $1::varchar(17)
						UNION
					SELECT unit FROM Gift WHERE land = $1::varchar(17)
						UNION
					SELECT unit FROM Gist WHERE land = $1::varchar(17)
				`,
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
			
			const url = this.url()
			if( !url ) return null
			
			const db = new $node.pg.Pool({
				connectionString: url.toString(),
				ssl: { rejectUnauthorized: false },
			})
			
			await db.connect()
			
			await db.query(`
				CREATE TABLE IF NOT EXISTS Rock (
					hash bytea NOT NULL
					rock bytea NOT NULL
				);
			`)
			
			await db.query(`
				CREATE TABLE IF NOT EXISTS Pass (
					land varchar(17) NOT NULL,
					peer varchar(8) NOT NULL,
					unit bytea NOT NULL
				);
			`)
			
			await db.query(`
				CREATE TABLE IF NOT EXISTS Gift (
					land varchar(17) NOT NULL,
					dest varchar(17) NOT NULL,
					uint bytea NOT NULL
				);
			`)
			
			await db.query(`
				CREATE TABLE IF NOT EXISTS Gist (
					land varchar(17) NOT NULL,
					head varchar(8) NOT NULL,
					self varchar(8) NOT NULL,
					uint bytea NOT NULL
				);
			`)
			
			await db.query(`
				CREATE UNIQUE INDEX IF NOT EXISTS Rock ON Rock ( hash );
			`)
			
			await db.query(`
				CREATE UNIQUE INDEX IF NOT EXISTS Pass ON Pass ( land, peer );
			`)
			
			await db.query(`
				CREATE UNIQUE INDEX IF NOT EXISTS Gift ON Gift ( land, dest );
			`)
			
			await db.query(`
				CREATE UNIQUE INDEX IF NOT EXISTS Gist ON Gist ( land, head, self );
			`)
			
			this.$.$mol_log3_rise({
				place: this,
				message: 'Base Ready',
			})
			
			return db
		}
		
	}
}
