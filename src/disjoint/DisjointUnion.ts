import { SetLike } from '../types'

/**
 * Creates a disjoint union from a record of sets
 *
 * **Mathematical Definition:** A disjoint union ∐ᵢ Aᵢ where each element
 * is tagged with its originating set to maintain distinction
 *
 * @template T Record mapping tags to sets
 * @example
 * ```typescript
 * // With readonly arrays
 * const resultTypes = {
 *   success: ['completed', 'finished'] as const,
 *   error: ['timeout', 'network_error'] as const,
 * } as const;
 *
 * type Result = DisjointUnion<typeof resultTypes>;
 * // Result: { tag: 'success', value: 'completed' | 'finished' } |
 * //         { tag: 'error', value: 'timeout' | 'network_error' }
 *
 * // With Set objects
 * type StatusSets = {
 *   active: Set<'running' | 'pending'>;
 *   inactive: Set<'stopped' | 'paused'>;
 * };
 *
 * type Status = DisjointUnion<StatusSets>;
 * // Result: { tag: 'active', value: 'running' | 'pending' } |
 * //         { tag: 'inactive', value: 'stopped' | 'paused' }
 * ```
 */
export type DisjointUnion<T extends Record<string, SetLike<unknown>>> = {
  readonly [K in keyof T]: {
    readonly tag: K
    readonly value: T[K] extends readonly unknown[]
      ? T[K][number]
      : T[K] extends Set<infer E>
        ? E
        : never
  }
}[keyof T]
