/**
 * @fileoverview Advanced logical operations examples
 * Demonstrates complex compile-time logic with set operations
 */

import type {
  Union,
  Intersection,
  Equale,
  EmptySet,
  IsDisjointUnion,
  And,
  Or,
  Not,
  IsTrue,
  IsFalse,
  AllTrue,
  AnyTrue,
  If,
  SetLike,
} from "../src";

// Example: Your requested complex logical validation
// IsTrue<And<Equale<Union<A,B>,C>, Equale<Intersection<A,B>, EmptySet>>>

type SetA = readonly [1, 2, 3];
type SetB = readonly [4, 5, 6];
type SetC = readonly [1, 2, 3, 4, 5, 6];

// Test if A ∪ B = C AND A ∩ B = ∅
type ComplexTest = IsTrue<
  And<
    Equale<Union<SetA, SetB>, SetC>,
    Equale<Intersection<SetA, SetB>, EmptySet>
  >
>; // true - A and B are disjoint and their union equals C

// Example: IsDisjointUnion<A,B,C>
type SetX = readonly ["a", "b"];
type SetY = readonly ["c", "d"];
type SetZ = readonly ["e", "f"];

type ThreeWayDisjoint = IsDisjointUnion<SetX, SetY, SetZ>; // true

// Complex logical expressions
type Numbers = readonly [1, 2, 3];
type Letters = readonly ["x", "y", "z"];
type Symbols = readonly ["!", "@", "#"];

// Test multiple conditions
type ComplexLogic = IsTrue<
  And<
    And<
      IsDisjointUnion<Numbers, Letters, Symbols>,
      Equale<Union<Numbers, Letters>, readonly [1, 2, 3, "x", "y", "z"]>
    >,
    Equale<Intersection<Numbers, Letters>, EmptySet>
  >
>; // true

// Real-world example: API state validation
const apiStates = {
  idle: [] as const,
  loading: ["request_id"] as const,
  success: ["data"] as const,
  error: ["error_code", "message"] as const,
} as const;

// Validate that all API states are disjoint
type ApiStatesDisjoint = IsTrue<
  And<
    And<
      IsDisjointUnion<typeof apiStates.idle, typeof apiStates.loading>,
      IsDisjointUnion<typeof apiStates.idle, typeof apiStates.success>
    >,
    And<
      IsDisjointUnion<typeof apiStates.idle, typeof apiStates.error>,
      And<
        IsDisjointUnion<typeof apiStates.loading, typeof apiStates.success>,
        And<
          IsDisjointUnion<typeof apiStates.loading, typeof apiStates.error>,
          IsDisjointUnion<typeof apiStates.success, typeof apiStates.error>
        >
      >
    >
  >
>; // true

// Using AllTrue for cleaner syntax
type ApiStatesDisjointCleaner = IsTrue<
  AllTrue<
    [
      IsDisjointUnion<typeof apiStates.idle, typeof apiStates.loading>,
      IsDisjointUnion<typeof apiStates.idle, typeof apiStates.success>,
      IsDisjointUnion<typeof apiStates.idle, typeof apiStates.error>,
      IsDisjointUnion<typeof apiStates.loading, typeof apiStates.success>,
      IsDisjointUnion<typeof apiStates.loading, typeof apiStates.error>,
      IsDisjointUnion<typeof apiStates.success, typeof apiStates.error>
    ]
  >
>; // true

// Conditional type selection based on logical conditions
type UserRoles = readonly ["admin", "user", "guest"];
type AdminRoles = readonly ["admin"];
type GuestRoles = readonly ["guest"];

type CanAccessAdmin = If<
  Equale<Intersection<UserRoles, AdminRoles>, readonly ["admin"]>,
  "Access Granted",
  "Access Denied"
>; // 'Access Granted'

// Complex set theory proofs at type level
type ProveSetIdentity = IsTrue<
  Equale<Union<SetA, Intersection<SetA, SetB>>, SetA>
>; // Absorption law: A ∪ (A ∩ B) = A

// De Morgan's laws for sets (using complement would need universe)
type Universe = readonly [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
type Set1 = readonly [1, 2, 3];
type Set2 = readonly [4, 5, 6];

// Prove logical equivalence
type LogicalEquivalence = IsTrue<
  And<
    // If A and B are disjoint, then A ∪ B has cardinality |A| + |B|
    IsDisjointUnion<Set1, Set2>,
    // And their intersection is empty
    Equale<Intersection<Set1, Set2>, EmptySet>
  >
>; // true

// Advanced: Conditional logic based on set properties
type SmallSet = readonly [1, 2];
type LargeSet = readonly [1, 2, 3, 4, 5];

type SetCategory<S extends SetLike<unknown>> = If<
  IsTrue<
    And<
      Not<Equale<S, EmptySet>>,
      IsTrue<
        S["length"] extends infer L
          ? L extends number
            ? L extends 0 | 1 | 2
              ? true
              : false
            : false
          : false
      >
    >
  >,
  "Small",
  "Large"
>;

type SmallSetCategory = SetCategory<SmallSet>; // 'Small'
type LargeSetCategory = SetCategory<LargeSet>; // 'Large'

// Validate mathematical properties
type ValidateAssociativity = IsTrue<
  Equale<Union<SetA, Union<SetB, SetZ>>, Union<Union<SetA, SetB>, SetZ>>
>; // Associativity: A ∪ (B ∪ C) = (A ∪ B) ∪ C

// Multiple conditions with early termination logic
type EarlyTermination = If<
  IsFalse<IsDisjointUnion<readonly [1, 2], readonly [2, 3]>>,
  "Sets overlap - validation failed",
  If<
    IsTrue<Equale<Union<readonly [1], readonly [2]>, readonly [1, 2]>>,
    "Validation passed",
    "Unexpected result"
  >
>; // 'Sets overlap - validation failed'

console.log("Advanced logical operations for type-level set theory!");

// Export types for testing
export type {
  ComplexTest,
  ThreeWayDisjoint,
  ComplexLogic,
  ApiStatesDisjoint,
  ApiStatesDisjointCleaner,
  CanAccessAdmin,
  ProveSetIdentity,
  LogicalEquivalence,
  ValidateAssociativity,
  EarlyTermination,
};
