import { SetLike } from '../types'
import { DisjointUnion } from './DisjointUnion'

/**
 * Creates a type-safe state machine state representation
 *
 * @template States Record mapping state names to their data
 * @example
 * ```typescript
 * type LoadingStates = {
 *   idle: readonly [];
 *   loading: readonly [string]; // loading message
 *   loaded: readonly [any]; // loaded data
 *   error: readonly [string]; // error message
 * };
 * type State = StateMachine<LoadingStates>;
 * ```
 */
export type StateMachine<States extends Record<string, SetLike<unknown>>> =
  DisjointUnion<States>
