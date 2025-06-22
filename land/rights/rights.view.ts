namespace $.$$ {
	export class $hyoo_crus_land_rights extends $.$hyoo_crus_land_rights {
		
		@ $mol_mem
		override gifts() {
			return [ ... this.land().gift.keys() ]
				.map( link => this.Gift( new $hyoo_crus_link( link ) ) )
		}
		
		override peer_id( lord: $hyoo_crus_link ) {
			return lord.str
		}
		
		override peer_name( lord: $hyoo_crus_link ) {
			return this.$.$hyoo_crus_glob.Node( lord, $hyoo_crus_entity ).title() || lord.str
		}
		
		@ $mol_mem_key
		override gift_rank( lord: $hyoo_crus_link, next?: keyof typeof $hyoo_crus_rank_tier ) {
			return $hyoo_crus_rank_tier[ this.land().lord_rank( lord, next && $hyoo_crus_rank_make( next, 'just' ) ) & 0b0_1111_0000 ]
		}
		
		add_commit() {
			const auth = $hyoo_crus_auth_pass.from( this.add_key() )
			this.land().give( auth, $hyoo_crus_rank_read )
			this.add_key( '' )
		}
		
	}
}
