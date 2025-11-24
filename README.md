# TSets

A **types-only** TypeScript library for mathematical set operations with compile-time type checking and disjoint unions. All operations are performed at the type level with **zero runtime overhead**.

## Features

- 🔒 **100% Type-level** - No runtime code, pure TypeScript types
- 🧮 **Mathematical notation** - Work with sets using familiar mathematical concepts (∪, ∩, \, ×, etc.)
- 🔀 **Disjoint unions** - Type-safe tagged unions and sum types
- ⚡ **Zero runtime overhead** - Everything happens at compile time
- 📦 **`as const` compatible** - Full support for const assertions
- 🎯 **Type-safe pattern matching** - Exhaustive matching for disjoint unions
- 🎨 **Set object support** - Works with both readonly arrays and TypeScript Set objects

## Installation

```bash
# npm
npm install tsets

# pnpm
pnpm add tsets

# yarn
yarn add tsets
```

## Quick Start

```typescript
import type { Union, Intersection, Difference, IsDisjoint } from 'tsets'

// Define sets using readonly tuples
type SetA = readonly ['apple', 'banana', 'cherry']
type SetB = readonly ['banana', 'date', 'elderberry']

// Mathematical operations at the type level
type UnionResult = Union<SetA, SetB>
// Result: readonly ["apple", "banana", "cherry", "banana", "date", "elderberry"]

type IntersectionResult = Intersection<SetA, SetB>
// Result: Elements present in both sets

type DifferenceResult = Difference<SetA, SetB>
// Result: Elements in A but not in B

// Compile-time validation
type AreDisjoint = IsDisjoint<readonly [1, 2], readonly ['a', 'b']> // true

// Works with TypeScript Set objects too!
type SetX = Set<'x' | 'y'>
type SetZ = Set<'z' | 'w'>
type SetUnion = Union<SetX, SetZ> // Set<'x' | 'y' | 'z' | 'w'>
```

## Core Set Operations

### Basic Operations

All operations follow standard mathematical set theory:

```typescript
import type {
  Union, // A ∪ B
  Intersection, // A ∩ B
  Difference, // A \ B
  SymmetricDifference, // A △ B
  CartesianProduct, // A × B
  PowerSet, // 𝒫(A)
  SetComplement, // A^c
} from 'tsets'

// Union: A ∪ B
type Numbers = readonly [1, 2, 3]
type Letters = readonly ['a', 'b']
type Combined = Union<Numbers, Letters> // readonly [1, 2, 3, 'a', 'b']

// Cartesian Product: A × B
type Pairs = CartesianProduct<Numbers, Letters>
// readonly [readonly [1, 'a'], readonly [1, 'b'], ...]

// Set relationships
type IsSubset = Subset<readonly [1, 2], readonly [1, 2, 3]> // true
type AreEqual = Equal<readonly ['a', 'b'], readonly ['b', 'a']> // true
```

### Set Properties

```typescript
import type { Cardinality, IsEmpty, Subset, Equal } from 'tsets'

type MySet = readonly ['x', 'y', 'z']
type Size = Cardinality<MySet> // 3
type Empty = IsEmpty<readonly []> // true
```

## TypeScript Set Support

TSets fully supports TypeScript `Set<T>` objects in addition to readonly arrays! All operations work seamlessly with both:

```typescript
import type { Union, Intersection, Difference, IsDisjoint, Subset } from 'tsets'

// Using Set objects
type AdminPerms = Set<'read' | 'write' | 'delete' | 'admin'>
type EditorPerms = Set<'read' | 'write'>

// All operations work the same way
type IsSubsetResult = Subset<EditorPerms, AdminPerms> // true
type ExtraPerms = Difference<AdminPerms, EditorPerms> // Set<'delete' | 'admin'>

// Mix Sets and arrays - the result type matches the first argument
type MixedUnion1 = Union<Set<'a'>, readonly ['b']> // Set<'a' | 'b'>
type MixedUnion2 = Union<readonly ['a'], Set<'b'>> // readonly ['a', 'b'] (array-based)

// Real-world example: HTTP status codes
type SuccessCodes = Set<200 | 201 | 204>
type ErrorCodes = Set<400 | 401 | 403 | 404 | 500>

type CodesDisjoint = IsDisjoint<SuccessCodes, ErrorCodes> // true
type AllCodes = Union<SuccessCodes, ErrorCodes> // Set<200 | 201 | 204 | 400 | 401 | 403 | 404 | 500>
```

**Note:** For `Set` types, `Cardinality` returns `number` (since size is determined at runtime), while for readonly arrays it returns a literal number type.

