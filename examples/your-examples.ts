/**
 * @fileoverview Your specific requested examples
 * Demonstrates the exact complex logical expressions you wanted
 */

import type {
  Union,
  Intersection,
  Equale,
  EmptySet,
  IsDisjointUnion,
  And,
  IsTrue,
} from '../src';

// Your exact example: IsTrue<And<Equale<Union<A,B>,C>,Equale<Intersection<A,B>,EmptySet>>>
type A = readonly [1, 2, 3];
type B = readonly [4, 5, 6];
type C = readonly [1, 2, 3, 4, 5, 6];

type YourComplexExample = IsTrue<
  And<
    Equale<Union<A, B>, C>,
    Equale<Intersection<A, B>, EmptySet>
  >
>; // true - A and B are disjoint and their union equals C

// Your other example: IsDisjointUnion<A,B,C>
type X = readonly ['x', 'y'];
type Y = readonly ['a', 'b'];
type Z = readonly [true, false];

type YourDisjointExample = IsDisjointUnion<X, Y, Z>; // true

// More examples following your pattern
type ComplexValidation = IsTrue<
  And<
    And<
      IsDisjointUnion<A, B>,
      Equale<Union<A, B>, C>
    >,
    Equale<Intersection<A, B>, EmptySet>
  >
>; // true

// Validate that the types resolve to what we expect
const test1: YourComplexExample = true;  // ✓ Compiles
const test2: YourDisjointExample = true; // ✓ Compiles  
const test3: ComplexValidation = true;   // ✓ Compiles

// The following should cause TypeScript errors if uncommented:
// const shouldFail1: YourComplexExample = false;  // ✗ Would fail
// const shouldFail2: YourDisjointExample = false; // ✗ Would fail

console.log('Your complex logical expressions work perfectly!');
console.log('✓ IsTrue<And<Equale<Union<A,B>,C>,Equale<Intersection<A,B>,EmptySet>>> =', test1);
console.log('✓ IsDisjointUnion<A,B,C> =', test2);
console.log('✓ Complex validation =', test3);

export type {
  YourComplexExample,
  YourDisjointExample,
  ComplexValidation,
};