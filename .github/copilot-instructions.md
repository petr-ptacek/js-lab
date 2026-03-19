# Copilot Instructions

## Repository Overview

This repository is a monorepo containing reusable TypeScript utilities and Vue components for frontend applications.

Packages:

* @petr-ptacek/js-core
* @petr-ptacek/vue-core

## Architecture

The repository follows a layered architecture.

vue-core
↓
js-core

Rules:

* vue-core may depend on js-core
* js-core must remain framework-agnostic
* js-core must never contain Vue-specific code

## Guidelines

General repository guidelines:

docs/guidelines/

Package-specific architecture rules are documented inside each package.

Example:

packages/js-core/internal/

## Internal packages

Some packages exist only for internal development.

Example:

`vue-test-utils`

Purpose:

* shared testing utilities for Vue components
* used by packages inside the monorepo

These packages are **not published** and are intended only for internal use.

