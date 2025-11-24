/**
 * Creates a singleton set containing exactly one element
 *
 * **Mathematical Definition:** {a} = the set containing only element a
 *
 * @template T The single element type
 * @example
 * ```typescript
 * type Single = Singleton<'hello'>; // readonly ['hello']
 * ```
 */
export type Singleton<T> = readonly [T]
