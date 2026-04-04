import { GitHubCommit, GitHubCommitFile, GitHubRepo } from '@codelore/schemas';
import { z } from 'zod';
import { ForbiddenError, TooManyRequestsError } from '../errors/http';

export const getUserRepos = async (token: string) => {
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
  const validRepos = parsed.data.map((repo) => ({
    name: repo.name,
    fullName: repo.full_name,
    private: repo.private,
    url: repo.url,
  }));

  return validRepos;
};

const fetchCommitPage = async (token: string, repo: string, page: number, perPage: number) => {
  const url = new URL(`https://api.github.com/repos/${repo}/commits`);
  url.searchParams.set('per_page', String(perPage));
  url.searchParams.set('page', String(page));

  const response = await fetch(url, {
    headers: { Authorization: `token ${token}` },
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

export const getRepoCommits = async (token: string, repo: string, max = 100) => {
  const perPage = Math.min(max, 100);
  const pages = Math.ceil(max / perPage);

  const results = await Promise.all(
    Array.from({ length: pages }, (_, i) => fetchCommitPage(token, repo, i + 1, perPage)),
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

export const getCommitFiles = async (token: string, repo: string, sha: string) => {
  const response = await fetch(`https://api.github.com/repos/${repo}/commits/${sha}`, {
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
