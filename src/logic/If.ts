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
  FalseType,
> = Condition extends true ? TrueType : FalseType
