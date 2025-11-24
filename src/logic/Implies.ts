import { Not } from './Not'
import { Or } from './Or'

/**
 * Logical implication operation
 *
 * **Mathematical Definition:** A → B is false only when A is true and B is false
 *
 * @template A Antecedent (if part)
 * @template B Consequent (then part)
 * @example
 * ```typescript
 * type Result1 = Implies<true, true>;   // true
 * type Result2 = Implies<true, false>;  // false
 * type Result3 = Implies<false, true>;  // true
 * type Result4 = Implies<false, false>; // true
 * ```
 */
export type Implies<A extends boolean, B extends boolean> = Or<Not<A>, B>
