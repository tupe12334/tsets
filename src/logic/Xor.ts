import { And } from './And'
import { Not } from './Not'
import { Or } from './Or'

/**
 * Logical XOR (exclusive or) operation
 *
 * **Mathematical Definition:** A ⊕ B is true if exactly one of A or B is true
 *
 * @template A First boolean type
 * @template B Second boolean type
 * @example
 * ```typescript
 * type Result1 = Xor<true, true>;   // false
 * type Result2 = Xor<true, false>;  // true
 * type Result3 = Xor<false, true>;  // true
 * type Result4 = Xor<false, false>; // false
 * ```
 */
export type Xor<A extends boolean, B extends boolean> = Or<
  And<A, Not<B>>,
  And<Not<A>, B>
>
