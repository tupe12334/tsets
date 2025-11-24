import { describe, it, expectTypeOf } from 'vitest'
import type {
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
} from '../types'

describe('Comprehensive Set Object Type Testing', () => {
  describe('Union - Sets', () => {
    it('should handle empty Set<never>', () => {
      type Empty = Set<never>
      type NonEmpty = Set<'a' | 'b'>
      type Result = Union<Empty, NonEmpty>
      expectTypeOf<Result>().toEqualTypeOf<Set<'a' | 'b'>>()
    })

    it('should combine numeric sets', () => {
      type Evens = Set<2 | 4 | 6>
      type Odds = Set<1 | 3 | 5>
      type Result = Union<Evens, Odds>
      expectTypeOf<Result>().toEqualTypeOf<Set<1 | 2 | 3 | 4 | 5 | 6>>()
    })

    it('should handle boolean sets', () => {
      type TrueSet = Set<true>
      type FalseSet = Set<false>
      type Result = Union<TrueSet, FalseSet>
      expectTypeOf<Result>().toEqualTypeOf<Set<boolean>>()
    })

    it('should handle union of union types', () => {
      type Set1 = Set<'a' | 'b'>
      type Set2 = Set<'c' | 'd'>
      type Set3 = Set<'e' | 'f'>
      type Result = Union<Union<Set1, Set2>, Set3>
      expectTypeOf<Result>().toEqualTypeOf<
        Set<'a' | 'b' | 'c' | 'd' | 'e' | 'f'>
      >()
    })
  })

  describe('Union - Mixed (Array + Set)', () => {
    it('should prefer Set when first argument is Set', () => {
      type SetA = Set<1 | 2>
      type ArrayB = readonly [3, 4]
      type Result = Union<SetA, ArrayB>
      expectTypeOf<Result>().toEqualTypeOf<Set<1 | 2 | 3 | 4>>()
    })

    it('should prefer Array when first argument is Array', () => {
      type ArrayA = readonly [1, 2]
      type SetB = Set<3 | 4>
      type Result = Union<ArrayA, SetB>
      expectTypeOf<Result>().toEqualTypeOf<readonly [1, 2, 3, 4]>()
    })

    it('should handle string literals with Sets', () => {
      type Literals = Set<'foo' | 'bar'>
      type Array = readonly ['baz', 'qux']
      type Result = Union<Literals, Array>
      expectTypeOf<Result>().toEqualTypeOf<Set<'foo' | 'bar' | 'baz' | 'qux'>>()
    })
  })

  describe('Intersection - Sets', () => {
    it('should find common elements in Sets', () => {
      type A = Set<'alpha' | 'beta' | 'gamma'>
      type B = Set<'beta' | 'gamma' | 'delta'>
      type Result = Intersection<A, B>
      expectTypeOf<Result>().toEqualTypeOf<Set<'beta' | 'gamma'>>()
    })

    it('should return Set<never> for disjoint Sets', () => {
      type A = Set<1 | 2 | 3>
      type B = Set<4 | 5 | 6>
      type Result = Intersection<A, B>
      expectTypeOf<Result>().toEqualTypeOf<Set<never>>()
    })

    it('should handle overlapping numeric Sets', () => {
      type A = Set<1 | 2 | 3 | 4 | 5>
      type B = Set<3 | 4 | 5 | 6 | 7>
      type Result = Intersection<A, B>
      expectTypeOf<Result>().toEqualTypeOf<Set<3 | 4 | 5>>()
    })
  })

  describe('Intersection - Mixed', () => {
    it('should find intersection of Set and array', () => {
      type SetA = Set<'a' | 'b' | 'c'>
      type ArrayB = readonly ['b', 'c', 'd']
      type Result = Intersection<SetA, ArrayB>
      expectTypeOf<Result>().toEqualTypeOf<Set<'b' | 'c'>>()
    })
  })

  describe('Difference - Sets', () => {
    it('should find elements in Set A but not Set B', () => {
      type A = Set<'red' | 'green' | 'blue'>
      type B = Set<'green'>
      type Result = Difference<A, B>
      expectTypeOf<Result>().toEqualTypeOf<Set<'red' | 'blue'>>()
    })

    it('should handle numeric differences', () => {
      type All = Set<1 | 2 | 3 | 4 | 5>
      type Remove = Set<2 | 4>
      type Result = Difference<All, Remove>
      expectTypeOf<Result>().toEqualTypeOf<Set<1 | 3 | 5>>()
    })
  })

  describe('Difference - Mixed', () => {
    it('should find difference of Set and array', () => {
      type SetA = Set<'a' | 'b' | 'c'>
      type ArrayB = readonly ['b', 'c']
      type Result = Difference<SetA, ArrayB>
      expectTypeOf<Result>().toEqualTypeOf<Set<'a'>>()
    })
  })

  describe('IsDisjoint - Sets', () => {
    it('should detect completely disjoint Sets', () => {
      type Even = Set<2 | 4 | 6>
      type Odd = Set<1 | 3 | 5>
      type Result = IsDisjoint<Even, Odd>
      expectTypeOf<Result>().toEqualTypeOf<true>()
    })

    it('should detect overlapping Sets', () => {
      type Primary = Set<'red' | 'blue' | 'yellow'>
      type Cool = Set<'blue' | 'green' | 'purple'>
      type Result = IsDisjoint<Primary, Cool>
      expectTypeOf<Result>().toEqualTypeOf<false>()
    })

    it('should handle Set<never> as disjoint with any', () => {
      type Empty = Set<never>
      type Any = Set<'a' | 'b' | 'c'>
      type Result = IsDisjoint<Empty, Any>
      expectTypeOf<Result>().toEqualTypeOf<true>()
    })
  })

  describe('IsDisjoint - Mixed', () => {
    it('should detect disjoint Set and array', () => {
      type SetA = Set<'dog' | 'cat'>
      type ArrayB = readonly [1, 2, 3]
      type Result = IsDisjoint<SetA, ArrayB>
      expectTypeOf<Result>().toEqualTypeOf<true>()
    })

    it('should detect overlapping Set and array', () => {
      type SetA = Set<1 | 2 | 3>
      type ArrayB = readonly [3, 4, 5]
      type Result = IsDisjoint<SetA, ArrayB>
      expectTypeOf<Result>().toEqualTypeOf<false>()
    })
  })

  describe('Subset - Sets', () => {
    it('should verify true subset for Sets', () => {
      type Small = Set<'x' | 'y'>
      type Large = Set<'x' | 'y' | 'z' | 'w'>
      type Result = Subset<Small, Large>
      expectTypeOf<Result>().toEqualTypeOf<true>()
    })

    it('should verify false subset for Sets', () => {
      type A = Set<1 | 2 | 99>
      type B = Set<1 | 2 | 3>
      type Result = Subset<A, B>
      expectTypeOf<Result>().toEqualTypeOf<false>()
    })

    it('should verify Set<never> is subset of any Set', () => {
      type Empty = Set<never>
      type Any = Set<'foo' | 'bar'>
      type Result = Subset<Empty, Any>
      expectTypeOf<Result>().toEqualTypeOf<true>()
    })
  })

  describe('Subset - Mixed', () => {
    it('should work with mixed types', () => {
      type SetA = Set<1 | 2>
      type ArrayB = readonly [1, 2, 3]
      type Result = Subset<SetA, ArrayB>
      expectTypeOf<Result>().toEqualTypeOf<true>()
    })
  })

  describe('Equal - Sets', () => {
    it('should verify equal Sets', () => {
      type A = Set<'alpha' | 'beta'>
      type B = Set<'beta' | 'alpha'>
      type Result = Equal<A, B>
      expectTypeOf<Result>().toEqualTypeOf<true>()
    })

    it('should verify unequal Sets', () => {
      type A = Set<1 | 2 | 3>
      type B = Set<1 | 2 | 4>
      type Result = Equal<A, B>
      expectTypeOf<Result>().toEqualTypeOf<false>()
    })
  })

  describe('Equale - Sets', () => {
    it('should work with Sets', () => {
      type A = Set<10 | 20 | 30>
      type B = Set<30 | 10 | 20>
      type Result = Equale<A, B>
      expectTypeOf<Result>().toEqualTypeOf<true>()
    })
  })

  describe('Cardinality - Sets', () => {
    it('should return number for Set types', () => {
      type MySet = Set<'a' | 'b' | 'c' | 'd' | 'e'>
      expectTypeOf<Cardinality<MySet>>().toEqualTypeOf<number>()
    })

    it('should return number for Set<never>', () => {
      type EmptySet = Set<never>
      expectTypeOf<Cardinality<EmptySet>>().toEqualTypeOf<number>()
    })
  })

  describe('IsEmpty - Sets', () => {
    it('should detect empty Set<never>', () => {
      type Empty = Set<never>
      expectTypeOf<IsEmpty<Empty>>().toEqualTypeOf<true>()
    })

    it('should detect non-empty Set', () => {
      type NonEmpty = Set<'something'>
      expectTypeOf<IsEmpty<NonEmpty>>().toEqualTypeOf<false>()
    })
  })

  describe('CartesianProduct - Sets', () => {
    it('should create product of Sets', () => {
      type A = Set<'x' | 'y'>
      type B = Set<1 | 2>
      type Result = CartesianProduct<A, B>
      expectTypeOf<Result>().toEqualTypeOf<
        Set<
          | readonly ['x', 1]
          | readonly ['x', 2]
          | readonly ['y', 1]
          | readonly ['y', 2]
        >
      >()
    })

    it('should handle boolean Sets', () => {
      type A = Set<true | false>
      type B = Set<'yes' | 'no'>
      type Result = CartesianProduct<A, B>
      expectTypeOf<Result>().toMatchTypeOf<
        Set<
          | readonly [true, 'yes']
          | readonly [true, 'no']
          | readonly [false, 'yes']
          | readonly [false, 'no']
        >
      >()
    })
  })

  describe('CartesianProduct - Mixed', () => {
    it('should work with mixed Set and array', () => {
      type SetA = Set<'a' | 'b'>
      type ArrayB = readonly [1, 2]
      type Result = CartesianProduct<SetA, ArrayB>
      expectTypeOf<Result>().toEqualTypeOf<
        Set<
          | readonly ['a', 1]
          | readonly ['a', 2]
          | readonly ['b', 1]
          | readonly ['b', 2]
        >
      >()
    })
  })

  describe('PowerSet - Sets', () => {
    it('should create power set of Set', () => {
      type A = Set<'x' | 'y'>
      type Result = PowerSet<A>
      expectTypeOf<Result>().toEqualTypeOf<Set<Set<'x' | 'y'>>>()
    })
  })

  describe('SymmetricDifference - Sets', () => {
    it('should find elements in either Set but not both', () => {
      type A = Set<1 | 2 | 3>
      type B = Set<2 | 3 | 4>
      type Result = SymmetricDifference<A, B>
      expectTypeOf<Result>().toMatchTypeOf<Set<1 | 4>>()
    })
  })

  describe('SetComplement - Sets', () => {
    it('should find complement in Set', () => {
      type Universe = Set<1 | 2 | 3 | 4 | 5>
      type A = Set<1 | 2>
      type Result = SetComplement<Universe, A>
      expectTypeOf<Result>().toEqualTypeOf<Set<3 | 4 | 5>>()
    })
  })

  describe('IsDisjointUnion - Three Sets', () => {
    it('should verify three disjoint Sets', () => {
      type A = Set<'red'>
      type B = Set<'green'>
      type C = Set<'blue'>
      type Result = IsDisjointUnion<A, B, C>
      expectTypeOf<Result>().toEqualTypeOf<true>()
    })
  })

  describe('Real-world Set usage patterns', () => {
    it('should handle HTTP status code sets', () => {
      type SuccessSet = Set<200 | 201 | 204>
      type ErrorSet = Set<400 | 401 | 403 | 404 | 500>

      type AreDisjoint = IsDisjoint<SuccessSet, ErrorSet>
      expectTypeOf<AreDisjoint>().toEqualTypeOf<true>()

      type AllCodes = Union<SuccessSet, ErrorSet>
      expectTypeOf<AllCodes>().toEqualTypeOf<
        Set<200 | 201 | 204 | 400 | 401 | 403 | 404 | 500>
      >()
    })

    it('should handle user role sets', () => {
      type AdminRoles = Set<'superadmin' | 'admin'>
      type UserRoles = Set<'user' | 'guest'>
      type ModeratorRoles = Set<'moderator'>

      type AllRoles = Union<Union<AdminRoles, UserRoles>, ModeratorRoles>
      expectTypeOf<AllRoles>().toEqualTypeOf<
        Set<'superadmin' | 'admin' | 'user' | 'guest' | 'moderator'>
      >()
    })

    it('should handle permission system with Sets', () => {
      type ReadPermissions = Set<'view' | 'list'>
      type WritePermissions = Set<'create' | 'update' | 'delete'>
      type AdminPermissions = Set<'admin' | 'configure'>

      type AllPermissions = Union<
        Union<ReadPermissions, WritePermissions>,
        AdminPermissions
      >
      expectTypeOf<AllPermissions>().toEqualTypeOf<
        Set<
          | 'view'
          | 'list'
          | 'create'
          | 'update'
          | 'delete'
          | 'admin'
          | 'configure'
        >
      >()

      type ReadOnlyNoAdmin = Difference<ReadPermissions, AdminPermissions>
      expectTypeOf<ReadOnlyNoAdmin>().toEqualTypeOf<Set<'view' | 'list'>>()
    })

    it('should model HTTP methods with validation', () => {
      type SafeMethods = Set<'GET' | 'HEAD' | 'OPTIONS'>
      type IdempotentMethods = Set<
        'GET' | 'HEAD' | 'PUT' | 'DELETE' | 'OPTIONS'
      >
      type UnsafeMethods = Set<'POST' | 'PATCH'>

      type SafeAndIdempotent = Intersection<SafeMethods, IdempotentMethods>
      expectTypeOf<SafeAndIdempotent>().toEqualTypeOf<
        Set<'GET' | 'HEAD' | 'OPTIONS'>
      >()

      type NotSafe = Difference<IdempotentMethods, SafeMethods>
      expectTypeOf<NotSafe>().toEqualTypeOf<Set<'PUT' | 'DELETE'>>()
    })

    it('should handle feature flags with Sets', () => {
      type BetaFeatures = Set<'dark_mode' | 'experimental_ui'>
      type StableFeatures = Set<'authentication' | 'profile'>
      type DeprecatedFeatures = Set<'old_editor'>

      type ActiveFeatures = Union<BetaFeatures, StableFeatures>
      expectTypeOf<ActiveFeatures>().toEqualTypeOf<
        Set<'dark_mode' | 'experimental_ui' | 'authentication' | 'profile'>
      >()

      type NonDeprecated = Difference<ActiveFeatures, DeprecatedFeatures>
      expectTypeOf<NonDeprecated>().toEqualTypeOf<
        Set<'dark_mode' | 'experimental_ui' | 'authentication' | 'profile'>
      >()
    })

    it('should handle event categories', () => {
      type SystemEvents = Set<'startup' | 'shutdown' | 'error'>
      type UserEvents = Set<'login' | 'logout' | 'action'>
      type NetworkEvents = Set<'connected' | 'disconnected' | 'timeout'>

      type AllEvents = Union<Union<SystemEvents, UserEvents>, NetworkEvents>
      expectTypeOf<AllEvents>().toEqualTypeOf<
        Set<
          | 'startup'
          | 'shutdown'
          | 'error'
          | 'login'
          | 'logout'
          | 'action'
          | 'connected'
          | 'disconnected'
          | 'timeout'
        >
      >()

      type CriticalEvents = Intersection<
        SystemEvents,
        Set<'error' | 'shutdown'>
      >
      expectTypeOf<CriticalEvents>().toEqualTypeOf<Set<'error' | 'shutdown'>>()
    })
  })
})
