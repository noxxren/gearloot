# lib/

Shared utility functions and libraries used across the backend.

## Structure

- **encryption.ts** - Data encryption/decryption utilities (see Architecture/Backend/Data-Encryption-Strategy.md)
- **database.ts** - Database connection and query helpers
- **validation.ts** - Input validation utilities
- **logger.ts** - Logging configuration

## Guidelines

- Keep functions pure when possible
- Export only what's needed
- Add JSDoc comments for public APIs
- Write unit tests for all utilities
