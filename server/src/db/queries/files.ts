import { asc, desc, eq, sql } from 'drizzle-orm';
import { db } from '../client';
import { Commit, commits, File, fileCommits, files } from '../schema';

export const upsertFile = async (repoId: string, path: string) => {
  const [result] = await db
    .insert(files)
    .values({ repoId, path })
    .onConflictDoUpdate({
      target: [files.repoId, files.path],
      set: { path: sql`excluded.path` },
    })
    .returning();
  return result;
};

export const dbGetFilesByRepoId = async (repoId: string): Promise<File[]> => {
  const result = await db.select().from(files).where(eq(files.repoId, repoId)).orderBy(asc(files.path));
  return result;
};

export const dbGetFileById = async (fileId: string): Promise<File | null> => {
  const [result] = await db.select().from(files).where(eq(files.id, fileId));
  return result;
};

export const dbGetCommitsByFileId = async (fileId: string): Promise<Commit[]> => {
  const result = await db
    .select({ commits: commits })
    .from(commits)
    .innerJoin(fileCommits, eq(fileCommits.commitId, commits.id))
    .where(eq(fileCommits.fileId, fileId))
    .orderBy(desc(commits.date));
  return result.map((row) => row.commits);
};
