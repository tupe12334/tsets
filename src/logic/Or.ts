/**
 * Logical OR operation
 *
 * **Mathematical Definition:** A ∨ B is true if at least one of A or B is true
 *
 * @template A First boolean type
 * @template B Second boolean type
 * @example
 * ```typescript
 * type Result1 = Or<true, true>;   // true
 * type Result2 = Or<true, false>;  // true
 * type Result3 = Or<false, true>;  // true
 * type Result4 = Or<false, false>; // false
 * ```
 */
export type Or<A extends boolean, B extends boolean> = A extends true
  ? true
  : B extends true
    ? true
    : false
