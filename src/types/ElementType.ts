/**
 * Extracts the element type from a SetLike type
 * @template S SetLike type (readonly array or Set)
 * @internal
 */
export type ElementType<S> = S extends readonly (infer E)[]
  ? E
  : S extends Set<infer E>
    ? E
    : never
