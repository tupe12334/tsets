import { describe, it, expectTypeOf } from 'vitest'
import type {
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
  Union,
  Intersection,
  Equale,
  EmptySet,
  IsDisjointUnion,
} from '../index'

describe('Logical Operations', () => {
  describe('Basic Boolean Operations', () => {
    it('should perform AND operations correctly', () => {
      expectTypeOf<And<true, true>>().toEqualTypeOf<true>()
      expectTypeOf<And<true, false>>().toEqualTypeOf<false>()
      expectTypeOf<And<false, true>>().toEqualTypeOf<false>()
      expectTypeOf<And<false, false>>().toEqualTypeOf<false>()
    })

    it('should perform OR operations correctly', () => {
      expectTypeOf<Or<true, true>>().toEqualTypeOf<true>()
      expectTypeOf<Or<true, false>>().toEqualTypeOf<true>()
      expectTypeOf<Or<false, true>>().toEqualTypeOf<true>()
      expectTypeOf<Or<false, false>>().toEqualTypeOf<false>()
    })

    it('should perform NOT operations correctly', () => {
      expectTypeOf<Not<true>>().toEqualTypeOf<false>()
      expectTypeOf<Not<false>>().toEqualTypeOf<true>()
    })

    it('should perform XOR operations correctly', () => {
      expectTypeOf<Xor<true, true>>().toEqualTypeOf<false>()
      expectTypeOf<Xor<true, false>>().toEqualTypeOf<true>()
      expectTypeOf<Xor<false, true>>().toEqualTypeOf<true>()
      expectTypeOf<Xor<false, false>>().toEqualTypeOf<false>()
    })

    it('should perform NAND operations correctly', () => {
      expectTypeOf<Nand<true, true>>().toEqualTypeOf<false>()
      expectTypeOf<Nand<true, false>>().toEqualTypeOf<true>()
      expectTypeOf<Nand<false, true>>().toEqualTypeOf<true>()
      expectTypeOf<Nand<false, false>>().toEqualTypeOf<true>()
    })

    it('should perform NOR operations correctly', () => {
      expectTypeOf<Nor<true, true>>().toEqualTypeOf<false>()
      expectTypeOf<Nor<true, false>>().toEqualTypeOf<false>()
      expectTypeOf<Nor<false, true>>().toEqualTypeOf<false>()
      expectTypeOf<Nor<false, false>>().toEqualTypeOf<true>()
    })

    it('should perform IMPLIES operations correctly', () => {
      expectTypeOf<Implies<true, true>>().toEqualTypeOf<true>()
      expectTypeOf<Implies<true, false>>().toEqualTypeOf<false>()
      expectTypeOf<Implies<false, true>>().toEqualTypeOf<true>()
      expectTypeOf<Implies<false, false>>().toEqualTypeOf<true>()
    })

    it('should perform IFF (biconditional) operations correctly', () => {
      expectTypeOf<Iff<true, true>>().toEqualTypeOf<true>()
      expectTypeOf<Iff<true, false>>().toEqualTypeOf<false>()
      expectTypeOf<Iff<false, true>>().toEqualTypeOf<false>()
      expectTypeOf<Iff<false, false>>().toEqualTypeOf<true>()
    })
  })

  describe('N-ary Operations', () => {
    it('should perform AllTrue operations correctly', () => {
      expectTypeOf<AllTrue<[]>>().toEqualTypeOf<true>()
      expectTypeOf<AllTrue<[true]>>().toEqualTypeOf<true>()
      expectTypeOf<AllTrue<[true, true, true]>>().toEqualTypeOf<true>()
      expectTypeOf<AllTrue<[true, false, true]>>().toEqualTypeOf<false>()
      expectTypeOf<AllTrue<[false, false, false]>>().toEqualTypeOf<false>()
    })

    it('should perform AnyTrue operations correctly', () => {
      expectTypeOf<AnyTrue<[]>>().toEqualTypeOf<false>()
      expectTypeOf<AnyTrue<[false]>>().toEqualTypeOf<false>()
      expectTypeOf<AnyTrue<[false, false, false]>>().toEqualTypeOf<false>()
      expectTypeOf<AnyTrue<[false, true, false]>>().toEqualTypeOf<true>()
      expectTypeOf<AnyTrue<[true, true, true]>>().toEqualTypeOf<true>()
    })
  })

  describe('Type Assertions', () => {
    it('should check IsTrue correctly', () => {
      expectTypeOf<IsTrue<true>>().toEqualTypeOf<true>()
      expectTypeOf<IsTrue<false>>().toEqualTypeOf<false>()
    })

    it('should check IsFalse correctly', () => {
      expectTypeOf<IsFalse<false>>().toEqualTypeOf<true>()
      expectTypeOf<IsFalse<true>>().toEqualTypeOf<false>()
    })
  })

  describe('Conditional Types', () => {
    it('should perform If operations correctly', () => {
      expectTypeOf<If<true, 'yes', 'no'>>().toEqualTypeOf<'yes'>()
      expectTypeOf<If<false, 'yes', 'no'>>().toEqualTypeOf<'no'>()
    })
  })

  describe('Complex Set Logic', () => {
    it('should validate your complex example', () => {
      type SetA = readonly [1, 2, 3]
      type SetB = readonly [4, 5, 6]
      type SetC = readonly [1, 2, 3, 4, 5, 6]

      // Test: IsTrue<And<Equale<Union<A,B>,C>, Equale<Intersection<A,B>, EmptySet>>>
      type ComplexTest = IsTrue<
        And<
          Equale<Union<SetA, SetB>, SetC>,
          Equale<Intersection<SetA, SetB>, EmptySet>
        >
      >

      expectTypeOf<ComplexTest>().toEqualTypeOf<true>()
    })

    it('should validate IsDisjointUnion', () => {
      type SetX = readonly ['a', 'b']
      type SetY = readonly ['c', 'd']
      type SetZ = readonly ['e', 'f']

      type ThreeWayDisjoint = IsDisjointUnion<SetX, SetY, SetZ>
      expectTypeOf<ThreeWayDisjoint>().toEqualTypeOf<true>()

      type OverlappingSets = IsDisjointUnion<
        readonly [1, 2],
        readonly [2, 3],
        readonly [4, 5]
      >
      expectTypeOf<OverlappingSets>().toEqualTypeOf<false>()
    })

    it('should work with AllTrue for cleaner syntax', () => {
      type SetA = readonly [1, 2]
      type SetB = readonly ['a', 'b']
      type SetC = readonly [true, false]

      type AllDisjoint = IsTrue<
        AllTrue<
          [
            IsDisjointUnion<SetA, SetB>,
            IsDisjointUnion<SetA, SetC>,
            IsDisjointUnion<SetB, SetC>,
          ]
        >
      >

      expectTypeOf<AllDisjoint>().toEqualTypeOf<true>()
    })
  })

  describe('Mathematical Properties', () => {
    it('should validate set absorption law', () => {
      type SetA = readonly [1, 2, 3]
      type SetB = readonly [2, 3, 4]

      // Absorption law: A ∪ (A ∩ B) = A
      type AbsorptionLaw = Equale<Union<SetA, Intersection<SetA, SetB>>, SetA>

      expectTypeOf<AbsorptionLaw>().toEqualTypeOf<true>()
    })

    it('should validate associativity', () => {
      type SetA = readonly [1, 2]
      type SetB = readonly [3, 4]
      type SetC = readonly [5, 6]

      // Associativity: A ∪ (B ∪ C) = (A ∪ B) ∪ C
      type Associative = Equale<
        Union<SetA, Union<SetB, SetC>>,
        Union<Union<SetA, SetB>, SetC>
      >

      expectTypeOf<Associative>().toEqualTypeOf<true>()
    })
  })

  describe('Real-world Examples', () => {
    it('should validate API state disjointness', () => {
      const apiStates = {
        idle: [] as const,
        loading: ['request_id'] as const,
        success: ['data'] as const,
        error: ['error_code'] as const,
      } as const

      type StatesDisjoint = IsTrue<
        AllTrue<
          [
            IsDisjointUnion<typeof apiStates.idle, typeof apiStates.loading>,
            IsDisjointUnion<typeof apiStates.idle, typeof apiStates.success>,
            IsDisjointUnion<typeof apiStates.loading, typeof apiStates.error>,
          ]
        >
      >

      expectTypeOf<StatesDisjoint>().toEqualTypeOf<true>()
    })
  })
})
