import { Cardinality } from './Cardinality'
import { SetLike } from './SetLike'

/**
 * @deprecated Use Cardinality instead
 */
export type Size<T extends SetLike<unknown>> = Cardinality<T>
