/**
 * @fileoverview Logical operations and boolean algebra for type-level computations
 * Provides compile-time logical operations for complex set theory validations
 */

/**
 * Logical AND operation
 * 
 * **Mathematical Definition:** A ∧ B is true if both A and B are true
 * 
 * @template A First boolean type
 * @template B Second boolean type
 * @example
 * ```typescript
 * type Result1 = And<true, true>;   // true
 * type Result2 = And<true, false>;  // false
 * type Result3 = And<false, true>;  // false
 * type Result4 = And<false, false>; // false
 * ```
 */
export type And<A extends boolean, B extends boolean> = A extends true
  ? B extends true
    ? true
    : false
  : false;

/**
 * Logical OR operation
 * 
 * **Mathematical Definition:** A ∨ B is true if at least one of A or B is true
 * 
 * @template A First boolean type
 * @template B Second boolean type
 * @example
 * ```typescript
 * type Result1 = Or<true, true>;   // true
 * type Result2 = Or<true, false>;  // true
 * type Result3 = Or<false, true>;  // true
 * type Result4 = Or<false, false>; // false
 * ```
 */
export type Or<A extends boolean, B extends boolean> = A extends true
  ? true
  : B extends true
  ? true
  : false;

/**
 * Logical NOT operation
 * 
 * **Mathematical Definition:** ¬A is true if A is false, and false if A is true
 * 
 * @template A Boolean type to negate
 * @example
 * ```typescript
 * type Result1 = Not<true>;  // false
 * type Result2 = Not<false>; // true
 * ```
 */
export type Not<A extends boolean> = A extends true ? false : true;

/**
 * Logical XOR (exclusive or) operation
 * 
 * **Mathematical Definition:** A ⊕ B is true if exactly one of A or B is true
 * 
 * @template A First boolean type
 * @template B Second boolean type
 * @example
 * ```typescript
 * type Result1 = Xor<true, true>;   // false
 * type Result2 = Xor<true, false>;  // true
 * type Result3 = Xor<false, true>;  // true
 * type Result4 = Xor<false, false>; // false
 * ```
 */
export type Xor<A extends boolean, B extends boolean> = Or<And<A, Not<B>>, And<Not<A>, B>>;

/**
 * Logical NAND operation
 * 
 * **Mathematical Definition:** A ↑ B is true if NOT both A and B are true
 * 
 * @template A First boolean type
 * @template B Second boolean type
 * @example
 * ```typescript
 * type Result1 = Nand<true, true>;   // false
 * type Result2 = Nand<true, false>;  // true
 * type Result3 = Nand<false, true>;  // true
 * type Result4 = Nand<false, false>; // true
 * ```
 */
export type Nand<A extends boolean, B extends boolean> = Not<And<A, B>>;

/**
 * Logical NOR operation
 * 
 * **Mathematical Definition:** A ↓ B is true if neither A nor B is true
 * 
 * @template A First boolean type
 * @template B Second boolean type
 * @example
 * ```typescript
 * type Result1 = Nor<true, true>;   // false
 * type Result2 = Nor<true, false>;  // false
 * type Result3 = Nor<false, true>;  // false
 * type Result4 = Nor<false, false>; // true
 * ```
 */
export type Nor<A extends boolean, B extends boolean> = Not<Or<A, B>>;

/**
 * Logical implication operation
 * 
 * **Mathematical Definition:** A → B is false only when A is true and B is false
 * 
 * @template A Antecedent (if part)
 * @template B Consequent (then part)
 * @example
 * ```typescript
 * type Result1 = Implies<true, true>;   // true
 * type Result2 = Implies<true, false>;  // false
 * type Result3 = Implies<false, true>;  // true
 * type Result4 = Implies<false, false>; // true
 * ```
 */
export type Implies<A extends boolean, B extends boolean> = Or<Not<A>, B>;

/**
 * Logical biconditional (if and only if) operation
 * 
 * **Mathematical Definition:** A ↔ B is true if A and B have the same truth value
 * 
 * @template A First boolean type
 * @template B Second boolean type
 * @example
 * ```typescript
 * type Result1 = Iff<true, true>;   // true
 * type Result2 = Iff<true, false>;  // false
 * type Result3 = Iff<false, true>;  // false
 * type Result4 = Iff<false, false>; // true
 * ```
 */
export type Iff<A extends boolean, B extends boolean> = And<Implies<A, B>, Implies<B, A>>;

/**
 * N-ary AND operation for multiple boolean values
 * 
 * **Mathematical Definition:** ⋀ᵢ Aᵢ is true if all Aᵢ are true
 * 
 * @template Bools Tuple of boolean types
 * @example
 * ```typescript
 * type Result1 = AllTrue<[true, true, true]>;     // true
 * type Result2 = AllTrue<[true, false, true]>;    // false
 * type Result3 = AllTrue<[]>;                     // true (vacuous truth)
 * ```
 */
export type AllTrue<Bools extends readonly boolean[]> = Bools extends readonly []
  ? true
  : Bools extends readonly [infer Head, ...infer Tail]
  ? Tail extends readonly boolean[]
    ? Head extends true
      ? AllTrue<Tail>
      : false
    : false
  : false;

/**
 * N-ary OR operation for multiple boolean values
 * 
 * **Mathematical Definition:** ⋁ᵢ Aᵢ is true if at least one Aᵢ is true
 * 
 * @template Bools Tuple of boolean types
 * @example
 * ```typescript
 * type Result1 = AnyTrue<[false, false, false]>;  // false
 * type Result2 = AnyTrue<[false, true, false]>;   // true
 * type Result3 = AnyTrue<[]>;                     // false
 * ```
 */
export type AnyTrue<Bools extends readonly boolean[]> = Bools extends readonly []
  ? false
  : Bools extends readonly [infer Head, ...infer Tail]
  ? Tail extends readonly boolean[]
    ? Head extends true
      ? true
      : AnyTrue<Tail>
    : false
  : false;

/**
 * Type-level assertion that a type is true
 * 
 * **Mathematical Definition:** Asserts that the proposition is true at compile time
 * 
 * @template T Boolean type that should be true
 * @example
 * ```typescript
 * type Test1 = IsTrue<Equal<readonly [1, 2], readonly [1, 2]>>; // true
 * type Test2 = IsTrue<false>; // false
 * ```
 */
export type IsTrue<T extends boolean> = T extends true ? true : false;

/**
 * Type-level assertion that a type is false
 * 
 * **Mathematical Definition:** Asserts that the proposition is false at compile time
 * 
 * @template T Boolean type that should be false
 * @example
 * ```typescript
 * type Test1 = IsFalse<IsDisjoint<readonly [1, 2], readonly [2, 3]>>; // false (they're not disjoint)
 * type Test2 = IsFalse<true>; // false
 * ```
 */
export type IsFalse<T extends boolean> = T extends false ? true : false;

/**
 * Conditional type selection based on boolean condition
 * 
 * **Mathematical Definition:** If-then-else construct for types
 * 
 * @template Condition Boolean condition type
 * @template TrueType Type to select if condition is true
 * @template FalseType Type to select if condition is false
 * @example
 * ```typescript
 * type Result1 = If<true, 'yes', 'no'>;   // 'yes'
 * type Result2 = If<false, 'yes', 'no'>;  // 'no'
 * ```
 */
export type If<
  Condition extends boolean,
  TrueType,
  FalseType
> = Condition extends true ? TrueType : FalseType;