/**
 * @fileoverview TSets - TypeScript library for mathematical set operations
 *
 * This library provides compile-time type checking for set theory operations
 * using TypeScript's type system. All operations are performed at compile-time
 * with zero runtime overhead.
 *
 * @author TSets Contributors
 * @version 1.0.0
 */

// Core set type definitions with mathematical notation
export * from './types'

// Disjoint union and tagged union types
export * from './disjoint'

// Logical operations and boolean algebra
export * from './logic'

// Re-export commonly used types for convenience
export type {
  SetLike,
  ElementType,
  Union,
  Intersection,
  Difference,
  IsDisjoint,
  Subset,
  Equal,
  Equale,
  Cardinality,
  IsEmpty,
  CartesianProduct,
  PowerSet,
  SymmetricDifference,
  SetComplement,
  IsDisjointUnion,
  AreAllDisjoint,
} from './types'

export type {
  DisjointUnion,
  TaggedValue,
  ExtractTag,
  ExtractValue,
  FilterByTag,
  PatternMatcher,
  Result,
  Option,
  StateMachine,
  EmptySet,
  Singleton,
} from './disjoint'

export type {
  And,
  Or,
  Not,
  Xor,
  Nand,
  Nor,
  Implies,
  Iff,
  AllTrue,
  AnyTrue,
  IsTrue,
  IsFalse,
  If,
} from './logic'
