import { Not } from './Not'
import { Or } from './Or'

/**
 * Logical NOR operation
 *
 * **Mathematical Definition:** A ↓ B is true if neither A nor B is true
 *
 * @template A First boolean type
 * @template B Second boolean type
 * @example
 * ```typescript
 * type Result1 = Nor<true, true>;   // false
 * type Result2 = Nor<true, false>;  // false
 * type Result3 = Nor<false, true>;  // false
 * type Result4 = Nor<false, false>; // true
 * ```
 */
export type Nor<A extends boolean, B extends boolean> = Not<Or<A, B>>
