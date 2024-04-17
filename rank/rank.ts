namespace $ {
	
	export enum $hyoo_crus_rank {
		nil = 0b0000,
		get = 0b0001,
		add = 0b0011,
		mod = 0b0111,
		law = 0b1111,
	}
	
	export type $hyoo_crus_rank_preset = Record< string, $hyoo_crus_rank >
	
	export let $hyoo_crus_rank_private = {} as $hyoo_crus_rank_preset
	export let $hyoo_crus_rank_public = { '': $hyoo_crus_rank.get } as $hyoo_crus_rank_preset
	export let $hyoo_crus_rank_lobby = { '': $hyoo_crus_rank.add } as $hyoo_crus_rank_preset
	export let $hyoo_crus_rank_orgy = { '': $hyoo_crus_rank.mod } as $hyoo_crus_rank_preset
	
}
