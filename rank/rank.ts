namespace $ {
	
	export enum $hyoo_crus_rank {
		nil = 0b0000,
		get = 0b0001,
		add = 0b0011,
		mod = 0b0111,
		law = 0b1111,
	}
	
	export type $hyoo_crus_rank_preset = {
		get: ( null | $hyoo_crus_ref )[]
		add: ( null | $hyoo_crus_ref )[]
		mod: ( null | $hyoo_crus_ref )[]
		law: ( null | $hyoo_crus_ref )[]
	}
	
	export let $hyoo_crus_rank_private = {
		get: [],
		add: [],
		mod: [],
		law: [ null ],
	} as $hyoo_crus_rank_preset
	
	export let $hyoo_crus_rank_public = {
		get: [ $hyoo_crus_ref( '' ) ],
		add: [],
		mod: [],
		law: [ null ],
	} as $hyoo_crus_rank_preset
	
	export let $hyoo_crus_rank_lobby = {
		get: [ $hyoo_crus_ref( '' ) ],
		add: [ $hyoo_crus_ref( '' ) ],
		mod: [],
		law: [ null ],
	} as $hyoo_crus_rank_preset
	
	export let $hyoo_crus_rank_orgy = {
		get: [ $hyoo_crus_ref( '' ) ],
		add: [],
		mod: [ $hyoo_crus_ref( '' ) ],
		law: [ null ],
	} as $hyoo_crus_rank_preset
	
}
