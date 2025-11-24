/**
 * @fileoverview Core type definitions for mathematical set operations
 * Provides compile-time type checking for set theory operations using TypeScript
 */

/**
 * Represents a set-like structure using readonly arrays or Set objects
 * @template T The type of elements in the set
 * @example
 * ```typescript
 * // Using readonly arrays
 * const myArraySet: SetLike<string> = ['a', 'b', 'c'] as const;
 *
 * // Using Set objects
 * const mySet: SetLike<string> = new Set(['a', 'b', 'c']);
 * ```
 */
export type SetLike<T> = readonly T[] | Set<T>

/**
 * Extracts the element type from a SetLike type
 * @template S SetLike type (readonly array or Set)
 * @internal
 */
export type ElementType<S> = S extends readonly (infer E)[]
  ? E
  : S extends Set<infer E>
    ? E
    : never

/**
 * Creates the union of two sets A ∪ B
 *
 * **Mathematical Definition:** A ∪ B = {x | x ∈ A or x ∈ B}
 *
 * @template A First set type
 * @template B Second set type
 * @example
 * ```typescript
 * // With readonly arrays
 * type SetA = readonly ['a', 'b'];
 * type SetB = readonly ['c', 'd'];
 * type Result = Union<SetA, SetB>; // readonly ["a", "b", "c", "d"]
 *
 * // With Set objects
 * type SetX = Set<'x' | 'y'>;
 * type SetZ = Set<'z' | 'w'>;
 * type ResultSet = Union<SetX, SetZ>; // Set<'x' | 'y' | 'z' | 'w'>
 * ```
 */
export type Union<A extends SetLike<unknown>, B extends SetLike<unknown>> =
  A extends Set<infer TA>
    ? B extends Set<infer TB>
      ? Set<TA | TB>
      : B extends readonly (infer TB)[]
        ? Set<TA | TB>
        : never
    : A extends readonly any[]
      ? B extends Set<infer TB>
        ? readonly [...A, ...(readonly TB[])]
        : B extends readonly any[]
          ? readonly [...A, ...B]
          : never
      : never

/**
 * Creates the intersection of two sets A ∩ B
 *
 * **Mathematical Definition:** A ∩ B = {x | x ∈ A and x ∈ B}
 *
 * @template A First set type
 * @template B Second set type
 * @template T Element type (inferred)
 * @example
 * ```typescript
 * // With readonly arrays
 * type SetA = readonly ['a', 'b', 'c'];
 * type SetB = readonly ['b', 'c', 'd'];
 * type Result = Intersection<SetA, SetB>; // Elements that are in both sets
 *
 * // With Set objects
 * type SetX = Set<'a' | 'b' | 'c'>;
 * type SetY = Set<'b' | 'c' | 'd'>;
 * type ResultSet = Intersection<SetX, SetY>; // Set<'b' | 'c'>
 * ```
 */
export type Intersection<
  A extends SetLike<T>,
  B extends SetLike<T>,
  T = unknown,
> =
  A extends Set<infer TA>
    ? B extends Set<infer TB>
      ? Set<Extract<TA, TB>>
      : B extends readonly (infer TB)[]
        ? Set<Extract<TA, TB>>
        : never
    : A extends readonly any[]
      ? B extends Set<infer TB>
        ? { readonly [K in keyof A]: A[K] extends TB ? A[K] : never }[number][]
        : B extends readonly any[]
          ? {
              readonly [K in keyof A]: A[K] extends B[number] ? A[K] : never
            }[number][]
          : never
      : never

/**
 * Creates the difference of two sets A \ B (also written A - B)
 *
 * **Mathematical Definition:** A \ B = {x | x ∈ A and x ∉ B}
 *
 * @template A First set type
 * @template B Second set type
 * @template T Element type (inferred)
 * @example
 * ```typescript
 * // With readonly arrays
 * type SetA = readonly ['a', 'b', 'c'];
 * type SetB = readonly ['b', 'c'];
 * type Result = Difference<SetA, SetB>; // readonly ['a']
 *
 * // With Set objects
 * type SetX = Set<'a' | 'b' | 'c'>;
 * type SetY = Set<'b' | 'c'>;
 * type ResultSet = Difference<SetX, SetY>; // Set<'a'>
 * ```
 */
export type Difference<
  A extends SetLike<T>,
  B extends SetLike<T>,
  T = unknown,
