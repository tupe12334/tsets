/**
 * N-ary AND operation for multiple boolean values
 *
 * **Mathematical Definition:** ⋀ᵢ Aᵢ is true if all Aᵢ are true
 *
 * @template Bools Tuple of boolean types
 * @example
 * ```typescript
 * type Result1 = AllTrue<[true, true, true]>;     // true
 * type Result2 = AllTrue<[true, false, true]>;    // false
 * type Result3 = AllTrue<[]>;                     // true (vacuous truth)
 * ```
 */
export type AllTrue<Bools extends readonly boolean[]> =
  Bools extends readonly []
    ? true
    : Bools extends readonly [infer Head, ...infer Tail]
      ? Tail extends readonly boolean[]
        ? Head extends true
          ? AllTrue<Tail>
          : false
        : false
      : false
