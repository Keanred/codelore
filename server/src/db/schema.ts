import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const repos = pgTable('repos', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  githubId: text('github_id').notNull(),
  githubOwner: text('github_owner').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const files = pgTable('files', {
  id: uuid('id').primaryKey().defaultRandom(),
  repoId: uuid('repo_id')
    .notNull()
    .references(() => repos.id),
  path: text('path').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const commits = pgTable('commits', {
  id: uuid('id').primaryKey().defaultRandom(),
  repoId: uuid('repo_id')
    .notNull()
    .references(() => repos.id),
  commitHash: text('commit_hash').notNull(),
  message: text('message').notNull(),
  author: text('author').notNull(),
  date: timestamp('date').notNull(),
});

export const fileCommits = pgTable('file_commits', {
  id: uuid('id').primaryKey().defaultRandom(),
  fileId: uuid('file_id')
    .notNull()
    .references(() => files.id),
  commitId: uuid('commit_id')
    .notNull()
    .references(() => commits.id),
});

export const notes = pgTable('notes', {
  id: uuid('id').primaryKey().defaultRandom(),
  fileId: uuid('file_id')
    .notNull()
    .references(() => files.id),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// infer types
export type Repo = typeof repos.$inferSelect;
export type File = typeof files.$inferSelect;
export type Commit = typeof commits.$inferSelect;
export type FileCommit = typeof fileCommits.$inferSelect;
export type Note = typeof notes.$inferSelect;
