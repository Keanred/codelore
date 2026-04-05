import { z } from 'zod';

// ---- GitHub API response schemas ----

const GitHubRepoSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  full_name: z.string(),
  private: z.boolean(),
  url: z.string().url(),
});
export type GitHubRepo = z.infer<typeof GitHubRepoSchema>;
export { GitHubRepoSchema as GitHubRepo };

const GitHubCommitSchema = z.object({
  sha: z.string(),
  commit: z.object({
    message: z.string(),
    author: z.object({
      name: z.string(),
      email: z.string(),
      date: z.string(),
    }),
  }),
});
export type GitHubCommit = z.infer<typeof GitHubCommitSchema>;
export { GitHubCommitSchema as GitHubCommit };

const GitHubCommitSummarySchema = z.object({
  sha: z.string(),
  message: z.string(),
  authorName: z.string(),
  authorEmail: z.string(),
  date: z.string(),
});
export type GitHubCommitSummary = z.infer<typeof GitHubCommitSummarySchema>;
export { GitHubCommitSummarySchema as GitHubCommitSummary };

const GitHubCommitFileSchema = z.object({
  files: z.array(
    z.object({
      filename: z.string(),
      status: z.string(),
      additions: z.number().int().nonnegative(),
      deletions: z.number().int().nonnegative(),
      changes: z.number().int().nonnegative(),
    }),
  ),
});
export type GitHubCommitFile = z.infer<typeof GitHubCommitFileSchema>;
export { GitHubCommitFileSchema as GitHubCommitFile };

// ---- Database entity response schemas ----

const RepoResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  githubId: z.string(),
  githubOwner: z.string(),
  createdAt: z.coerce.date(),
});
export type RepoResponse = z.infer<typeof RepoResponseSchema>;
export { RepoResponseSchema as RepoResponse };

const FileResponseSchema = z.object({
  id: z.string().uuid(),
  repoId: z.string().uuid(),
  path: z.string(),
  createdAt: z.coerce.date(),
});
export type FileResponse = z.infer<typeof FileResponseSchema>;
export { FileResponseSchema as FileResponse };

const CommitResponseSchema = z.object({
  id: z.string().uuid(),
  repoId: z.string().uuid(),
  commitHash: z.string(),
  message: z.string(),
  author: z.string(),
  date: z.coerce.date(),
});
export type CommitResponse = z.infer<typeof CommitResponseSchema>;
export { CommitResponseSchema as CommitResponse };

const NoteResponseSchema = z.object({
  id: z.string().uuid(),
  fileId: z.string().uuid(),
  content: z.string(),
  createdAt: z.coerce.date(),
});
export type NoteResponse = z.infer<typeof NoteResponseSchema>;
export { NoteResponseSchema as NoteResponse };

// ---- Input schemas ----

const ConnectRepoInputSchema = z.object({
  githubId: z.string().min(1),
  name: z.string().min(1),
  owner: z.string().min(1),
});
export type ConnectRepoInput = z.infer<typeof ConnectRepoInputSchema>;
export { ConnectRepoInputSchema as ConnectRepoInput };

const CreateNoteInputSchema = z.object({
  fileId: z.string().uuid(),
  content: z.string().min(1, 'Content is required'),
});
export type CreateNoteInput = z.infer<typeof CreateNoteInputSchema>;
export { CreateNoteInputSchema as CreateNoteInput };

// ---- Search response schema ----

const SearchResponseSchema = z.object({
  files: z.array(FileResponseSchema),
  commits: z.array(CommitResponseSchema),
  notes: z.array(NoteResponseSchema),
});
export type SearchResponse = z.infer<typeof SearchResponseSchema>;
export { SearchResponseSchema as SearchResponse };
