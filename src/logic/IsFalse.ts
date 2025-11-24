/**
 * Type-level assertion that a type is false
 *
 * **Mathematical Definition:** Asserts that the proposition is false at compile time
 *
 * @template T Boolean type that should be false
 * @example
 * ```typescript
 * type Test1 = IsFalse<IsDisjoint<readonly [1, 2], readonly [2, 3]>>; // false (they're not disjoint)
 * type Test2 = IsFalse<true>; // false
 * ```
 */
export type IsFalse<T extends boolean> = T extends false ? true : false
