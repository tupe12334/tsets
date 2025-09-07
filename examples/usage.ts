/**
 * @fileoverview Usage examples for TSets library
 * Demonstrates compile-time type checking for mathematical set operations
 */

import type {
  SetLike,
  Union,
  Intersection,
  Difference,
  IsDisjoint,
  Subset,
  Equal,
  Cardinality,
  CartesianProduct,
  SymmetricDifference,
  DisjointUnion,
  TaggedValue,
  Result,
  Option,
  StateMachine,
} from "../src";

// Basic Set Type Operations
type SetA = readonly ["apple", "banana", "cherry"];
type SetB = readonly ["banana", "date", "elderberry"];

// Union A ∪ B
type UnionResult = Union<SetA, SetB>;
// Result: readonly ["apple", "banana", "cherry", "banana", "date", "elderberry"]

// Intersection A ∩ B
type IntersectionResult = Intersection<SetA, SetB>;
// Result: readonly string[] containing elements in both sets

// Difference A \ B
type DifferenceResult = Difference<SetA, SetB>;
// Result: readonly string[] containing elements in A but not B

// Check if sets are disjoint
type Numbers = readonly [1, 2, 3];
type Letters = readonly ["a", "b", "c"];
type AreDisjoint = IsDisjoint<Numbers, Letters>; // true

// Subset relationships A ⊆ B
type SmallSet = readonly ["apple", "banana"];
type IsSubsetResult = Subset<SmallSet, SetA>; // true

// Set equality
type SetC = readonly ["apple", "banana", "cherry"];
type AreEqual = Equal<SetA, SetC>; // true

// Cardinality (size) |A|
type Size = Cardinality<SetA>; // 3

// Cartesian Product A × B
type NumberSet = readonly [1, 2];
type LetterSet = readonly ["x", "y"];
type Product = CartesianProduct<NumberSet, LetterSet>;
// Result: readonly [readonly [1, 'x'], readonly [1, 'y'], readonly [2, 'x'], readonly [2, 'y']]

// Symmetric Difference A △ B
type SymDiff = SymmetricDifference<SetA, SetB>;

// Disjoint Union Examples

// API Response States
const apiStates = {
  loading: [] as const,
  success: ["data"] as const,
  error: ["network_error", "timeout", "server_error"] as const,
} as const;

type ApiResponse = DisjointUnion<typeof apiStates>;
/*
Result:
  | { readonly tag: 'loading'; readonly value: never }
  | { readonly tag: 'success'; readonly value: 'data' }
  | { readonly tag: 'error'; readonly value: 'network_error' | 'timeout' | 'server_error' }
*/

// Pattern Matching Type
type ProcessApiResponse = ApiResponse extends infer R
  ? R extends { tag: "loading" }
    ? "Loading..."
    : R extends { tag: "success" }
    ? "Success: data"
    : R extends { tag: "error"; value: infer E }
    ? `Error: ${E extends string ? E : string}`
    : never
  : never;

// Result Type for Error Handling
type FetchResult = Result<User, "network_error" | "not_found">;

interface User {
  id: number;
  name: string;
}

// Option Type for Nullable Values
type MaybeUser = Option<User>;

// State Machine Example
type AuthenticationStates = {
  anonymous: readonly [];
  logging_in: readonly [string]; // username
  authenticated: readonly [User];
  session_expired: readonly [];
};

type AuthState = StateMachine<AuthenticationStates>;

// Real-world Form Validation States
const formStates = {
  pristine: [] as const,
  validating: ["field_name"] as const,
  valid: ["form_data"] as const,
  invalid: ["error_message", "field_name"] as const,
} as const;

type FormState = DisjointUnion<typeof formStates>;

// Type-level Set Operations with Compile-time Guarantees
type UserRoles = readonly ["admin", "moderator", "user"];
type ActiveRoles = readonly ["admin", "moderator"];
type InactiveRoles = Difference<UserRoles, ActiveRoles>; // readonly ['user']

// Ensure Sets are Disjoint at Compile Time
type SuccessCodes = readonly [200, 201, 204];
type ErrorCodes = readonly [400, 401, 403, 404, 500];
type CodesAreDisjoint = IsDisjoint<SuccessCodes, ErrorCodes>; // true

// Complex Nested Set Operations
type AllCodes = Union<SuccessCodes, ErrorCodes>;
type CodeCardinality = Cardinality<AllCodes>; // 8

console.log("TSets: Compile-time mathematical set operations with TypeScript!");
