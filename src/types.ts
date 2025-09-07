/**
 * @fileoverview Core type definitions for mathematical set operations
 * Provides compile-time type checking for set theory operations using TypeScript
 */

/**
 * Represents a set-like structure using readonly arrays
 * @template T The type of elements in the set
 * @example
 * ```typescript
 * const mySet: SetLike<string> = ['a', 'b', 'c'] as const;
 * ```
 */
export type SetLike<T> = readonly T[];

/**
 * Creates the union of two sets A ∪ B
 * 
 * **Mathematical Definition:** A ∪ B = {x | x ∈ A or x ∈ B}
 * 
 * @template A First set type
 * @template B Second set type
 * @example
 * ```typescript
 * type SetA = readonly ['a', 'b'];
 * type SetB = readonly ['c', 'd'];
 * type Result = Union<SetA, SetB>; // readonly ["a", "b", "c", "d"]
 * ```
 */
export type Union<A extends SetLike<unknown>, B extends SetLike<unknown>> = 
  readonly [...A, ...B];

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
 * type SetA = readonly ['a', 'b', 'c'];
 * type SetB = readonly ['b', 'c', 'd'];
 * type Result = Intersection<SetA, SetB>; // Elements that are in both sets
 * ```
 */
export type Intersection<A extends SetLike<T>, B extends SetLike<T>, T = unknown> = {
  readonly [K in keyof A]: A[K] extends B[number] ? A[K] : never;
}[number][];

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
 * type SetA = readonly ['a', 'b', 'c'];
 * type SetB = readonly ['b', 'c'];
 * type Result = Difference<SetA, SetB>; // readonly ['a']
 * ```
 */
export type Difference<A extends SetLike<T>, B extends SetLike<T>, T = unknown> = {
  readonly [K in keyof A]: A[K] extends B[number] ? never : A[K];
}[number][];

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
 * type SetA = readonly ['a', 'b'];
 * type SetB = readonly ['c', 'd'];
 * type Result = IsDisjoint<SetA, SetB>; // true
 * ```
 */
export type IsDisjoint<A extends SetLike<T>, B extends SetLike<T>, T = unknown> = 
  Intersection<A, B, T> extends readonly never[] ? true : false;

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
 * type SetA = readonly ['a', 'b'];
 * type SetB = readonly ['a', 'b', 'c'];
 * type Result = Subset<SetA, SetB>; // true
 * ```
 */
export type Subset<A extends SetLike<T>, B extends SetLike<T>, T = unknown> = 
  A[number] extends B[number] ? true : false;

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
 * type SetA = readonly ['a', 'b'];
 * type SetB = readonly ['b', 'a'];
 * type Result = Equal<SetA, SetB>; // true (order doesn't matter in sets)
 * ```
 */
export type Equal<A extends SetLike<T>, B extends SetLike<T>, T = unknown> = 
  Subset<A, B, T> extends true 
    ? Subset<B, A, T> extends true 
      ? true 
      : false 
    : false;

/**
 * Gets the cardinality (size) of a set |A|
 * 
 * **Mathematical Definition:** |A| = number of elements in A
 * 
 * @template T Set type
 * @example
 * ```typescript
 * type MySet = readonly ['a', 'b', 'c'];
 * type Size = Cardinality<MySet>; // 3
 * ```
 */
export type Cardinality<T extends SetLike<unknown>> = T['length'];

/**
 * @deprecated Use Cardinality instead
 */
export type Size<T extends SetLike<unknown>> = Cardinality<T>;

/**
 * Checks if a set is empty (∅)
 * 
 * **Mathematical Definition:** A set is empty if |A| = 0
 * 
 * @template T Set type
 * @example
 * ```typescript
 * type EmptySet = readonly [];
 * type NonEmptySet = readonly ['a'];
 * type IsEmptyResult1 = IsEmpty<EmptySet>; // true
 * type IsEmptyResult2 = IsEmpty<NonEmptySet>; // false
 * ```
 */
export type IsEmpty<T extends SetLike<unknown>> = T extends readonly [] ? true : false;

/**
 * Creates the Cartesian product A × B
 * 
 * **Mathematical Definition:** A × B = {(a,b) | a ∈ A and b ∈ B}
 * 
 * @template A First set type
 * @template B Second set type
 * @example
 * ```typescript
 * type SetA = readonly ['a', 'b'];
 * type SetB = readonly [1, 2];
 * type Product = CartesianProduct<SetA, SetB>;
 * // Result: readonly [['a', 1], ['a', 2], ['b', 1], ['b', 2]]
 * ```
 */
export type CartesianProduct<A extends SetLike<unknown>, B extends SetLike<unknown>> = {
  readonly [I in keyof A]: {
    readonly [J in keyof B]: readonly [A[I], B[J]];
  }[number];
}[number];

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
 * type MySet = readonly ['a', 'b'];
 * type Power = PowerSet<MySet>;
 * // Represents all possible subsets conceptually
 * ```
 */
export type PowerSet<T extends SetLike<unknown>> = readonly (readonly T[number][])[];

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
 * type SetA = readonly ['a', 'b', 'c'];
 * type SetB = readonly ['b', 'c', 'd'];
 * type Result = SymmetricDifference<SetA, SetB>; // Elements in either A or B, but not both
 * ```
 */
export type SymmetricDifference<A extends SetLike<T>, B extends SetLike<T>, T = unknown> =
  Union<Difference<A, B, T>, Difference<B, A, T>>;

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
 * type Universe = readonly ['a', 'b', 'c', 'd'];
 * type SetA = readonly ['a', 'b'];
 * type Complement = SetComplement<Universe, SetA>; // readonly ['c', 'd']
 * ```
 */
export type SetComplement<U extends SetLike<T>, A extends SetLike<T>, T = unknown> =
  Difference<U, A, T>;

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
 * type Test = Equale<readonly [1, 2], readonly [2, 1]>; // true
 * ```
 */
export type Equale<A extends SetLike<T>, B extends SetLike<T>, T = unknown> = Equal<A, B, T>;

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
  C extends SetLike<any> = readonly never[]
> = C extends readonly never[]
  ? IsDisjoint<A, B>
  : IsDisjoint<A, B> extends true
  ? IsDisjoint<A, C> extends true
    ? IsDisjoint<B, C>
    : false
  : false;

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
export type AreAllDisjoint<Sets extends readonly SetLike<any>[]> = Sets extends readonly []
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
  : false;

/**
 * Helper type: checks if a set is disjoint from all sets in a tuple
 * @internal
 */
type AllDisjointFrom<Set extends SetLike<any>, Others extends readonly SetLike<any>[]> = 
  Others extends readonly []
    ? true
    : Others extends readonly [infer Head, ...infer Tail]
    ? Head extends SetLike<any>
      ? Tail extends readonly SetLike<any>[]
        ? IsDisjoint<Set, Head> extends true
          ? AllDisjointFrom<Set, Tail>
          : false
        : false
      : false
    : false;