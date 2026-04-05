import { GitHubCommit, GitHubCommitFile, GitHubCommitSummary, GitHubRepo } from '@codelore/schemas';
import { z } from 'zod';
import { config } from '../config';
import { ForbiddenError, TooManyRequestsError } from '../errors/http';

export const getUserRepos = async (token: string): Promise<GitHubRepo[]> => {
  const response = await fetch('https://api.github.com/user/repos', {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  if (response.status === 403) {
    throw new ForbiddenError('GitHub access denied');
  }
  if (response.status === 429) {
    throw new TooManyRequestsError('GitHub API rate limit exceeded');
  }
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }
  const parsed = z.array(GitHubRepo).safeParse(await response.json());
  if (!parsed.success) {
    throw new Error(`GitHub API error: Invalid response format`);
  }
  return parsed.data.map((repo) => ({
    id: repo.id,
    name: repo.name,
    full_name: repo.full_name,
    private: repo.private,
    url: repo.url,
  }));
};

const fetchCommitPage = async (
  owner: string,
  repo: string,
  page: number,
  perPage: number,
  since?: string,
): Promise<GitHubCommit[]> => {
  const url = new URL(`https://api.github.com/repos/${owner}/${repo}/commits`);
  url.searchParams.set('per_page', String(perPage));
  url.searchParams.set('page', String(page));
  if (since) url.searchParams.set('since', since);

  const response = await fetch(url, {
    headers: { Authorization: `token ${config.githubToken}` },
  });
  if (response.status === 403) {
    throw new ForbiddenError('GitHub access denied');
  }
  if (response.status === 429) {
    throw new TooManyRequestsError('GitHub API rate limit exceeded');
  }
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }
  const parsed = z.array(GitHubCommit).safeParse(await response.json());
  if (!parsed.success) {
    throw new Error(`GitHub API error: Invalid response format`);
  }
  return parsed.data;
};

export const getRepoCommits = async (
  owner: string,
  repo: string,
  max = 100,
  since?: string,
): Promise<GitHubCommitSummary[]> => {
  const perPage = Math.min(max, 100);
  const pages = Math.ceil(max / perPage);

  const results = await Promise.all(
    Array.from({ length: pages }, (_, i) => fetchCommitPage(owner, repo, i + 1, perPage, since)),
  );
  return results
    .flat()
    .slice(0, max)
    .map((commit) => ({
      sha: commit.sha,
      message: commit.commit.message,
      authorName: commit.commit.author.name,
      authorEmail: commit.commit.author.email,
      date: commit.commit.author.date,
    }));
};

export const getCommitFiles = async (owner: string, repo: string, sha: string): Promise<GitHubCommitFile['files']> => {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits/${sha}`, {
    headers: {
      Authorization: `token ${config.githubToken}`,
    },
  });
  if (response.status === 403) {
    throw new ForbiddenError('GitHub access denied');
  }
  if (response.status === 429) {
    throw new TooManyRequestsError('GitHub API rate limit exceeded');
  }
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }
  const parsed = GitHubCommitFile.safeParse(await response.json());
  if (!parsed.success) {
    throw new Error(`GitHub API error: Invalid response format`);
  }
  return parsed.data.files.map((file) => ({
    filename: file.filename,
    status: file.status,
    additions: file.additions,
    deletions: file.deletions,
    changes: file.changes,
  }));
};
