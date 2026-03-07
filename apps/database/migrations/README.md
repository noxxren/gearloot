# Migrations

Database migration files go here.

## Naming Convention

Format: `YYYY-MM-DD_description.ts`

Examples:
- `2024-02-02_create_users_table.ts`
- `2024-02-03_add_oauth_tokens_table.ts`
- `2024-02-04_add_user_avatar_column.ts`

## Order

Migrations run in alphabetical order (date prefix ensures chronological order).

## Template

```typescript
import type { Database } from '../types'

export async function up(db: Database) {
  // Create/modify schema
  await db.query(`
    -- Your SQL here
  `)
}

export async function down(db: Database) {
  // Reverse the changes
  await db.query(`
    -- Your rollback SQL here
  `)
}
```
