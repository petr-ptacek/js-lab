# Validation Utility Guidelines

This document defines specific guidelines for **validation utility documentation** that extend the general utility README guidelines. Validation utilities have unique characteristics that require specialized documentation approaches.

------------------------------------------------------------------------

## Validation-Specific Rules

### 1. Snippets Policy

**Default Rule**: Unless explicitly requested otherwise, validation utilities should include **only basic snippets**.

- ✅ **basic.ts** - Simple type checking examples
- ❌ Complex API validation examples
- ❌ Advanced use cases with classes
- ❌ Multi-file integration examples

**Rationale**: Validation utilities are typically simple type guards or checkers. Complex examples can confuse developers who just want to understand basic usage.

### 2. Example Exception

Complex snippets should only be created when:
- Explicitly requested by the developer
- The utility has advanced features beyond basic type checking
- The utility is part of a larger validation framework

### 3. Basic Snippet Structure

The basic snippet should demonstrate:
```ts
// Different input types being tested
const testValues = [
  validCase1,
  validCase2, 
  invalidCase1,
  invalidCase2
];

testValues.forEach(value => {
  console.log(`${JSON.stringify(value)} is valid:`, utilityFunction(value));
});
```

### 4. Type Guard Focus

For type guard utilities, emphasis should be on:
- Runtime type checking
- TypeScript type narrowing
- Generic type parameter usage (if applicable)
- Integration with conditional logic

------------------------------------------------------------------------

## Section Guidelines for Validation Utilities

### Required Sections (follow standard guidelines)
1. Title
2. Short Description  
3. Usage
4. Why This Utility Exists
5. Signature
6. Parameters (if applicable)
7. Type Parameters (if applicable) 
8. Return Type
9. Design Notes
10. When To Use
11. When Not To Use
12. Summary

### Validation-Specific Content

#### Why This Utility Exists
Focus on:
- TypeScript type guard benefits
- Runtime validation needs
- Type safety improvements
- Integration with unknown/any types

#### Design Notes
Should include:
- Relationship to native JavaScript methods (if any)
- TypeScript type guard behavior
- Generic type parameter usage
- Performance characteristics (zero overhead, etc.)

#### When To Use
Emphasize:
- Type-safe validation scenarios
- Working with unknown/any types
- Generic function development
- Runtime type checking needs

#### When Not To Use
Common anti-patterns:
- Using validation when types are already known
- Over-validation in performance-critical code
- Validation without TypeScript benefits

------------------------------------------------------------------------

## Examples

### ✅ Good Basic Snippet
```ts
// basic.ts
import { isString } from "@petr-ptacek/js-core";

const values = [
  "hello world",
  123,
  null,
  undefined,
  ["array"]
];

values.forEach(value => {
  console.log(`${JSON.stringify(value)} is string:`, isString(value));
});
```

### ❌ Overly Complex Snippet (avoid by default)
```ts
// complex-api-validation.ts - AVOID unless explicitly requested
class ApiValidator {
  validateUserData(data: unknown): User | null {
    // 50+ lines of complex validation logic...
  }
}
```

------------------------------------------------------------------------

## Meta Configuration

Validation utility meta.ts should reflect the simplified approach:

```ts
export const meta = {
  id: "utilityName",
  name: "utilityName", 
  description: "Brief description of validation purpose",
  category: "validation",
  tags: ["validation", "type-guard", /* specific tags */],
  demo: false,
  snippets: true, // only basic snippet
  since: "1.0.0",
} satisfies Meta;
```

------------------------------------------------------------------------

## README Template for Validation Utilities

Use this as a starting point for validation utility READMEs:

```markdown
# utilityName

Brief description of what the validation checks.

## Usage
Basic usage with type guard example.

## Why This Utility Exists
Focus on TypeScript type safety benefits.

## Signature
Include type guard signature: `value is Type`

## Parameters
Simple parameter description.

## Type Parameters (if applicable)
Generic type explanation.

## Return Type
Boolean with type guard behavior.

## Design Notes
TypeScript type guard behavior and relationship to native methods.

## When To Use
Type-safe validation scenarios.

## When Not To Use
Known type scenarios and performance considerations.

## Summary
Brief summary emphasizing type safety benefits.
```

------------------------------------------------------------------------

## Compliance

Existing validation utilities should be gradually updated to follow these guidelines:
- Remove complex snippets unless they serve a specific educational purpose
- Focus on basic type checking examples
- Emphasize TypeScript type guard benefits
- Keep documentation concise and practical

New validation utilities must follow these guidelines from the start.
