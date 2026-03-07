# Database

Database migrations, seeds, and schema definitions for Honokit.

## Structure

```
database/
├── migrations/     # Database migrations (versioned schema changes)
├── seeds/          # Seed data for development/testing
└── schema/         # Schema documentation and types
```

## Migrations

Migrations are versioned changes to your database schema.

### Creating a Migration

```bash
# Create new migration file
touch migrations/2024-02-02_create_users_table.ts
```

### Migration Template

```typescript
// migrations/2024-02-02_create_users_table.ts
export async function up(db: Database) {
  await db.query(`
    CREATE TABLE users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email_encrypted TEXT NOT NULL,
      email_hash TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name_encrypted TEXT,
      role TEXT DEFAULT 'user',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `)
}

export async function down(db: Database) {
  await db.query(`DROP TABLE IF EXISTS users;`)
}
```

### Running Migrations

```bash
# Run all pending migrations
bun run db:migrate

# Rollback last migration
bun run migrate:rollback

# Drop all tables and re-run migrations (DESTRUCTIVE!)
bun run migrate:fresh
```

## Seeds

Seeds populate your database with test data for development.

### Creating Seeds

```typescript
// seeds/users.seed.ts
export async function seed(db: Database) {
  await db.query(`
    INSERT INTO users (email_encrypted, email_hash, password_hash, name_encrypted)
    VALUES
      ($1, $2, $3, $4),
      ($5, $6, $7, $8)
  `, [
    // User 1
    encrypt('admin@example.com'),
    await searchHash('admin@example.com'),
    await hashPassword('password123'),
    encrypt('Admin User'),
    // User 2
    encrypt('user@example.com'),
    await searchHash('user@example.com'),
    await hashPassword('password123'),
    encrypt('Regular User'),
  ])
}
```

### Running Seeds

```bash
# Run all seeds
bun run db:seed
```

## Schema Documentation

The `schema/` directory contains:
- Entity-Relationship diagrams
- Table documentation
- Type definitions for database models

## Database Choice

Currently supporting:
- **PostgreSQL** (recommended for production)
- **SQLite** (good for development)

Configure via `DATABASE_URL` in `.env`:

```bash
# PostgreSQL
DATABASE_URL=postgresql://user:password@localhost:5432/honokit_dev

# SQLite
DATABASE_URL=sqlite://./honokit.db
```

## Best Practices

1. **Always write `down()` migrations** - make migrations reversible
2. **Test migrations locally** before deploying
3. **Never edit old migrations** - create new ones
4. **Use transactions** for multi-step migrations
5. **Backup before production migrations**
6. **Document breaking changes** in migration comments

## References

- See `Architecture/Backend/Data-Encryption-Strategy.md` for encryption guidelines
- See `Architecture/Database/Schema.md` for full schema documentation (TODO)
