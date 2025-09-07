import { describe, it, expectTypeOf } from 'vitest';
import type {
  SetLike,
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
  EmptySet,
  Singleton,
} from '../types';

describe('Set Types', () => {
  describe('SetLike', () => {
    it('should accept readonly arrays', () => {
      type TestSet = SetLike<string>;
      expectTypeOf<readonly string[]>().toMatchTypeOf<TestSet>();
      expectTypeOf<readonly ['a', 'b', 'c']>().toMatchTypeOf<TestSet>();
    });
  });

  describe('Union', () => {
    it('should create union of two sets A ∪ B', () => {
      type SetA = readonly ['a', 'b'];
      type SetB = readonly ['c', 'd'];
      type Result = Union<SetA, SetB>;
      
      expectTypeOf<Result>().toEqualTypeOf<readonly ['a', 'b', 'c', 'd']>();
    });

    it('should handle different types in union', () => {
      type Numbers = readonly [1, 2];
      type Strings = readonly ['a', 'b'];
      type Mixed = Union<Numbers, Strings>;
      
      expectTypeOf<Mixed>().toEqualTypeOf<readonly [1, 2, 'a', 'b']>();
    });
  });

  describe('Intersection', () => {
    it('should find common elements A ∩ B', () => {
      type SetA = readonly ['a', 'b', 'c'];
      type SetB = readonly ['b', 'c', 'd'];
      type Result = Intersection<SetA, SetB>;
      
      expectTypeOf<Result>().toMatchTypeOf<readonly string[]>();
    });
  });

  describe('Difference', () => {
    it('should find elements in A but not B (A \\ B)', () => {
      type SetA = readonly ['a', 'b', 'c'];
      type SetB = readonly ['b', 'c'];
      type Result = Difference<SetA, SetB>;
      
      expectTypeOf<Result>().toMatchTypeOf<readonly string[]>();
    });
  });

  describe('IsDisjoint', () => {
    it('should return true for disjoint sets', () => {
      type SetA = readonly ['a', 'b'];
      type SetB = readonly ['c', 'd'];
      type Result = IsDisjoint<SetA, SetB>;
      
      expectTypeOf<Result>().toEqualTypeOf<true>();
    });

    it('should return false for overlapping sets', () => {
      type SetA = readonly ['a', 'b'];
      type SetB = readonly ['b', 'c'];
      type Result = IsDisjoint<SetA, SetB>;
      
      expectTypeOf<Result>().toEqualTypeOf<false>();
    });
  });

  describe('Subset', () => {
    it('should return true when A ⊆ B', () => {
      type SetA = readonly ['a', 'b'];
      type SetB = readonly ['a', 'b', 'c'];
      type Result = Subset<SetA, SetB>;
      
      expectTypeOf<Result>().toEqualTypeOf<true>();
    });

    it('should return false when A ⊄ B', () => {
      type SetA = readonly ['a', 'b', 'd'];
      type SetB = readonly ['a', 'b', 'c'];
      type Result = Subset<SetA, SetB>;
      
      expectTypeOf<Result>().toEqualTypeOf<false>();
    });
  });

  describe('Equal', () => {
    it('should return true for equal sets', () => {
      type SetA = readonly ['a', 'b'];
      type SetB = readonly ['a', 'b'];
      type Result = Equal<SetA, SetB>;
      
      expectTypeOf<Result>().toEqualTypeOf<true>();
    });

    it('should return false for unequal sets', () => {
      type SetA = readonly ['a', 'b'];
      type SetB = readonly ['a', 'c'];
      type Result = Equal<SetA, SetB>;
      
      expectTypeOf<Result>().toEqualTypeOf<false>();
    });
  });

  describe('Cardinality', () => {
    it('should return the size of a set |A|', () => {
      type SetA = readonly ['a', 'b', 'c'];
      type Size = Cardinality<SetA>;
      
      expectTypeOf<Size>().toEqualTypeOf<3>();
    });

    it('should return 0 for empty set', () => {
      type Empty = readonly [];
      type Size = Cardinality<Empty>;
      
      expectTypeOf<Size>().toEqualTypeOf<0>();
    });
  });

  describe('IsEmpty', () => {
    it('should return true for empty set ∅', () => {
      type Empty = readonly [];
      type Result = IsEmpty<Empty>;
      
      expectTypeOf<Result>().toEqualTypeOf<true>();
    });

    it('should return false for non-empty set', () => {
      type NonEmpty = readonly ['a'];
      type Result = IsEmpty<NonEmpty>;
      
      expectTypeOf<Result>().toEqualTypeOf<false>();
    });
  });

  describe('CartesianProduct', () => {
    it('should create Cartesian product A × B', () => {
      type SetA = readonly ['a', 'b'];
      type SetB = readonly [1, 2];
      type Product = CartesianProduct<SetA, SetB>;
      
      expectTypeOf<Product>().toMatchTypeOf<
        readonly [readonly ['a', 1], readonly ['a', 2], readonly ['b', 1], readonly ['b', 2]]
      >();
    });
  });

  describe('SymmetricDifference', () => {
    it('should create symmetric difference A △ B', () => {
      type SetA = readonly ['a', 'b', 'c'];
      type SetB = readonly ['b', 'c', 'd'];
      type Result = SymmetricDifference<SetA, SetB>;
      
      expectTypeOf<Result>().toMatchTypeOf<readonly string[]>();
    });
  });

  describe('SetComplement', () => {
    it('should create complement A^c with respect to universe U', () => {
      type Universe = readonly ['a', 'b', 'c', 'd'];
      type SetA = readonly ['a', 'b'];
      type Complement = SetComplement<Universe, SetA>;
      
      expectTypeOf<Complement>().toMatchTypeOf<readonly string[]>();
    });
  });

  describe('Special Sets', () => {
    it('should define empty set ∅', () => {
      expectTypeOf<EmptySet>().toEqualTypeOf<readonly []>();
      
      type IsEmptyResult = IsEmpty<EmptySet>;
      expectTypeOf<IsEmptyResult>().toEqualTypeOf<true>();
    });

    it('should define singleton sets', () => {
      type Single = Singleton<'hello'>;
      expectTypeOf<Single>().toEqualTypeOf<readonly ['hello']>();
      
      type Size = Cardinality<Single>;
      expectTypeOf<Size>().toEqualTypeOf<1>();
    });
  });
});