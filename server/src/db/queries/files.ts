import { sql } from 'drizzle-orm';
import { db } from '../client';
import { files } from '../schema';

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
