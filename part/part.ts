namespace $ {
	
	export enum $hyoo_crus_part {
		
		/** Land header for the following parts. */
		land = 0b1000_0011,
		
		/** Last time and units count for peer. */
		face = 0b1111_1110,
		
		/** Public key. First writes wins. */
		pass = 0b1111_1111,
		
		/** Rights/Keys sharing. Last writes wins. */
		gift = 0b1111_1101,
		
		/** Changable data. Last writes wins. */
		gist = 0b0000_0000,
		
		/** Blob request/response. */
		rock = 0b1000_0100,
		
		/** Immutable-B-Trie-Tree bucket. */
		buck = 0b1000_0111,
		
	}
	
}
