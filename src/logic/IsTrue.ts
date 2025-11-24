/**
 * Type-level assertion that a type is true
 *
 * **Mathematical Definition:** Asserts that the proposition is true at compile time
 *
 * @template T Boolean type that should be true
 * @example
 * ```typescript
 * type Test1 = IsTrue<Equal<readonly [1, 2], readonly [1, 2]>>; // true
 * type Test2 = IsTrue<false>; // false
 * ```
 */
export type IsTrue<T extends boolean> = T extends true ? true : false
