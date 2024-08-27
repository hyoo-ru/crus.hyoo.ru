namespace $ {
	
	/** Access level: nil, get, add, mod, law */
	export enum $hyoo_crus_rank {
		/** 0. Forbidden. There is no access, neither read nor write. */
		nil = 0b0000,
		/** 1. Read only */
		get = 0b0001,
		/** 3. Join only (Pass) */
		add = 0b0011,
		/** 7. Data modification (Pass, Sand) */
		mod = 0b0111,
		/** 15. Full administration (Pass, Sand, Gift) */
		law = 0b1111,
	}
	
	/** Record of Access level: nil, get, add, mod, law */
	export type $hyoo_crus_rank_preset = Record< string, $hyoo_crus_rank >
	
	/** The creator has full rights and no one else has access
	 *  @deprecated inline value */
	export let $hyoo_crus_rank_private = {} as $hyoo_crus_rank_preset
	/** The creator has full rights, but everyone can read it. Rank: get 
	 *  @deprecated inline value */
	export let $hyoo_crus_rank_public = { '': $hyoo_crus_rank.get } as $hyoo_crus_rank_preset
	/** The creator has full rights, but everyone can add one node at a time. Rank: add 
	 *  @deprecated inline value */
	export let $hyoo_crus_rank_lobby = { '': $hyoo_crus_rank.add } as $hyoo_crus_rank_preset
	/** The creator has full rights, but anyone can change the data. Rank: mod 
	 *  @deprecated inline value */
	export let $hyoo_crus_rank_orgy = { '': $hyoo_crus_rank.mod } as $hyoo_crus_rank_preset
	
}
