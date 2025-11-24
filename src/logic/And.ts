/**
 * Logical AND operation
 *
 * **Mathematical Definition:** A ∧ B is true if both A and B are true
 *
 * @template A First boolean type
 * @template B Second boolean type
 * @example
 * ```typescript
 * type Result1 = And<true, true>;   // true
 * type Result2 = And<true, false>;  // false
 * type Result3 = And<false, true>;  // false
 * type Result4 = And<false, false>; // false
 * ```
 */
export type And<A extends boolean, B extends boolean> = A extends true
  ? B extends true
    ? true
    : false
  : false