> =
  A extends Set<infer TA>
    ? B extends Set<infer TB>
      ? Set<Exclude<TA, TB>>
      : B extends readonly (infer TB)[]
        ? Set<Exclude<TA, TB>>
        : never
    : A extends readonly any[]
      ? B extends Set<infer TB>
        ? { readonly [K in keyof A]: A[K] extends TB ? never : A[K] }[number][]
        : B extends readonly any[]
          ? {
              readonly [K in keyof A]: A[K] extends B[number] ? never : A[K]
            }[number][]
          : never
      : never

/**
 * Checks if two sets are disjoint (have no elements in common)
 *
 * **Mathematical Definition:** Sets A and B are disjoint if A ∩ B = ∅
 *
 * @template A First set type
 * @template B Second set type
 * @template T Element type (inferred)
 * @example
 * ```typescript
 * // With readonly arrays
 * type SetA = readonly ['a', 'b'];
 * type SetB = readonly ['c', 'd'];
 * type Result = IsDisjoint<SetA, SetB>; // true
 *
 * // With Set objects
 * type SetX = Set<'a' | 'b'>;
 * type SetY = Set<'c' | 'd'>;
 * type ResultSet = IsDisjoint<SetX, SetY>; // true
 * ```
 */
export type IsDisjoint<
  A extends SetLike<T>,
  B extends SetLike<T>,
  T = unknown,
> =
  A extends Set<infer TA>
    ? B extends Set<infer TB>
      ? Extract<TA, TB> extends never
        ? true
        : false
      : B extends readonly (infer TB)[]
        ? Extract<TA, TB> extends never
          ? true
          : false
        : false
    : A extends readonly any[]
      ? B extends Set<any>
        ? Intersection<A, B, T> extends readonly never[]
          ? true
          : false
        : B extends readonly any[]
          ? Intersection<A, B, T> extends readonly never[]
            ? true
            : false
          : false
      : false

/**
 * Checks if set A is a subset of set B (A ⊆ B)
 *
 * **Mathematical Definition:** A ⊆ B if ∀x (x ∈ A → x ∈ B)
 *
 * @template A Potential subset
 * @template B Potential superset
 * @template T Element type (inferred)
 * @example
 * ```typescript
 * // With readonly arrays
 * type SetA = readonly ['a', 'b'];
 * type SetB = readonly ['a', 'b', 'c'];
 * type Result = Subset<SetA, SetB>; // true
 *
 * // With Set objects
 * type SetX = Set<'a' | 'b'>;
 * type SetY = Set<'a' | 'b' | 'c'>;
 * type ResultSet = Subset<SetX, SetY>; // true
 * ```
 */
export type Subset<A extends SetLike<T>, B extends SetLike<T>, T = unknown> =
  A extends Set<infer TA>
    ? B extends Set<infer TB>
      ? TA extends TB
        ? true
        : false
      : B extends readonly (infer TB)[]
        ? TA extends TB
          ? true
          : false
        : false
    : A extends readonly any[]
      ? B extends Set<infer TB>
        ? A[number] extends TB
          ? true
          : false
        : B extends readonly any[]
          ? A[number] extends B[number]
            ? true
            : false
          : false
      : false

/**
 * Checks if two sets are equal (A = B)
 *
 * **Mathematical Definition:** A = B if A ⊆ B and B ⊆ A
 *
 * @template A First set type
 * @template B Second set type
 * @template T Element type (inferred)
 * @example
 * ```typescript
 * // With readonly arrays
 * type SetA = readonly ['a', 'b'];
 * type SetB = readonly ['b', 'a'];
 * type Result = Equal<SetA, SetB>; // true (order doesn't matter in sets)
 *
 * // With Set objects
 * type SetX = Set<'a' | 'b'>;
 * type SetY = Set<'b' | 'a'>;
 * type ResultSet = Equal<SetX, SetY>; // true
 * ```
 */
export type Equal<A extends SetLike<T>, B extends SetLike<T>, T = unknown> =
  Subset<A, B, T> extends true
    ? Subset<B, A, T> extends true
      ? true
      : false
    : false

/**
 * Gets the cardinality (size) of a set |A|
 *
 * **Mathematical Definition:** |A| = number of elements in A
 *
 * Note: For Set types, this returns the union type size, not a numeric literal
 *
 * @template T Set type
 * @example
 * ```typescript
 * // With readonly arrays
 * type MySet = readonly ['a', 'b', 'c'];
 * type Size = Cardinality<MySet>; // 3
 *
 * // With Set objects - returns number (size known at runtime, not compile time)
 * type MySetObj = Set<'a' | 'b' | 'c'>;
 * type SizeObj = Cardinality<MySetObj>; // number
 * ```
 */
