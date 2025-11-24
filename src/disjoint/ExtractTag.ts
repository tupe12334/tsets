import { TaggedValue } from './TaggedValue'

/**
 * Extracts the tag from a tagged value
 *
 * @template T Tagged value type
 * @example
 * ```typescript
 * type MyTagged = TaggedValue<'success', string>;
 * type Tag = ExtractTag<MyTagged>; // 'success'
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ExtractTag<T extends TaggedValue<any, any>> = T['tag']
