import { TaggedValue } from './TaggedValue'

/**
 * Represents the result of a computation that can either succeed or fail
 *
 * @template S Success value type
 * @template E Error value type
 * @example
 * ```typescript
 * type ApiResult = Result<User, 'network_error' | 'timeout'>;
 * // Result: { tag: 'success', value: User } |
 * //         { tag: 'error', value: 'network_error' | 'timeout' }
 * ```
 */
export type Result<S, E> = TaggedValue<'success', S> | TaggedValue<'error', E>
