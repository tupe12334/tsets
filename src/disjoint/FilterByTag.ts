import { TaggedValue } from './TaggedValue'

/**
 * Filters a disjoint union by tag, returning only values with the specified tag
 *
 * @template T Disjoint union type
 * @template Tag Tag to filter by
 * @example
 * ```typescript
 * type Union = TaggedValue<'a', number> | TaggedValue<'b', string>;
 * type AValues = FilterByTag<Union, 'a'>; // TaggedValue<'a', number>
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FilterByTag<T extends TaggedValue<any, any>, Tag extends string> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends TaggedValue<Tag, any> ? T : never
