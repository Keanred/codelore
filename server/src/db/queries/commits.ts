import { desc, eq } from 'drizzle-orm';
import { db } from '../client';
import { commits } from '../schema';

export const dbUpsertCommit = async (
  repoId: string,
  commitHash: string,
  message: string,
  author: string,
  date: Date,
) => {
  const [result] = await db
    .insert(commits)
    .values({ repoId, commitHash, message, author, date })
    .onConflictDoUpdate({
      target: [commits.repoId, commits.commitHash],
      set: { message, author, date },
    })
    .returning();
  return result;
};

export const dbGetLatestCommitDate = async (repoId: string): Promise<string | null> => {
  const [result] = await db
    .select({ date: commits.date })
    .from(commits)
    .where(eq(commits.repoId, repoId))
    .orderBy(desc(commits.date))
    .limit(1);
  return result ? result.date.toISOString() : null;
};
