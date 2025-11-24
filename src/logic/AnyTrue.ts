/**
 * N-ary OR operation for multiple boolean values
 *
 * **Mathematical Definition:** ⋁ᵢ Aᵢ is true if at least one Aᵢ is true
 *
 * @template Bools Tuple of boolean types
 * @example
 * ```typescript
 * type Result1 = AnyTrue<[false, false, false]>;  // false
 * type Result2 = AnyTrue<[false, true, false]>;   // true
 * type Result3 = AnyTrue<[]>;                     // false
 * ```
 */
export type AnyTrue<Bools extends readonly boolean[]> =
  Bools extends readonly []
    ? false
    : Bools extends readonly [infer Head, ...infer Tail]
      ? Tail extends readonly boolean[]
        ? Head extends true
          ? true
          : AnyTrue<Tail>
        : false
      : false