See `examples/set-objects.ts` for comprehensive Set usage examples.

## Disjoint Unions (Sum Types)

Perfect for modeling state machines, API responses, and error handling:

```typescript
import type { DisjointUnion, Result, Option, PatternMatcher } from 'tsets'

// API Response States
const apiStates = {
  loading: [] as const,
  success: ['data'] as const,
  error: ['network_error', 'timeout', 'server_error'] as const,
} as const

type ApiResponse = DisjointUnion<typeof apiStates>
/*
Result:
  | { readonly tag: 'loading'; readonly value: never }
  | { readonly tag: 'success'; readonly value: 'data' }  
  | { readonly tag: 'error'; readonly value: 'network_error' | 'timeout' | 'server_error' }
*/

// Result type for error handling
type FetchResult = Result<User, 'network_error' | 'not_found'>

// Option type for nullable values
type MaybeUser = Option<User>

// Pattern matching
type Matcher = PatternMatcher<ApiResponse, string>
// Creates exhaustive handler type
```

## Real-World Examples

### State Machine Modeling

```typescript
import type { StateMachine, DisjointUnion } from 'tsets'

type AuthStates = {
  anonymous: readonly []
  logging_in: readonly [string] // username
  authenticated: readonly [User]
  session_expired: readonly []
}

type AuthState = StateMachine<AuthStates>
// Compile-time guarantee of exhaustive state handling
```

### HTTP Status Code Validation

```typescript
type SuccessCodes = readonly [200, 201, 204]
type ErrorCodes = readonly [400, 401, 403, 404, 500]

// Ensure codes don't overlap at compile time
type CodesAreDisjoint = IsDisjoint<SuccessCodes, ErrorCodes> // true

type AllCodes = Union<SuccessCodes, ErrorCodes>
type TotalCodes = Cardinality<AllCodes> // 8
```

### Form Validation States

```typescript
const formStates = {
  pristine: [] as const,
  validating: ['field_name'] as const,
  valid: ['form_data'] as const,
  invalid: ['error_message', 'field_name'] as const,
} as const

type FormState = DisjointUnion<typeof formStates>
// Type-safe form state management
```

## Mathematical Foundations

This library implements standard set theory operations:

- **Union (∪)**: `A ∪ B = {x | x ∈ A or x ∈ B}`
- **Intersection (∩)**: `A ∩ B = {x | x ∈ A and x ∈ B}`
- **Difference (\\)**: `A \ B = {x | x ∈ A and x ∉ B}`
- **Symmetric Difference (△)**: `A △ B = (A \ B) ∪ (B \ A)`
- **Cartesian Product (×)**: `A × B = {(a,b) | a ∈ A and b ∈ B}`
- **Power Set (𝒫)**: `𝒫(A) = {S | S ⊆ A}`
- **Subset (⊆)**: `A ⊆ B if ∀x (x ∈ A → x ∈ B)`
- **Disjoint**: `A ∩ B = ∅`

## API Reference

### Core Types

- `SetLike<T>` - Base set type using readonly arrays
- `Union<A, B>` - Set union A ∪ B
- `Intersection<A, B>` - Set intersection A ∩ B
- `Difference<A, B>` - Set difference A \ B
- `IsDisjoint<A, B>` - Check if sets are disjoint
- `Subset<A, B>` - Check if A ⊆ B
- `Equal<A, B>` - Check if A = B
- `Cardinality<A>` - Get set size |A|
- `IsEmpty<A>` - Check if set is empty ∅

### Advanced Operations

- `CartesianProduct<A, B>` - Cartesian product A × B
- `PowerSet<A>` - Power set 𝒫(A)
- `SymmetricDifference<A, B>` - Symmetric difference A △ B
- `SetComplement<U, A>` - Set complement A^c

### Disjoint Unions

- `DisjointUnion<T>` - Create tagged union from sets
- `TaggedValue<Tag, Value>` - Tagged value type
- `PatternMatcher<T, R>` - Pattern matching function type
- `Result<S, E>` - Success/Error result type
- `Option<T>` - Optional value type
- `StateMachine<States>` - State machine type

## Development

```bash
# Install dependencies
pnpm install

# Run type tests
pnpm test

# Build library
pnpm build

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Release preparation
pnpm release:dry  # dry run
pnpm release      # actual release
```

## TypeScript Configuration

This library requires TypeScript 5.0+ for optimal type inference. Ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "strict": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true
  }
}
```

## License

MIT - Use freely in commercial and open source projects.

---

**TSets** - Bringing mathematical rigor to TypeScript through compile-time set operations. Perfect for type-safe state management, API modeling, and functional programming patterns.
