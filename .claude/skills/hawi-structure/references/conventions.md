# TypeScript and tooling conventions

## tsconfig posture

`strict: true`, plus these - each one catches a class of bug that `strict` alone misses:

The live settings are in [tsconfig.json](../../../../tsconfig.json). The ones worth explaining:

```jsonc
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,   // arr[0] is T | undefined, which is the truth
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true, // { a?: string } no longer accepts { a: undefined }
    "paths": { "@/*": ["./src/*"] }
  }
}
```

`noUncheckedIndexedAccess` is the highest-value one and the most irritating for the first
week. It is correct: `rows[0]` genuinely can be `undefined`, and every "cannot read property of
undefined" in production is that lie catching up.

**`verbatimModuleSyntax` is deliberately OFF.** It is normally worth enabling, and an earlier
draft of this file recommended it. TanStack Start explicitly warns against it: with it on,
server bundles can leak into the client bundle. On a public marketing site that is a real
exposure, not a tidiness question. Leave it off.

`exactOptionalPropertyTypes` is on and does bite React props — an optional prop passed through
must be `string | undefined` explicitly rather than merely absent. That is why `FieldProps` in
`components/ui/Field.tsx` writes `error?: string | undefined`.

TypeScript is on the 5.9 line. Type-check in CI with `npm run typecheck`; Vite does not
type-check during dev or build, so a green build is not proof that types are sound.

## Types

**`type` by default, `interface` when declaration merging is needed** (rare, mostly module
augmentation). Consistency matters more than the choice.

**Never `any`.** Use `unknown` at boundaries and narrow. `any` does not silence one error - it
silently disables checking for everything downstream that touches the value.

**Avoid `as`.** A type assertion is a claim the compiler cannot verify, which means it is a
runtime bug waiting for the right input. At data boundaries, parse with Zod instead - that
turns an unchecked claim into a checked one. The legitimate uses are narrowing a literal
(`as const`) and DOM element types after a `querySelector`.

**Derive, do not duplicate.** If a type already exists, build from it: `Pick`, `Omit`,
`z.infer<typeof schema>`, `ReturnType`. A hand-written duplicate of an API type is guaranteed
to drift from it.

**Prefer unions over booleans for states.** `status: "idle" | "loading" | "error"` cannot
represent the impossible state that `isLoading && isError` can.

## Environment variables

Vite exposes only `VITE_`-prefixed vars to the client. **Everything in the client bundle is
public** - it ships to the browser and anyone can read it. No secret, API key, or token ever
goes in a `VITE_` variable.

Validate them once, at startup, so a missing variable fails immediately with a clear message
instead of surfacing as `undefined` in a fetch URL an hour later:

```ts
// src/lib/env.ts
import { z } from "zod";

const schema = z.object({
  VITE_API_URL: z.url(),
  VITE_ENV: z.enum(["development", "staging", "production"]),
});

export const env = schema.parse(import.meta.env);
```

Commit `.env.example` with every key and no values. Never commit `.env`.

## React 19 specifics

- **No `forwardRef` needed.** In React 19 `ref` is an ordinary prop on function components.
- **No `memo` / `useMemo` / `useCallback` by default.** Add them when a profiler shows a real
  problem. Speculative memoisation adds dependency arrays that go stale and cost more in bugs
  than they save in renders.
- **`use()`** for reading promises and context conditionally.
- **Keys must be stable identity, never array index.** An index key makes React reuse the wrong
  DOM node when the list reorders, which shows up as input values jumping between rows.
- **Effects are for synchronising with something outside React** - a subscription, a timer, the
  document title. Not for transforming props into state (compute during render) and not for
  fetching (TanStack Query owns that). Most `useEffect` in a codebase is a bug that has not
  been noticed yet.

## Imports

Order, enforced by the linter so nobody thinks about it:

1. React and external packages
2. `@/` internal absolute imports
3. Relative imports
4. Type-only imports (`import type`)
5. CSS

## Errors

Throw `Error` subclasses with useful messages, not strings. An error message is read by a
developer at 2am with no other context - `"Failed to load patient"` is useless,
`"GET /patients/42 returned 403"` is not.

Catch only where you can do something about it. A `try/catch` that logs and rethrows adds
noise; a `try/catch` that swallows an error makes the failure invisible and the bug permanent.

## What does not belong in this repo

- Generated files (`dist/`, `.tanstack/`, coverage output) - gitignored.
- Commented-out code. Git remembers it; the comment just makes the file harder to read.
- `console.log` in committed code. Use a logger, or remove it.
- Dead feature folders. Delete them - an unused feature is read as a live one by the next
  person, and by the next agent.
