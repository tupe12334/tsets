import { TaggedValue } from './TaggedValue'

/**
 * Represents an optional value that may or may not exist
 *
 * @template T The value type
 * @example
 * ```typescript
 * type MaybeString = Option<string>;
 * // Result: { tag: 'some', value: string } | { tag: 'none', value: undefined }
 * ```
 */
export type Option<T> = TaggedValue<'some', T> | TaggedValue<'none', undefined>
