import { TaggedValue } from './TaggedValue'

/**
 * Extracts the value from a tagged value
 *
 * @template T Tagged value type
 * @example
 * ```typescript
 * type MyTagged = TaggedValue<'success', string>;
 * type Value = ExtractValue<MyTagged>; // string
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ExtractValue<T extends TaggedValue<any, any>> = T['value']
