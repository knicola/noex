# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.3.0] - 2021-12-04
### Added
* Ability to chain a sequence of predicates (see `.chain()` method).
### Fixed
* Issue with promisified functions not resolving correctly ([#2](https://github.com/knicola/noex/issues/2)).

## [1.2.0] - 2021-11-04
### Added
* Ability to run a series of predicates and return their results.

## [1.1.0] - 2021-10-18
### Added
* New method `wrap()` to wrap functions with noex.
### Fixed
* Example in readme.

## [1.0.0] - 2021-10-17
### Added
* Initial `noex` release.
