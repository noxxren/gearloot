# Seeds

Database seed files for development and testing.

## Purpose

Seeds populate your database with sample data for:
- **Development** - realistic data to work with
- **Testing** - consistent test fixtures
- **Demos** - showcase functionality

## Naming Convention

Format: `entity_name.seed.ts`

Examples:
- `users.seed.ts`
- `oauth_tokens.seed.ts`

## Template

```typescript
import type { Database } from '../types'
import { encrypt, searchHash, hashPassword } from '@honokit/backend/lib/encryption'

export async function seed(db: Database) {
  console.log('Seeding users...')

  await db.query(`
    INSERT INTO users (email_encrypted, email_hash, password_hash, name_encrypted)
    VALUES ($1, $2, $3, $4)
  `, [
    encrypt('test@example.com'),
    await searchHash('test@example.com'),
    await hashPassword('password123'),
    encrypt('Test User')
  ])

  console.log('✓ Users seeded')
}
```

## Important Notes

⚠️ **NEVER run seeds in production!**

Seeds are for development/testing only. They:
- May contain hardcoded passwords
- May delete existing data
- Are not designed for production use

## Running Seeds

```bash
# All seeds
bun run db:seed

# Specific seed (if you implement it)
bun run seed users
```
