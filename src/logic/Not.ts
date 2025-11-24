/**
 * Logical NOT operation
 *
 * **Mathematical Definition:** ¬A is true if A is false, and false if A is true
 *
 * @template A Boolean type to negate
 * @example
 * ```typescript
 * type Result1 = Not<true>;  // false
 * type Result2 = Not<false>; // true
 * ```
 */
export type Not<A extends boolean> = A extends true ? false : true