export type Cardinality<T extends SetLike<unknown>> =
  T extends Set<any> ? number : T extends readonly any[] ? T['length'] : never

/**
 * @deprecated Use Cardinality instead
 */
export type Size<T extends SetLike<unknown>> = Cardinality<T>

/**
 * Checks if a set is empty (∅)
 *
 * **Mathematical Definition:** A set is empty if |A| = 0
 *
 * @template T Set type
 * @example
 * ```typescript
 * // With readonly arrays
 * type EmptySet = readonly [];
 * type NonEmptySet = readonly ['a'];
 * type IsEmptyResult1 = IsEmpty<EmptySet>; // true
 * type IsEmptyResult2 = IsEmpty<NonEmptySet>; // false
 *
 * // With Set objects
 * type EmptySetObj = Set<never>;
 * type NonEmptySetObj = Set<'a'>;
 * type IsEmptyResult3 = IsEmpty<EmptySetObj>; // true
 * type IsEmptyResult4 = IsEmpty<NonEmptySetObj>; // false
 * ```
 */
export type IsEmpty<T extends SetLike<unknown>> =
  T extends Set<infer E>
    ? E extends never
      ? true
      : false
    : T extends readonly []
      ? true
      : false

/**
 * Creates the Cartesian product A × B
 *
 * **Mathematical Definition:** A × B = {(a,b) | a ∈ A and b ∈ B}
 *
 * @template A First set type
 * @template B Second set type
 * @example
 * ```typescript
 * // With readonly arrays
 * type SetA = readonly ['a', 'b'];
 * type SetB = readonly [1, 2];
 * type Product = CartesianProduct<SetA, SetB>;
 * // Result: readonly [['a', 1], ['a', 2], ['b', 1], ['b', 2]]
 *
 * // With Set objects
 * type SetX = Set<'a' | 'b'>;
 * type SetY = Set<1 | 2>;
 * type ProductSet = CartesianProduct<SetX, SetY>;
 * // Result: Set<readonly ['a', 1] | readonly ['a', 2] | readonly ['b', 1] | readonly ['b', 2]>
 * ```
 */
export type CartesianProduct<
  A extends SetLike<unknown>,
  B extends SetLike<unknown>,
> =
  A extends Set<infer TA>
    ? B extends Set<infer TB>
      ? Set<readonly [TA, TB]>
      : B extends readonly (infer TB)[]
        ? Set<readonly [TA, TB]>
        : never
    : A extends readonly any[]
      ? B extends Set<infer TB>
        ? { readonly [I in keyof A]: readonly [A[I], TB] }[number]
        : B extends readonly any[]
          ? {
              readonly [I in keyof A]: {
                readonly [J in keyof B]: readonly [A[I], B[J]]
              }[number]
            }[number]
          : never
      : never

/**
 * Creates the power set 𝒫(A) (set of all subsets)
 *
 * **Mathematical Definition:** 𝒫(A) = {S | S ⊆ A}
 *
 * Note: This is a complex type operation with limitations in TypeScript.
 * For practical use, this type represents the concept but may require
 * runtime implementation for actual computation.
 *
 * @template T Set type
 * @example
 * ```typescript
 * // With readonly arrays
 * type MySet = readonly ['a', 'b'];
 * type Power = PowerSet<MySet>;
 * // Represents all possible subsets conceptually
 *
 * // With Set objects
 * type MySetObj = Set<'a' | 'b'>;
 * type PowerObj = PowerSet<MySetObj>;
 * // Set<Set<'a' | 'b'>>
 * ```
 */
export type PowerSet<T extends SetLike<unknown>> =
  T extends Set<infer E>
    ? Set<Set<E>>
    : T extends readonly any[]
      ? readonly (readonly T[number][])[]
      : never

/**
 * Creates the symmetric difference A △ B (also written A ⊕ B)
 *
 * **Mathematical Definition:** A △ B = (A \ B) ∪ (B \ A) = (A ∪ B) \ (A ∩ B)
 *
 * @template A First set type
 * @template B Second set type
 * @template T Element type (inferred)
 * @example
 * ```typescript
 * // With readonly arrays
 * type SetA = readonly ['a', 'b', 'c'];
 * type SetB = readonly ['b', 'c', 'd'];
 * type Result = SymmetricDifference<SetA, SetB>; // Elements in either A or B, but not both
 *
 * // With Set objects
 * type SetX = Set<'a' | 'b' | 'c'>;
 * type SetY = Set<'b' | 'c' | 'd'>;
 * type ResultSet = SymmetricDifference<SetX, SetY>; // Set<'a' | 'd'>
 * ```
 */
