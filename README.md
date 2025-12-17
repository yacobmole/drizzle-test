# Drizzle Example
This project demonstrates a minimal use of Drizzle ORM's features TypeScript.

## Project Structure
- `src/schema.ts` &mdash; basic table definitions
- `src/db.ts` &mdash; database client configuration and Relations V2 configuration
- `src/examples/*.ts` &mdash; runnable examples showcasing different aspects of Drizzle
- `migrations/**` &mdash; SQL migration artifacts generated for the schema

## Prerequisites
- Installed dependencies via `pnpm install`

## Getting Started
1. Install dependencies: `pnpm install`
2. Run an example: `pnpm tsx src/examples/basic-qb-v2.ts`

## Documentation
- [Relations V2](https://orm.drizzle.team/docs/relations-v2)
