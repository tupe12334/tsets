/**
 * @fileoverview Examples demonstrating Set object support in TSets
 * Shows how to use TypeScript Set objects with mathematical set operations
 */

import type {
  Union,
  Intersection,
  Difference,
  IsDisjoint,
  Subset,
  Equal,
  Cardinality,
  IsEmpty,
  CartesianProduct,
  SymmetricDifference,
  SetComplement,
  DisjointUnion,
  ElementType,
} from '../src'

// ============================================================================
// Basic Set Operations
// ============================================================================

// Define Set types
type NumberSet = Set<1 | 2 | 3>
type EvenNumberSet = Set<2 | 4 | 6>

// Union of Sets
type AllNumbers = Union<NumberSet, EvenNumberSet>
// Result: Set<1 | 2 | 3 | 4 | 6>

// Intersection of Sets
type CommonNumbers = Intersection<NumberSet, EvenNumberSet>
// Result: Set<2>

// Difference of Sets
type OddNumbers = Difference<NumberSet, EvenNumberSet>
// Result: Set<1 | 3>

// ============================================================================
// Set Properties and Checks
// ============================================================================

// Check if sets are disjoint
type SetA = Set<'a' | 'b' | 'c'>
type SetB = Set<'d' | 'e' | 'f'>
type AreDisjoint = IsDisjoint<SetA, SetB> // true

type SetC = Set<'a' | 'b' | 'c'>
type SetD = Set<'c' | 'd' | 'e'>
type AreOverlapping = IsDisjoint<SetC, SetD> // false

// Subset relationships
type SmallSet = Set<'a' | 'b'>
type LargeSet = Set<'a' | 'b' | 'c' | 'd'>
type IsSubsetResult = Subset<SmallSet, LargeSet> // true

// Set equality
type SetX = Set<'x' | 'y' | 'z'>
type SetY = Set<'z' | 'y' | 'x'>
type AreEqual = Equal<SetX, SetY> // true (order doesn't matter)

// Cardinality (returns number for Sets since size is runtime)
type MySet = Set<'a' | 'b' | 'c'>
type Size = Cardinality<MySet> // number

// Empty set check
type EmptySet = Set<never>
type NonEmptySet = Set<'value'>
type IsEmptyResult1 = IsEmpty<EmptySet> // true
type IsEmptyResult2 = IsEmpty<NonEmptySet> // false

// ============================================================================
// Advanced Set Operations
// ============================================================================

// Cartesian Product
type Colors = Set<'red' | 'blue'>
type Sizes = Set<'small' | 'large'>
type ColorSizePairs = CartesianProduct<Colors, Sizes>
// Result: Set<readonly ['red', 'small'] | readonly ['red', 'large'] |
//              readonly ['blue', 'small'] | readonly ['blue', 'large']>

// Symmetric Difference
type GroupA = Set<'alice' | 'bob' | 'charlie'>
type GroupB = Set<'bob' | 'charlie' | 'david'>
type ExclusiveMembers = SymmetricDifference<GroupA, GroupB>
// Result: Set<'alice' | 'david'>

// Set Complement
type Universe = Set<1 | 2 | 3 | 4 | 5>
type Selection = Set<2 | 4>
type Complement = SetComplement<Universe, Selection>
// Result: Set<1 | 3 | 5>

// ============================================================================
// Mixed Set and Array Operations
// ============================================================================

// You can mix Set objects and readonly arrays!
type SetType = Set<'a' | 'b'>
type ArrayType = readonly ['b', 'c']

// Union of Set and array returns appropriate type based on first argument
type MixedUnion1 = Union<SetType, ArrayType>
// Result: Set<'a' | 'b' | 'c'>

type MixedUnion2 = Union<ArrayType, SetType>
// Result: readonly ['b', 'c', 'a', 'b'] (array-based)

// Other operations work seamlessly
type MixedIntersection = Intersection<SetType, ArrayType>
type MixedDifference = Difference<SetType, ArrayType>
type MixedDisjoint = IsDisjoint<SetType, ArrayType>

// ============================================================================
// Real-World Use Cases with Sets
// ============================================================================

// 1. HTTP Status Code Management
type SuccessCodes = Set<200 | 201 | 204>
type ClientErrors = Set<400 | 401 | 403 | 404>
type ServerErrors = Set<500 | 502 | 503 | 504>

// Ensure code ranges don't overlap
type SuccessAndClientDisjoint = IsDisjoint<SuccessCodes, ClientErrors> // true
type ClientAndServerDisjoint = IsDisjoint<ClientErrors, ServerErrors> // true

// All HTTP codes
type AllErrorCodes = Union<ClientErrors, ServerErrors>
// Result: Set<400 | 401 | 403 | 404 | 500 | 502 | 503 | 504>

