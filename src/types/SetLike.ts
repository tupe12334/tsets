/**
 * Represents a set-like structure using readonly arrays or Set objects
 * @template T The type of elements in the set
 * @example
 * ```typescript
 * // Using readonly arrays
 * const myArraySet: SetLike<string> = ['a', 'b', 'c'] as const;
 *
 * // Using Set objects
 * const mySet: SetLike<string> = new Set(['a', 'b', 'c']);
 * ```
 */
export type SetLike<T> = readonly T[] | Set<T>
