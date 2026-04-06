import { CommitResponse, FileResponse, NoteResponse } from '@codelore/schemas';
import { and, eq, sql } from 'drizzle-orm';
import { db } from '../client';
import { commits, files, notes } from '../schema';

export const searchFiles = async (query: string, repoId?: string): Promise<FileResponse[]> => {
  const result = await db
    .select()
    .from(files)
    .where(
      and(
        sql`to_tsvector('english', ${files.path}) @@ plainto_tsquery('english', ${query})`,
        repoId ? eq(files.repoId, repoId) : undefined,
      ),
    )
    .limit(20);
  return result;
};

export const searchCommits = async (query: string, repoId?: string): Promise<CommitResponse[]> => {
  const result = await db
    .select()
    .from(commits)
    .where(
      and(
        sql`to_tsvector('english', ${commits.message}) @@ plainto_tsquery('english', ${query})`,
        repoId ? eq(commits.repoId, repoId) : undefined,
      ),
    )
    .limit(20);
  return result;
};

export const searchNotes = async (query: string): Promise<(NoteResponse & { filePath: string })[]> => {
  const result = await db
    .select({ note: notes, filePath: files.path })
    .from(notes)
    .innerJoin(files, eq(files.id, notes.fileId))
    .where(sql`to_tsvector('english', ${notes.content}) @@ plainto_tsquery('english', ${query})`)
    .limit(20);
  return result.map((row) => ({ ...row.note, filePath: row.filePath }));
};
