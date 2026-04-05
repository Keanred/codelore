import { db } from '../client';
import { fileCommits } from '../schema';

export const dbInsertFileCommit = async (fileId: string, commitId: string) => {
  await db.insert(fileCommits).values({ fileId, commitId }).onConflictDoNothing();
};
