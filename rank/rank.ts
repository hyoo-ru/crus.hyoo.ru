namespace $ {
	
	export const { $hyoo_crus_rank } = $mol_data_tagged({
		$hyoo_crus_rank: $mol_data_pipe(
			$mol_data_integer,
			( rank: number )=> {
				if( rank >= $hyoo_crus_rank_deny && rank <= $hyoo_crus_rank_rule ) return rank
				$mol_fail( new $mol_data_error( `${rank} is out of Ran range` ) )
			}
		),
	}) 
	
	/** Makes Rank from Tier and Fame names. */
	export function $hyoo_crus_rank_make(
		tier: keyof typeof $hyoo_crus_rank_tier,
		fame: keyof typeof $hyoo_crus_rank_rate,
	) {
		return ( $hyoo_crus_rank_tier[ tier ] | $hyoo_crus_rank_rate[ fame ] ) as typeof $hyoo_crus_rank.Value
	}

	/** Access level: deny, read, post, pull, rule */
	export enum $hyoo_crus_rank_tier {

		/** Forbidden. There is no access, neither read nor write. */
		deny = 0b0_0000_0000,

		/** Read only */
		read = 0b0_0001_0000,

		/** Post changes (Sand) */
		post = 0b0_0011_0000,

		/** Pull forks (Sand) */
		pull = 0b0_0111_0000,

		/** Full control (Sand, Gift) */
		rule = 0b0_1111_0000,

	}

	/** Ease of making changes, depends on fame: evil, harm, even, nice, good */
	export enum $hyoo_crus_rank_rate {

		/** Very hard challenge. Minutes to put. */
		late = 0b0_0000,
		
		/** Hard challendge. Tens seconds to put. */
		long = 0b0_0011,

		/** Required some work to prevent spam. Seconds to put. */
		slow = 0b0_0111,

		/** Slow mode. Hundred milliseconds to put. */
		fast = 0b0_1011,

		/** No work required. As fast as possble. Milliseconds to put. */
		just = 0b0_1111,

	}
	
	export const $hyoo_crus_rank_deny = $hyoo_crus_rank_make( 'deny', 'late' )
	export const $hyoo_crus_rank_read = $hyoo_crus_rank_make( 'read', 'late' )
	export const $hyoo_crus_rank_rule = $hyoo_crus_rank_make( 'rule', 'just' )
	
	export function $hyoo_crus_rank_pull(
		rate: keyof typeof $hyoo_crus_rank_rate
	) {
		return $hyoo_crus_rank_make( 'pull', rate )
	}

	export function $hyoo_crus_rank_post(
		rate: keyof typeof $hyoo_crus_rank_rate
	) {
		return $hyoo_crus_rank_make( 'post', rate )
	}

	/** Mapping Pass to Rank */
	export type $hyoo_crus_rank_preset = [ $hyoo_crus_auth_pass | null, typeof $hyoo_crus_rank.Value ][]

}
