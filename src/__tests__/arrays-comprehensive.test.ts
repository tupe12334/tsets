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
  AreAllDisjoint,
} from '../types'
import type {
  DisjointUnion,
  Result,
  Option,
  StateMachine,
  ArePairwiseDisjoint,
} from '../disjoint'

describe('Comprehensive Array Type Testing', () => {
  describe('Union - Arrays', () => {
    it('should handle empty arrays', () => {
      type Empty = readonly []
      type NonEmpty = readonly ['a', 'b']
      type Result = Union<Empty, NonEmpty>
      expectTypeOf<Result>().toEqualTypeOf<readonly ['a', 'b']>()
    })

    it('should handle single element arrays', () => {
      type Single1 = readonly ['x']
      type Single2 = readonly ['y']
      type Result = Union<Single1, Single2>
      expectTypeOf<Result>().toEqualTypeOf<readonly ['x', 'y']>()
    })

    it('should preserve type literals', () => {
      type Nums = readonly [1, 2, 3]
      type Strs = readonly ['a', 'b', 'c']
      type Result = Union<Nums, Strs>
      expectTypeOf<Result>().toEqualTypeOf<readonly [1, 2, 3, 'a', 'b', 'c']>()
    })

    it('should handle complex types', () => {
      type Objects = readonly [{ id: 1 }, { id: 2 }]
      type Arrays = readonly [[1, 2], [3, 4]]
      type Result = Union<Objects, Arrays>
      expectTypeOf<Result>().toMatchTypeOf<
        readonly [{ id: 1 }, { id: 2 }, [1, 2], [3, 4]]
      >()
    })
  })

  describe('Intersection - Arrays', () => {
    it('should find common elements in arrays', () => {
      type A = readonly ['a', 'b', 'c', 'd']
      type B = readonly ['b', 'c', 'd', 'e']
      type Result = Intersection<A, B>
      expectTypeOf<Result>().toMatchTypeOf<readonly ('b' | 'c' | 'd')[]>()
    })

    it('should return empty for disjoint arrays', () => {
      type A = readonly [1, 2, 3]
      type B = readonly ['a', 'b', 'c']
      type Result = Intersection<A, B>
      expectTypeOf<Result>().toMatchTypeOf<readonly never[]>()
    })

    it('should handle identical arrays', () => {
      type A = readonly ['x', 'y', 'z']
      type B = readonly ['x', 'y', 'z']
      type Result = Intersection<A, B>
      expectTypeOf<Result>().toMatchTypeOf<readonly ('x' | 'y' | 'z')[]>()
    })

    it('should handle subset case', () => {
      type Subset = readonly ['a', 'b']
      type Superset = readonly ['a', 'b', 'c', 'd']
      type Result = Intersection<Subset, Superset>
      expectTypeOf<Result>().toMatchTypeOf<readonly ('a' | 'b')[]>()
    })
  })

  describe('Difference - Arrays', () => {
    it('should find elements in A but not B', () => {
      type A = readonly ['apple', 'banana', 'cherry', 'date']
      type B = readonly ['banana', 'date']
      type Result = Difference<A, B>
      expectTypeOf<Result>().toMatchTypeOf<readonly ('apple' | 'cherry')[]>()
    })

    it('should return A when sets are disjoint', () => {
      type A = readonly [1, 2, 3]
      type B = readonly ['a', 'b', 'c']
      type Result = Difference<A, B>
      expectTypeOf<Result>().toMatchTypeOf<readonly (1 | 2 | 3)[]>()
    })

    it('should return empty when A is subset of B', () => {
      type A = readonly ['x', 'y']
      type B = readonly ['w', 'x', 'y', 'z']
      type Result = Difference<A, B>
      expectTypeOf<Result>().toMatchTypeOf<readonly never[]>()
    })
  })

  describe('IsDisjoint - Arrays', () => {
    it('should detect completely disjoint arrays', () => {
      type Numbers = readonly [1, 2, 3]
      type Letters = readonly ['a', 'b', 'c']
      type Result = IsDisjoint<Numbers, Letters>
      expectTypeOf<Result>().toEqualTypeOf<true>()
    })

    it('should detect overlapping arrays', () => {
      type A = readonly ['x', 'y', 'z']
      type B = readonly ['y', 'w', 'v']
      type Result = IsDisjoint<A, B>
      expectTypeOf<Result>().toEqualTypeOf<false>()
    })

    it('should handle empty arrays as disjoint', () => {
      type Empty = readonly []
      type NonEmpty = readonly ['a', 'b']
      type Result = IsDisjoint<Empty, NonEmpty>
      expectTypeOf<Result>().toEqualTypeOf<true>()
    })
  })

  describe('Subset - Arrays', () => {
    it('should verify true subset relationship', () => {
      type Small = readonly ['a', 'b']
      type Large = readonly ['a', 'b', 'c', 'd']
      type Result = Subset<Small, Large>
      expectTypeOf<Result>().toEqualTypeOf<true>()
    })

    it('should verify false subset relationship', () => {
      type A = readonly ['a', 'b', 'x']
      type B = readonly ['a', 'b', 'c']
      type Result = Subset<A, B>
      expectTypeOf<Result>().toEqualTypeOf<false>()
    })

    it('should verify set equals itself', () => {
      type A = readonly ['alpha', 'beta']
      type Result = Subset<A, A>
      expectTypeOf<Result>().toEqualTypeOf<true>()
    })

    it('should verify empty set is subset of any set', () => {
      type Empty = readonly []
      type Any = readonly ['a', 'b', 'c']
      type Result = Subset<Empty, Any>
      expectTypeOf<Result>().toEqualTypeOf<true>()
    })
  })

  describe('Equal - Arrays', () => {
    it('should verify equal arrays', () => {
      type A = readonly [1, 2, 3]
      type B = readonly [1, 2, 3]
      type Result = Equal<A, B>
      expectTypeOf<Result>().toEqualTypeOf<true>()
    })

    it('should verify unequal arrays', () => {
      type A = readonly ['a', 'b', 'c']
      type B = readonly ['a', 'b', 'd']
      type Result = Equal<A, B>
      expectTypeOf<Result>().toEqualTypeOf<false>()
    })

    it('should handle different lengths', () => {
      type A = readonly [1, 2]
      type B = readonly [1, 2, 3]
      type Result = Equal<A, B>
      expectTypeOf<Result>().toEqualTypeOf<false>()
    })
  })

  describe('Equale - Arrays', () => {
    it('should work with arrays', () => {
      type A = readonly ['foo', 'bar']
      type B = readonly ['bar', 'foo']
      type Result = Equale<A, B>
      expectTypeOf<Result>().toEqualTypeOf<true>()
    })
  })

  describe('Cardinality - Arrays', () => {
    it('should count elements in small arrays', () => {
      type Single = readonly ['x']
      type Double = readonly ['x', 'y']
      type Triple = readonly ['x', 'y', 'z']

      expectTypeOf<Cardinality<Single>>().toEqualTypeOf<1>()
      expectTypeOf<Cardinality<Double>>().toEqualTypeOf<2>()
      expectTypeOf<Cardinality<Triple>>().toEqualTypeOf<3>()
    })

    it('should count elements in larger arrays', () => {
      type Ten = readonly [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      expectTypeOf<Cardinality<Ten>>().toEqualTypeOf<10>()
    })

    it('should return 0 for empty array', () => {
      type Empty = readonly []
      expectTypeOf<Cardinality<Empty>>().toEqualTypeOf<0>()
    })
  })

  describe('IsEmpty - Arrays', () => {
    it('should detect empty array', () => {
      type Empty = readonly []
      expectTypeOf<IsEmpty<Empty>>().toEqualTypeOf<true>()
    })

    it('should detect non-empty array', () => {
      type NonEmpty = readonly ['anything']
      expectTypeOf<IsEmpty<NonEmpty>>().toEqualTypeOf<false>()
    })
  })

  describe('CartesianProduct - Arrays', () => {
    it('should create product of simple arrays', () => {
      type A = readonly ['a', 'b']
      type B = readonly [1, 2]
      type Result = CartesianProduct<A, B>
      expectTypeOf<Result>().toMatchTypeOf<
        readonly [
          readonly ['a', 1],
          readonly ['a', 2],
          readonly ['b', 1],
          readonly ['b', 2],
        ]
      >()
    })

    it('should handle single element arrays', () => {
      type A = readonly ['x']
      type B = readonly [1]
      type Result = CartesianProduct<A, B>
      expectTypeOf<Result>().toMatchTypeOf<readonly [readonly ['x', 1]]>()
    })

    it('should handle empty array', () => {
      type Empty = readonly []
      type NonEmpty = readonly ['a']
      type Result = CartesianProduct<Empty, NonEmpty>
      expectTypeOf<Result>().toMatchTypeOf<readonly never[]>()
    })
  })

  describe('PowerSet - Arrays', () => {
    it('should create power set of array', () => {
      type A = readonly ['a', 'b']
      type Result = PowerSet<A>
      expectTypeOf<Result>().toMatchTypeOf<
        readonly (readonly ('a' | 'b')[])[]
      >()
    })
  })

  describe('SymmetricDifference - Arrays', () => {
    it('should find elements in either but not both', () => {
      type A = readonly ['a', 'b', 'c']
      type B = readonly ['b', 'c', 'd']
      type Result = SymmetricDifference<A, B>
      expectTypeOf<Result>().toMatchTypeOf<readonly string[]>()
    })
  })

  describe('SetComplement - Arrays', () => {
    it('should find complement', () => {
      type Universe = readonly ['a', 'b', 'c', 'd', 'e']
      type A = readonly ['a', 'b']
      type Result = SetComplement<Universe, A>
      expectTypeOf<Result>().toMatchTypeOf<readonly string[]>()
    })
  })

  describe('IsDisjointUnion - Three arrays', () => {
    it('should verify three disjoint arrays', () => {
      type A = readonly [1, 2]
      type B = readonly ['a', 'b']
      type C = readonly [true, false]
      type Result = IsDisjointUnion<A, B, C>
      expectTypeOf<Result>().toEqualTypeOf<true>()
    })

    it('should detect overlap in three arrays', () => {
      type A = readonly [1, 2, 3]
      type B = readonly [3, 4, 5]
      type C = readonly [6, 7, 8]
      type Result = IsDisjointUnion<A, B, C>
      expectTypeOf<Result>().toEqualTypeOf<false>()
    })
  })

  describe('AreAllDisjoint - Arrays', () => {
    it('should verify multiple disjoint arrays', () => {
      type Sets = [
        readonly [1, 2],
        readonly ['a', 'b'],
        readonly [true, false],
        readonly [null, undefined],
      ]
      type Result = AreAllDisjoint<Sets>
      expectTypeOf<Result>().toEqualTypeOf<true>()
    })

    it('should detect overlap in multiple arrays', () => {
      type Sets = [readonly [1, 2, 3], readonly [4, 5, 6], readonly [6, 7, 8]]
      type Result = AreAllDisjoint<Sets>
      expectTypeOf<Result>().toEqualTypeOf<false>()
    })

    it('should handle single set', () => {
      type Sets = [readonly ['alone']]
      type Result = AreAllDisjoint<Sets>
      expectTypeOf<Result>().toEqualTypeOf<true>()
    })

    it('should handle empty tuple', () => {
      type Sets = readonly []
      type Result = AreAllDisjoint<Sets>
      expectTypeOf<Result>().toEqualTypeOf<true>()
    })
  })

  describe('DisjointUnion - Arrays', () => {
    it('should create API response states', () => {
      const apiStates = {
        idle: [] as const,
        loading: ['request_id'] as const,
        success: ['data', 'metadata'] as const,
        error: ['error_code', 'message'] as const,
      } as const

      type ApiState = DisjointUnion<typeof apiStates>

      expectTypeOf<ApiState>().toMatchTypeOf<
        | { readonly tag: 'idle'; readonly value: never }
        | { readonly tag: 'loading'; readonly value: 'request_id' }
        | { readonly tag: 'success'; readonly value: 'data' | 'metadata' }
        | {
            readonly tag: 'error'
            readonly value: 'error_code' | 'message'
          }
      >()
    })

    it('should verify disjoint union sets are pairwise disjoint', () => {
      interface TrafficLight {
        red: readonly ['stop', 'halt']
        yellow: readonly ['slow', 'caution']
        green: readonly ['go', 'proceed']
      }

      type Result = ArePairwiseDisjoint<TrafficLight>
      expectTypeOf<Result>().toEqualTypeOf<true>()
    })
  })

  describe('Result type', () => {
    it('should create success/error union', () => {
      interface User {
        id: number
        name: string
      }
      type FetchResult = Result<User, 'network_error' | 'not_found'>

      expectTypeOf<FetchResult>().toMatchTypeOf<
        | { readonly tag: 'success'; readonly value: User }
        | {
            readonly tag: 'error'
            readonly value: 'network_error' | 'not_found'
          }
      >()
    })
  })

  describe('Option type', () => {
    it('should create Some/None union', () => {
      type MaybeString = Option<string>

      expectTypeOf<MaybeString>().toMatchTypeOf<
        | { readonly tag: 'some'; readonly value: string }
        | { readonly tag: 'none'; readonly value: never }
      >()
    })
  })

  describe('StateMachine type', () => {
    it('should create state machine from transitions', () => {
      interface AuthStates {
        logged_out: readonly []
        logging_in: readonly [string]
        logged_in: readonly [{ user: string; token: string }]
        error: readonly [string]
      }

      type AuthMachine = StateMachine<AuthStates>

      expectTypeOf<AuthMachine>().toMatchTypeOf<
        | { readonly tag: 'logged_out'; readonly value: never }
        | { readonly tag: 'logging_in'; readonly value: string }
        | {
            readonly tag: 'logged_in'
            readonly value: { user: string; token: string }
          }
        | { readonly tag: 'error'; readonly value: string }
      >()
    })
  })

  describe('Real-world array scenarios', () => {
    it('should handle event types with arrays', () => {
      type MouseEvents = readonly ['click', 'dblclick', 'mousedown', 'mouseup']
      type KeyEvents = readonly ['keydown', 'keyup', 'keypress']
      type TouchEvents = readonly ['touchstart', 'touchend', 'touchmove']

      type AllEvents = Union<Union<MouseEvents, KeyEvents>, TouchEvents>
      expectTypeOf<AllEvents>().toMatchTypeOf<
        readonly [
          'click',
          'dblclick',
          'mousedown',
          'mouseup',
          'keydown',
          'keyup',
          'keypress',
          'touchstart',
          'touchend',
          'touchmove',
        ]
      >()

      type AreDisjoint = IsDisjoint<MouseEvents, KeyEvents>
      expectTypeOf<AreDisjoint>().toEqualTypeOf<true>()
    })
  })
})
