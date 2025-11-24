import { describe, it, expectTypeOf } from 'vitest'
import type {
  SetLike,
  ElementType,
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
} from '../types'
import type { DisjointUnion as DisjointUnionType } from '../disjoint'

describe('Set Object Support', () => {
  describe('SetLike with Set objects', () => {
    it('should accept Set types', () => {
      type TestSet = SetLike<string>
      expectTypeOf<Set<string>>().toMatchTypeOf<TestSet>()
      expectTypeOf<Set<'a' | 'b' | 'c'>>().toMatchTypeOf<TestSet>()
    })

    it('should accept both arrays and Sets', () => {
      type TestSet = SetLike<number>
      expectTypeOf<readonly number[]>().toMatchTypeOf<TestSet>()
      expectTypeOf<Set<number>>().toMatchTypeOf<TestSet>()
    })
  })

  describe('ElementType helper', () => {
    it('should extract element type from Set', () => {
      type SetType = Set<'a' | 'b' | 'c'>
      type Element = ElementType<SetType>
      expectTypeOf<Element>().toEqualTypeOf<'a' | 'b' | 'c'>()
    })

    it('should extract element type from readonly array', () => {
      type ArrayType = readonly ['a', 'b', 'c']
      type Element = ElementType<ArrayType>
      expectTypeOf<Element>().toEqualTypeOf<'a' | 'b' | 'c'>()
    })
  })

  describe('Union with Set objects', () => {
    it('should create union of two Set types', () => {
      type SetA = Set<'a' | 'b'>
      type SetB = Set<'c' | 'd'>
      type Result = Union<SetA, SetB>

      expectTypeOf<Result>().toEqualTypeOf<Set<'a' | 'b' | 'c' | 'd'>>()
    })

    it('should create union of Set and array', () => {
      type SetA = Set<'a' | 'b'>
      type ArrayB = readonly ['c', 'd']
      type Result = Union<SetA, ArrayB>

      expectTypeOf<Result>().toEqualTypeOf<Set<'a' | 'b' | 'c' | 'd'>>()
    })

    it('should handle mixed types in union', () => {
      type SetA = Set<number>
      type SetB = Set<string>
      type Result = Union<SetA, SetB>

      expectTypeOf<Result>().toEqualTypeOf<Set<number | string>>()
    })
  })

  describe('Intersection with Set objects', () => {
    it('should find intersection of two Set types', () => {
      type SetA = Set<'a' | 'b' | 'c'>
      type SetB = Set<'b' | 'c' | 'd'>
      type Result = Intersection<SetA, SetB>

      expectTypeOf<Result>().toEqualTypeOf<Set<'b' | 'c'>>()
    })

    it('should find intersection of Set and array', () => {
      type SetA = Set<'a' | 'b' | 'c'>
      type ArrayB = readonly ['b', 'c', 'd']
      type Result = Intersection<SetA, ArrayB>

      expectTypeOf<Result>().toEqualTypeOf<Set<'b' | 'c'>>()
    })

    it('should return empty Set for disjoint sets', () => {
      type SetA = Set<'a' | 'b'>
      type SetB = Set<'c' | 'd'>
      type Result = Intersection<SetA, SetB>

      expectTypeOf<Result>().toEqualTypeOf<Set<never>>()
    })
  })

  describe('Difference with Set objects', () => {
    it('should find difference of two Set types', () => {
      type SetA = Set<'a' | 'b' | 'c'>
      type SetB = Set<'b' | 'c'>
      type Result = Difference<SetA, SetB>

      expectTypeOf<Result>().toEqualTypeOf<Set<'a'>>()
    })

    it('should find difference of Set and array', () => {
      type SetA = Set<'a' | 'b' | 'c'>
      type ArrayB = readonly ['b', 'c']
      type Result = Difference<SetA, ArrayB>

      expectTypeOf<Result>().toEqualTypeOf<Set<'a'>>()
    })

    it('should handle number types', () => {
      type SetA = Set<1 | 2 | 3>
      type SetB = Set<2 | 3 | 4>
      type Result = Difference<SetA, SetB>

      expectTypeOf<Result>().toEqualTypeOf<Set<1>>()
    })
  })

  describe('IsDisjoint with Set objects', () => {
    it('should return true for disjoint Set types', () => {
      type SetA = Set<'a' | 'b'>
      type SetB = Set<'c' | 'd'>
      type Result = IsDisjoint<SetA, SetB>

      expectTypeOf<Result>().toEqualTypeOf<true>()
    })

    it('should return false for overlapping Set types', () => {
      type SetA = Set<'a' | 'b'>
      type SetB = Set<'b' | 'c'>
      type Result = IsDisjoint<SetA, SetB>

      expectTypeOf<Result>().toEqualTypeOf<false>()
    })

    it('should work with mixed Set and array', () => {
      type SetA = Set<1 | 2>
      type ArrayB = readonly ['a', 'b']
      type Result = IsDisjoint<SetA, ArrayB>

      expectTypeOf<Result>().toEqualTypeOf<true>()
    })
  })

  describe('Subset with Set objects', () => {
    it('should return true when Set A is subset of Set B', () => {
      type SetA = Set<'a' | 'b'>
      type SetB = Set<'a' | 'b' | 'c'>
      type Result = Subset<SetA, SetB>

      expectTypeOf<Result>().toEqualTypeOf<true>()
    })

    it('should return false when Set A is not subset of Set B', () => {
      type SetA = Set<'a' | 'b' | 'd'>
      type SetB = Set<'a' | 'b' | 'c'>
      type Result = Subset<SetA, SetB>

      expectTypeOf<Result>().toEqualTypeOf<false>()
    })

    it('should work with mixed types', () => {
      type SetA = Set<1 | 2>
      type ArrayB = readonly [1, 2, 3]
      type Result = Subset<SetA, ArrayB>

      expectTypeOf<Result>().toEqualTypeOf<true>()
    })
  })

  describe('Equal with Set objects', () => {
    it('should return true for equal Set types', () => {
      type SetA = Set<'a' | 'b'>
      type SetB = Set<'b' | 'a'>
      type Result = Equal<SetA, SetB>

      expectTypeOf<Result>().toEqualTypeOf<true>()
    })

    it('should return false for unequal Set types', () => {
      type SetA = Set<'a' | 'b'>
      type SetB = Set<'a' | 'b' | 'c'>
      type Result = Equal<SetA, SetB>

      expectTypeOf<Result>().toEqualTypeOf<false>()
    })
  })

  describe('Cardinality with Set objects', () => {
    it('should return number for Set types', () => {
      type MySet = Set<'a' | 'b' | 'c'>
      type Size = Cardinality<MySet>

      expectTypeOf<Size>().toEqualTypeOf<number>()
    })

    it('should return literal number for arrays', () => {
      type MyArray = readonly ['a', 'b', 'c']
      type Size = Cardinality<MyArray>

      expectTypeOf<Size>().toEqualTypeOf<3>()
    })
  })

  describe('IsEmpty with Set objects', () => {
    it('should return true for empty Set', () => {
      type EmptySet = Set<never>
      type Result = IsEmpty<EmptySet>

      expectTypeOf<Result>().toEqualTypeOf<true>()
    })

    it('should return false for non-empty Set', () => {
      type NonEmptySet = Set<'a'>
      type Result = IsEmpty<NonEmptySet>

      expectTypeOf<Result>().toEqualTypeOf<false>()
    })
  })

  describe('CartesianProduct with Set objects', () => {
    it('should create cartesian product of two Set types', () => {
      type SetA = Set<'a' | 'b'>
      type SetB = Set<1 | 2>
      type Result = CartesianProduct<SetA, SetB>

      expectTypeOf<Result>().toEqualTypeOf<
        Set<
          | readonly ['a', 1]
          | readonly ['a', 2]
          | readonly ['b', 1]
          | readonly ['b', 2]
        >
      >()
    })

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

  describe('SymmetricDifference with Set objects', () => {
    it('should find symmetric difference of two Set types', () => {
      type SetA = Set<'a' | 'b' | 'c'>
      type SetB = Set<'b' | 'c' | 'd'>
      type Result = SymmetricDifference<SetA, SetB>

      // Result should be union of (A-B) and (B-A)
      expectTypeOf<Result>().toMatchTypeOf<Set<'a' | 'd'>>()
    })
  })

  describe('SetComplement with Set objects', () => {
    it('should find complement of Set A in universe U', () => {
      type Universe = Set<'a' | 'b' | 'c' | 'd'>
      type SetA = Set<'a' | 'b'>
      type Result = SetComplement<Universe, SetA>

      expectTypeOf<Result>().toEqualTypeOf<Set<'c' | 'd'>>()
    })
  })

  describe('DisjointUnion with Set objects', () => {
    it('should create disjoint union from Set types', () => {
      type StatusSets = {
        active: Set<'running' | 'pending'>
        inactive: Set<'stopped' | 'paused'>
      }

      type Status = DisjointUnionType<StatusSets>

      expectTypeOf<Status>().toEqualTypeOf<
        | { readonly tag: 'active'; readonly value: 'running' | 'pending' }
        | { readonly tag: 'inactive'; readonly value: 'stopped' | 'paused' }
      >()
    })

    it('should work with mixed Set and array types', () => {
      type MixedSets = {
        numbers: Set<1 | 2>
        strings: readonly ['a', 'b']
      }

      type Mixed = DisjointUnionType<MixedSets>

      expectTypeOf<Mixed>().toEqualTypeOf<
        | { readonly tag: 'numbers'; readonly value: 1 | 2 }
        | { readonly tag: 'strings'; readonly value: 'a' | 'b' }
      >()
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

    it('should handle state machine with Sets', () => {
      type States = {
        idle: Set<never>
        loading: Set<'fetching' | 'processing'>
        success: Set<'completed'>
        error: Set<'network' | 'timeout' | 'server'>
      }

      type StateMachine = DisjointUnionType<States>

      expectTypeOf<StateMachine>().toMatchTypeOf<
        | { readonly tag: 'idle'; readonly value: never }
        | { readonly tag: 'loading'; readonly value: 'fetching' | 'processing' }
        | { readonly tag: 'success'; readonly value: 'completed' }
        | {
            readonly tag: 'error'
            readonly value: 'network' | 'timeout' | 'server'
          }
      >()
    })
  })
})
