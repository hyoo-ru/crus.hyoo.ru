namespace $ {
	
	export enum $hyoo_crus_slot_kind {
		
		/** Free Unit Slot */
		free = 0b0000_0000,
		
		/** Land header for the following parts. */
		land = 0b0000_0001,
		
		/** Binary identified by hash. */
		ball = 0b0000_0010,
		
		/** B+Tree branch bucket. */
		buck = 0b0000_0011,
		
		/** Rights/Keys sharing. Last writes wins. */
		gift = 0b0000_0111,
		/** Changeable data. Last writes wins. */
		sand = 0b1111_1111,
		
	}
	
}
