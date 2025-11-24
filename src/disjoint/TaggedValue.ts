/**
 * Creates a tagged value with a specific tag and value
 *
 * **Mathematical Definition:** An element (t, v) where t is the tag
 * identifying the originating set and v is the value
 *
 * @template Tag The tag type (usually a string literal)
 * @template Value The value type
 * @example
 * ```typescript
 * type Success = TaggedValue<'success', 'completed'>;
 * // Result: { readonly tag: 'success'; readonly value: 'completed'; }
 * ```
 */
export interface TaggedValue<Tag extends string | number | symbol, Value> {
  readonly tag: Tag
  readonly value: Value
}
