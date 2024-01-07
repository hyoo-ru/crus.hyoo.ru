namespace $ {
	
	export const $hyoo_crus_part_crus = $mol_charset_encode( 'CRUS' )
	
	export enum $hyoo_crus_part {
		
		/** Land header for the following parts. */
		land = 0b0100_0011, //$hyoo_crus_part_crus[0]
		
		/** Last time and units count for peer. */
		face = 0b1110_1111,
		
		/** Public key. First writes wins. */
		pass = 0b1111_1111,
		
		/** Rights/Keys sharing. Last writes wins. */
		gift = 0b1111_0111,
		
		/** Changable data. Last writes wins. */
		gist = 0b0000_0000,
		
		/** Blob request. */
		hash = 0b1111_1101,
		
		/** Blob response. */
		rock = 0b1111_0101,
		
		/** Immutable-B-Trie-Tree bucket. */
		buck = 0b0000_0001,
		
	}
	
}
