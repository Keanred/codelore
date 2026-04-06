import { dbUpsertCommit } from '../db/queries/commits';
import { dbInsertFileCommit } from '../db/queries/fileCommits';
import { upsertFile } from '../db/queries/files';
import { getCommitFiles, getLatestCommitDate, getRepoCommits } from './github';

const CONCURRENCY = 5;

async function runConcurrent<T>(items: T[], concurrency: number, fn: (item: T) => Promise<void>): Promise<void> {
  for (let i = 0; i < items.length; i += concurrency) {
    await Promise.all(items.slice(i, i + concurrency).map(fn));
  }
}

export const syncRepo = async (repoId: string, owner: string, repoName: string): Promise<void> => {
  // Step 1: fetch commits since the last sync (or all commits on first run)
  const since = await getLatestCommitDate(repoId);
  const githubCommits = await getRepoCommits(owner, repoName, 100, since ?? undefined);

  // Step 2: upsert all commits into DB
  const savedCommits = await Promise.all(
    githubCommits.map((c) => dbUpsertCommit(repoId, c.sha, c.message, c.authorName, new Date(c.date))),
  );

  // Steps 3–5: fetch changed files per commit at capped concurrency
  await runConcurrent(savedCommits, CONCURRENCY, async (savedCommit) => {
    const changedFiles = await getCommitFiles(owner, repoName, savedCommit.commitHash);
    await Promise.all(
      changedFiles.map(async ({ filename }) => {
        const file = await upsertFile(repoId, filename);
        await dbInsertFileCommit(file.id, savedCommit.id);
      }),
    );
  });
};
