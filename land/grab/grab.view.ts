namespace $.$$ {
	export class $hyoo_crus_land_grab extends $.$hyoo_crus_land_grab {
		
		value( rights?: string ) {
			
			const preset = ( {
				private: {},
				public: { '': $hyoo_crus_rank.get },
				lobby: { '': $hyoo_crus_rank.reg },
				orgy: { '': $hyoo_crus_rank.mod },
			} as Record< string, $hyoo_crus_rank_preset > )[ rights as any ]
			
			if( preset ) this.grab( preset )
			
			return ''
		}
		
	}
}
