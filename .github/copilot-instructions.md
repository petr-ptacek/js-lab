# Copilot Instructions

## Stack

- Monorepo (pnpm)
- TypeScript everywhere

## Repository Overview

This repository is a monorepo containing:

* reusable `TypeScript utilities`
* `Vue components` and `composables functions` for frontend applications

Packages:

* @petr-ptacek/js-core
* @petr-ptacek/vue-core

## Structure

- apps/ = applications that use the packages in the monorepo
- packages/ = reusable packages that can be used across multiple applications

## Internal packages

Some packages exist only for internal development.

Example:

`vue-test-utils`

Purpose:

* shared testing utilities for Vue components
* used by packages inside the monorepo

These packages are **not published** and are intended only for **internal use**.

## Architecture

vue-core → js-core

- vue-core may depend on js-core
- js-core must remain framework-agnostic
- js-core must not contain Vue-specific code

## General Rules

- Prefer explicit types to implicit ones.
- Avoid using `any` type; use more specific types instead.
- Use `const` for variables that are not reassigned.
- Follow consistent naming conventions (e.g., camelCase for variables and functions, PascalCase for types and classes).
- Write clear and concise comments where necessary, especially for complex logic.
- Use descriptive names for variables, functions, and types to enhance code readability.
- Keep functions small and focused on a single task.
- Each function should by easy to understand and test.
- Code quality is a priority; write clean, maintainable code that adheres to best practices.

## Guidelines

Detailed package architecture rules are documented inside each package.

Example:

* packages/js-core/internal/architecture

# Code Quality Requirements

All public utilities should include:

- TSDoc documentation for exported functions
- unit tests (Vitest)

Rules:

- TSDoc should clearly describe behavior and usage
- tests should verify behavior, not implementation details
- each utility should be easy to understand and test
