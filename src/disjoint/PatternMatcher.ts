import { ExtractTag } from './ExtractTag'
import { ExtractValue } from './ExtractValue'
import { FilterByTag } from './FilterByTag'
import { TaggedValue } from './TaggedValue'

/**
 * Creates a pattern matching function type for a disjoint union
 *
 * **Mathematical Definition:** A total function that maps each possible
 * tagged value to a result of type R
 *
 * @template T Disjoint union type
 * @template R Result type
 * @example
 * ```typescript
 * type Union = TaggedValue<'success', string> | TaggedValue<'error', number>;
 * type Matcher = PatternMatcher<Union, boolean>;
 * // Result: {
 * //   success: (value: string) => boolean;
 * //   error: (value: number) => boolean;
 * // }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PatternMatcher<T extends TaggedValue<any, any>, R> = {
  readonly [K in ExtractTag<T>]: (
    value: ExtractValue<FilterByTag<T, K & string>>
  ) => R
}
