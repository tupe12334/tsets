/**
 * @fileoverview Disjoint union types and tagged union utilities
 * Provides compile-time type checking for disjoint unions (sum types)
 */

import { SetLike, IsDisjoint } from './types'

/**
 * Creates a disjoint union from a record of sets
 *
 * **Mathematical Definition:** A disjoint union ∐ᵢ Aᵢ where each element
 * is tagged with its originating set to maintain distinction
 *
 * @template T Record mapping tags to sets
 * @example
 * ```typescript
 * // With readonly arrays
 * const resultTypes = {
 *   success: ['completed', 'finished'] as const,
 *   error: ['timeout', 'network_error'] as const,
 * } as const;
 *
 * type Result = DisjointUnion<typeof resultTypes>;
 * // Result: { tag: 'success', value: 'completed' | 'finished' } |
 * //         { tag: 'error', value: 'timeout' | 'network_error' }
 *
 * // With Set objects
 * type StatusSets = {
 *   active: Set<'running' | 'pending'>;
 *   inactive: Set<'stopped' | 'paused'>;
 * };
 *
 * type Status = DisjointUnion<StatusSets>;
 * // Result: { tag: 'active', value: 'running' | 'pending' } |
 * //         { tag: 'inactive', value: 'stopped' | 'paused' }
 * ```
 */
export type DisjointUnion<T extends Record<string, SetLike<unknown>>> = {
  readonly [K in keyof T]: {
    readonly tag: K
    readonly value: T[K] extends readonly any[]
      ? T[K][number]
      : T[K] extends Set<infer E>
        ? E
        : never
  }
}[keyof T]

/**
 * Creates a tagged value with a specific tag and value
 *
 * **Mathematical Definition:** An element (t, v) where t is the tag
 * identifying the originating set and v is the value
 *
 * @template Tag The tag type (usually a string literal)
 * @template Value The value type
 * @example
 * ```typescript
 * type Success = TaggedValue<'success', 'completed'>;
 * // Result: { readonly tag: 'success'; readonly value: 'completed'; }
 * ```
 */
export type TaggedValue<Tag extends string | number | symbol, Value> = {
  readonly tag: Tag
  readonly value: Value
}

/**
 * Extracts the tag from a tagged value
 *
 * @template T Tagged value type
 * @example
 * ```typescript
 * type MyTagged = TaggedValue<'success', string>;
 * type Tag = ExtractTag<MyTagged>; // 'success'
 * ```
 */
export type ExtractTag<T extends TaggedValue<any, any>> = T['tag']

/**
 * Extracts the value from a tagged value
 *
 * @template T Tagged value type
 * @example
 * ```typescript
 * type MyTagged = TaggedValue<'success', string>;
 * type Value = ExtractValue<MyTagged>; // string
 * ```
 */
export type ExtractValue<T extends TaggedValue<any, any>> = T['value']

/**
 * Filters a disjoint union by tag, returning only values with the specified tag
 *
 * @template T Disjoint union type
 * @template Tag Tag to filter by
 * @example
 * ```typescript
 * type Union = TaggedValue<'a', number> | TaggedValue<'b', string>;
 * type AValues = FilterByTag<Union, 'a'>; // TaggedValue<'a', number>
 * ```
 */
export type FilterByTag<T extends TaggedValue<any, any>, Tag extends string> =
  T extends TaggedValue<Tag, any> ? T : never

/**
 * Checks if all sets in a record are pairwise disjoint
 *
 * **Mathematical Definition:** Sets A₁, A₂, ..., Aₙ are pairwise disjoint
 * if Aᵢ ∩ Aⱼ = ∅ for all i ≠ j
 *
 * @template T Record of sets
 * @example
 * ```typescript
 * type DisjointSets = {
 *   a: readonly ['x', 'y'];
 *   b: readonly ['z', 'w'];
 * };
 * type AreDisjoint = ArePairwiseDisjoint<DisjointSets>; // true
 * ```
 */
export type ArePairwiseDisjoint<T extends Record<string, SetLike<any>>> = {
  [K1 in keyof T]: {
    [K2 in keyof T]: K1 extends K2 ? true : IsDisjoint<T[K1], T[K2]>
  }[keyof T]
}[keyof T] extends true
  ? true
  : false

/**
 * Creates a pattern matching function type for a disjoint union
 *
 * **Mathematical Definition:** A total function that maps each possible
 * tagged value to a result of type R
 *
 * @template T Disjoint union type
 * @template R Result type
 * @example
 * ```typescript
 * type Union = TaggedValue<'success', string> | TaggedValue<'error', number>;
 * type Matcher = PatternMatcher<Union, boolean>;
 * // Result: {
 * //   success: (value: string) => boolean;
 * //   error: (value: number) => boolean;
 * // }
 * ```
 */
export type PatternMatcher<T extends TaggedValue<any, any>, R> = {
  readonly [K in ExtractTag<T>]: (
    value: ExtractValue<FilterByTag<T, K & string>>
  ) => R
}

/**
 * Represents the empty set ∅ (null set)
 *
 * **Mathematical Definition:** ∅ = {} (the set with no elements)
 *
 * @example
 * ```typescript
 * type Empty = EmptySet; // readonly []
 * type IsEmpty = IsEmpty<EmptySet>; // true
 * ```
 */
export type EmptySet = readonly []

/**
 * Creates a singleton set containing exactly one element
 *
 * **Mathematical Definition:** {a} = the set containing only element a
 *
 * @template T The single element type
 * @example
 * ```typescript
 * type Single = Singleton<'hello'>; // readonly ['hello']
 * ```
 */
export type Singleton<T> = readonly [T]

/**
 * Represents the result of a computation that can either succeed or fail
 *
 * @template S Success value type
 * @template E Error value type
 * @example
 * ```typescript
 * type ApiResult = Result<User, 'network_error' | 'timeout'>;
 * // Result: { tag: 'success', value: User } |
 * //         { tag: 'error', value: 'network_error' | 'timeout' }
 * ```
 */
export type Result<S, E> = TaggedValue<'success', S> | TaggedValue<'error', E>

/**
 * Represents an optional value that may or may not exist
 *
 * @template T The value type
 * @example
 * ```typescript
 * type MaybeString = Option<string>;
 * // Result: { tag: 'some', value: string } | { tag: 'none', value: undefined }
 * ```
 */
export type Option<T> = TaggedValue<'some', T> | TaggedValue<'none', undefined>

/**
 * Creates a type-safe state machine state representation
 *
 * @template States Record mapping state names to their data
 * @example
 * ```typescript
 * type LoadingStates = {
 *   idle: readonly [];
 *   loading: readonly [string]; // loading message
 *   loaded: readonly [any]; // loaded data
 *   error: readonly [string]; // error message
 * };
 * type State = StateMachine<LoadingStates>;
 * ```
 */
export type StateMachine<States extends Record<string, SetLike<any>>> =
  DisjointUnion<States>
