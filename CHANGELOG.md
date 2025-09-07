# Changelog

All notable changes to the `tsets` project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Migrated from npm to pnpm for better performance and disk space efficiency
- Updated all documentation to include pnpm commands alongside npm
- Updated release-it configuration to use pnpm commands

## [1.0.0] - 2025-09-07

### Added

- Initial release of `tsets` - TypeScript library for mathematical set operations
- **Core Set Operations**: Union (∪), Intersection (∩), Difference (\), Symmetric Difference (△)
- **Set Properties**: Cardinality (|A|), IsEmpty (∅), Subset (⊆), Equal (=)
- **Advanced Operations**: Cartesian Product (×), Power Set (𝒫), Set Complement (Aᶜ)
- **Logical Operations**: And (∧), Or (∨), Not (¬), Xor (⊕), Nand (↑), Nor (↓)
- **Complex Logic**: Implies (→), Iff (↔), AllTrue (⋀), AnyTrue (⋁)
- **Type Assertions**: IsTrue, IsFalse, If-then-else conditional types
- **Disjoint Unions**: TaggedValue, DisjointUnion, PatternMatcher
- **Utility Types**: Result<S,E>, Option<T>, StateMachine, EmptySet, Singleton
- **Enhanced Operations**: 
  - `Equale<A,B>` - Enhanced equality checking
  - `IsDisjointUnion<A,B,C>` - Multi-set disjoint validation
  - `AreAllDisjoint<[Sets...]>` - Variadic disjoint checking
- **Complex Validation Support**:
  - `IsTrue<And<Equale<Union<A,B>,C>,Equale<Intersection<A,B>,EmptySet>>>` 
  - Multi-condition logical expressions with compile-time validation
- **Types-only Library**: Zero runtime overhead, pure compile-time operations
- **Rich Documentation**: Comprehensive JSDoc with mathematical notation and examples
- **Modern Tooling**: Vite build system, Vitest testing, ESLint configuration
- **Dual Module Support**: ES Modules + CommonJS exports
- **TypeScript 5.0+ Compatibility**: Full type inference and checking

### Technical Details

- 52 comprehensive type-level tests
- Mathematical notation in documentation (∪, ∩, ∅, ×, 𝒫, etc.)
- Complete TypeScript declaration files (.d.ts)
- Zero dependencies for end users
- Package size: 9.6 kB compressed, 41.0 kB unpacked

[Unreleased]: https://github.com/tupe12334/tsets/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/tupe12334/tsets/releases/tag/v1.0.0