export type SymmetricDifference<
  A extends SetLike<T>,
  B extends SetLike<T>,
  T = unknown,
> = Union<Difference<A, B, T>, Difference<B, A, T>>

/**
 * Creates the complement of set A with respect to universal set U
 *
 * **Mathematical Definition:** A^c = U \ A = {x | x ∈ U and x ∉ A}
 *
 * @template U Universal set type
 * @template A Set type to complement
 * @template T Element type (inferred)
 * @example
 * ```typescript
 * // With readonly arrays
 * type Universe = readonly ['a', 'b', 'c', 'd'];
 * type SetA = readonly ['a', 'b'];
 * type Complement = SetComplement<Universe, SetA>; // readonly ['c', 'd']
 *
 * // With Set objects
 * type UniverseSet = Set<'a' | 'b' | 'c' | 'd'>;
 * type SetX = Set<'a' | 'b'>;
 * type ComplementSet = SetComplement<UniverseSet, SetX>; // Set<'c' | 'd'>
 * ```
 */
export type SetComplement<
  U extends SetLike<T>,
  A extends SetLike<T>,
  T = unknown,
> = Difference<U, A, T>

/**
 * Enhanced equality check that works with complex types
 * This is an alias for Equal with better name for logical operations
 *
 * **Mathematical Definition:** A = B if A ⊆ B and B ⊆ A
 *
 * @template A First set type
 * @template B Second set type
 * @template T Element type (inferred)
 * @example
 * ```typescript
 * // With readonly arrays
 * type Test = Equale<readonly [1, 2], readonly [2, 1]>; // true
 *
 * // With Set objects
 * type TestSet = Equale<Set<1 | 2>, Set<2 | 1>>; // true
 * ```
 */
export type Equale<
  A extends SetLike<T>,
  B extends SetLike<T>,
  T = unknown,
> = Equal<A, B, T>

/**
 * Checks if multiple sets are pairwise disjoint
 *
 * **Mathematical Definition:** Sets A₁, A₂, ..., Aₙ are pairwise disjoint
 * if Aᵢ ∩ Aⱼ = ∅ for all i ≠ j
 *
 * @template Sets Tuple of set types
 * @example
 * ```typescript
 * type Test1 = IsDisjointUnion<readonly [1, 2], readonly ['a', 'b'], readonly [true, false]>; // true
 * type Test2 = IsDisjointUnion<readonly [1, 2], readonly [2, 3], readonly [4, 5]>; // false
 * ```
 */
export type IsDisjointUnion<
  A extends SetLike<any>,
  B extends SetLike<any>,
  C extends SetLike<any> = readonly never[],
> = C extends readonly never[]
  ? IsDisjoint<A, B>
  : IsDisjoint<A, B> extends true
    ? IsDisjoint<A, C> extends true
      ? IsDisjoint<B, C>
      : false
    : false

/**
 * Checks if multiple sets (variadic) are all pairwise disjoint
 *
 * **Mathematical Definition:** For sets S₁, S₂, ..., Sₙ, they are pairwise disjoint
 * if for all i ≠ j: Sᵢ ∩ Sⱼ = ∅
 *
 * @template Sets Tuple of set types to check
 * @example
 * ```typescript
 * type Sets = [readonly [1, 2], readonly ['a', 'b'], readonly [true, false]];
 * type AllDisjoint = AreAllDisjoint<Sets>; // true
 * ```
 */
export type AreAllDisjoint<Sets extends readonly SetLike<any>[]> =
  Sets extends readonly []
    ? true
    : Sets extends readonly [infer Head]
      ? Head extends SetLike<any>
        ? true
        : false
      : Sets extends readonly [infer Head, ...infer Tail]
        ? Head extends SetLike<any>
          ? Tail extends readonly SetLike<any>[]
            ? AllDisjointFrom<Head, Tail> extends true
              ? AreAllDisjoint<Tail>
              : false
            : false
          : false
        : false

/**
 * Helper type: checks if a set is disjoint from all sets in a tuple
 * @internal
 */
type AllDisjointFrom<
  Set extends SetLike<any>,
  Others extends readonly SetLike<any>[],
> = Others extends readonly []
  ? true
  : Others extends readonly [infer Head, ...infer Tail]
    ? Head extends SetLike<any>
      ? Tail extends readonly SetLike<any>[]
        ? IsDisjoint<Set, Head> extends true
          ? AllDisjointFrom<Set, Tail>
          : false
        : false
      : false
    : false
