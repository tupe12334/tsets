import { And } from './And'
import { Not } from './Not'

/**
 * Logical NAND operation
 *
 * **Mathematical Definition:** A ↑ B is true if NOT both A and B are true
 *
 * @template A First boolean type
 * @template B Second boolean type
 * @example
 * ```typescript
 * type Result1 = Nand<true, true>;   // false
 * type Result2 = Nand<true, false>;  // true
 * type Result3 = Nand<false, true>;  // true
 * type Result4 = Nand<false, false>; // true
 * ```
 */
export type Nand<A extends boolean, B extends boolean> = Not<And<A, B>>