// 2. User Permissions and Roles
type AdminPermissions = Set<'read' | 'write' | 'delete' | 'admin'>
type EditorPermissions = Set<'read' | 'write'>
type ViewerPermissions = Set<'read'>

// Check permission hierarchies
type EditorIsSubsetOfAdmin = Subset<EditorPermissions, AdminPermissions> // true
type ViewerIsSubsetOfEditor = Subset<ViewerPermissions, EditorPermissions> // true

// Extra permissions that admin has over editor
type AdminExtraPerms = Difference<AdminPermissions, EditorPermissions>
// Result: Set<'delete' | 'admin'>

// 3. Feature Flags
type ProductionFeatures = Set<'core' | 'auth' | 'api'>
type DevelopmentFeatures = Set<'core' | 'auth' | 'api' | 'debug' | 'logging'>
type BetaFeatures = Set<'core' | 'auth' | 'api' | 'beta-ui'>

// Features unique to development
type DevOnlyFeatures = Difference<DevelopmentFeatures, ProductionFeatures>
// Result: Set<'debug' | 'logging'>

// Features in both beta and development
type SharedFeatures = Intersection<BetaFeatures, DevelopmentFeatures>
// Result: Set<'core' | 'auth' | 'api'>

// 4. Database Query Optimization
type IndexedColumns = Set<'id' | 'email' | 'created_at'>
type QueryColumns = Set<'id' | 'name' | 'email'>

// Columns that are both queried and indexed (efficient queries)
type EfficientQueries = Intersection<IndexedColumns, QueryColumns>
// Result: Set<'id' | 'email'>

// Columns queried but not indexed (might need indexing)
type UnindexedQueries = Difference<QueryColumns, IndexedColumns>
// Result: Set<'name'>

// ============================================================================
// Disjoint Unions with Sets
// ============================================================================

// State machine using Set objects
type LoadingStates = {
  idle: Set<never>
  loading: Set<'fetching' | 'processing'>
  success: Set<'data-ready'>
  error: Set<'network' | 'timeout' | 'server'>
}

type LoadingState = DisjointUnion<LoadingStates>
/*
Result:
  | { readonly tag: 'idle'; readonly value: never }
  | { readonly tag: 'loading'; readonly value: 'fetching' | 'processing' }
  | { readonly tag: 'success'; readonly value: 'data-ready' }
  | { readonly tag: 'error'; readonly value: 'network' | 'timeout' | 'server' }
*/

// API Response modeling with Sets
type ApiResponseStates = {
  pending: Set<never>
  success: Set<'ok' | 'created'>
  error: Set<'not-found' | 'unauthorized' | 'server-error'>
}

type ApiResponse = DisjointUnion<ApiResponseStates>

// Mixed arrays and Sets in disjoint unions
type MixedStates = {
  numbers: Set<1 | 2 | 3>
  strings: readonly ['a', 'b', 'c']
}

type MixedUnion = DisjointUnion<MixedStates>
/*
Result:
  | { readonly tag: 'numbers'; readonly value: 1 | 2 | 3 }
  | { readonly tag: 'strings'; readonly value: 'a' | 'b' | 'c' }
*/

// ============================================================================
// ElementType Helper
// ============================================================================

// Extract element type from Set
type MySetType = Set<'foo' | 'bar' | 'baz'>
type Element = ElementType<MySetType> // 'foo' | 'bar' | 'baz'

// Works with arrays too
type MyArrayType = readonly [1, 2, 3]
type ArrayElement = ElementType<MyArrayType> // 1 | 2 | 3

// ============================================================================
// Type-Safe Configuration Management
// ============================================================================

type SupportedLanguages = Set<'en' | 'es' | 'fr' | 'de'>
type EnabledLanguages = Set<'en' | 'es'>

// Ensure enabled languages are supported
type AreValid = Subset<EnabledLanguages, SupportedLanguages> // true

// Languages that could be enabled
type AvailableLanguages = Difference<SupportedLanguages, EnabledLanguages>
// Result: Set<'fr' | 'de'>

// ============================================================================
// Complex Set Algebra
// ============================================================================

type PrimeUnderTen = Set<2 | 3 | 5 | 7>
type OddUnderTen = Set<1 | 3 | 5 | 7 | 9>
type EvenUnderTen = Set<2 | 4 | 6 | 8>

// Odd primes under 10
type OddPrimes = Intersection<PrimeUnderTen, OddUnderTen>
// Result: Set<3 | 5 | 7>

// Numbers that are odd but not prime
type OddComposites = Difference<OddUnderTen, PrimeUnderTen>
// Result: Set<1 | 9>

// Verify that odd and even sets are disjoint
type OddEvenDisjoint = IsDisjoint<OddUnderTen, EvenUnderTen> // true

console.log('TSets: Compile-time Set operations with TypeScript!')
