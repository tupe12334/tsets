import { describe, it, expectTypeOf } from 'vitest'
import type {
  DisjointUnion,
  TaggedValue,
  ExtractTag,
  ExtractValue,
  FilterByTag,
  PatternMatcher,
  Result,
  Option,
  StateMachine,
  ArePairwiseDisjoint,
} from '../disjoint'

describe('Disjoint Union Types', () => {
  describe('TaggedValue', () => {
    it('should create tagged values', () => {
      type Success = TaggedValue<'success', string>
      type Error = TaggedValue<'error', number>

      expectTypeOf<Success>().toEqualTypeOf<{
        readonly tag: 'success'
        readonly value: string
      }>()

      expectTypeOf<Error>().toEqualTypeOf<{
        readonly tag: 'error'
        readonly value: number
      }>()
    })
  })

  describe('DisjointUnion', () => {
    it('should create disjoint union from record of sets', () => {
      const resultTypes = {
        success: ['completed', 'finished'] as const,
        error: ['timeout', 'network_error'] as const,
      } as const

      type Union = DisjointUnion<typeof resultTypes>

      expectTypeOf<Union>().toEqualTypeOf<
        | { readonly tag: 'success'; readonly value: 'completed' | 'finished' }
        | { readonly tag: 'error'; readonly value: 'timeout' | 'network_error' }
      >()
    })
  })

  describe('ExtractTag and ExtractValue', () => {
    it('should extract tags from tagged values', () => {
      type MyTagged = TaggedValue<'success', string>
      type Tag = ExtractTag<MyTagged>

      expectTypeOf<Tag>().toEqualTypeOf<'success'>()
    })

    it('should extract values from tagged values', () => {
      type MyTagged = TaggedValue<'success', string>
      type Value = ExtractValue<MyTagged>

      expectTypeOf<Value>().toEqualTypeOf<string>()
    })
  })

  describe('FilterByTag', () => {
    it('should filter union by specific tag', () => {
      type Union = TaggedValue<'a', number> | TaggedValue<'b', string>
      type AValues = FilterByTag<Union, 'a'>

      expectTypeOf<AValues>().toEqualTypeOf<TaggedValue<'a', number>>()
    })
  })

  describe('PatternMatcher', () => {
    it('should create pattern matcher type', () => {
      type Union = TaggedValue<'success', string> | TaggedValue<'error', number>
      type Matcher = PatternMatcher<Union, boolean>

      expectTypeOf<Matcher>().toEqualTypeOf<{
        readonly success: (value: string) => boolean
        readonly error: (value: number) => boolean
      }>()
    })
  })

  describe('ArePairwiseDisjoint', () => {
    it('should return true for disjoint sets', () => {
      // Using type instead of interface to get implicit index signature
      // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
      type DisjointSets = {
        a: readonly ['x', 'y']
        b: readonly ['z', 'w']
      }
      type AreDisjoint = ArePairwiseDisjoint<DisjointSets>

      expectTypeOf<AreDisjoint>().toEqualTypeOf<true>()
    })

    it('should return false for overlapping sets', () => {
      // Using type instead of interface to get implicit index signature
      // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
      type OverlappingSets = {
        a: readonly ['x', 'y']
        b: readonly ['y', 'z']
      }
      type AreDisjoint = ArePairwiseDisjoint<OverlappingSets>

      expectTypeOf<AreDisjoint>().toEqualTypeOf<false>()
    })
  })

  describe('Result Type', () => {
    it('should represent success or error outcomes', () => {
      type ApiResult = Result<string, 'network_error' | 'timeout'>

      expectTypeOf<ApiResult>().toEqualTypeOf<
        | TaggedValue<'success', string>
        | TaggedValue<'error', 'network_error' | 'timeout'>
      >()
    })
  })

  describe('Option Type', () => {
    it('should represent optional values', () => {
      type MaybeString = Option<string>

      expectTypeOf<MaybeString>().toEqualTypeOf<
        TaggedValue<'some', string> | TaggedValue<'none', undefined>
      >()
    })
  })

  describe('StateMachine', () => {
    it('should create state machine from states record', () => {
      // Using type instead of interface to get implicit index signature
      // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
      type LoadingStates = {
        idle: readonly []
        loading: readonly [string]
        loaded: readonly [any]
        error: readonly [string]
      }

      type State = StateMachine<LoadingStates>

      expectTypeOf<State>().toEqualTypeOf<DisjointUnion<LoadingStates>>()
    })
  })

  describe('Real-world Usage Examples', () => {
    it('should work with API response modeling', () => {
      const apiStates = {
        pending: [] as const,
        success: ['data'] as const,
        error: ['message'] as const,
      } as const

      type ApiState = DisjointUnion<typeof apiStates>

      expectTypeOf<ApiState>().toEqualTypeOf<
        | { readonly tag: 'pending'; readonly value: never }
        | { readonly tag: 'success'; readonly value: 'data' }
        | { readonly tag: 'error'; readonly value: 'message' }
      >()
    })

    it('should work with authentication states', () => {
      const authStates = {
        anonymous: [] as const,
        authenticated: ['user', 'admin'] as const,
        expired: [] as const,
      } as const

      type AuthState = DisjointUnion<typeof authStates>
      type IsDisjoint = ArePairwiseDisjoint<typeof authStates>

      expectTypeOf<AuthState>().toMatchTypeOf<{
        readonly tag: keyof typeof authStates
        readonly value: any
      }>()

      expectTypeOf<IsDisjoint>().toEqualTypeOf<true>()
    })
  })
})
