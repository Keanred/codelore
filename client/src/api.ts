import {
  CommitResponse,
  ConnectRepoInput,
  FileResponse,
  GitHubRepo,
  NoteResponse,
  RepoResponse,
  SearchResponse,
} from '@codelore/schemas';

const API_BASE = '/api';

export class ApiClientError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
  }
}

const request = async <TResponse, TBody = unknown>(
  path: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET',
  body?: TBody,
): Promise<TResponse> => {
  const headers: HeadersInit = {};
  const init: RequestInit = { method, headers };

  if (body !== undefined) {
    (headers as Record<string, string>)['Content-Type'] = 'application/json';
    init.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE}${path}`, init);

  if (res.status === 204) {
    return undefined as TResponse;
  }

  const payload = await res.json();

  if (!res.ok) {
    const message = typeof payload?.error === 'string' ? payload.error : `Request failed with status ${res.status}`;
    throw new ApiClientError(message, res.status);
  }

  return payload as TResponse;
};

export const getRepos = async (): Promise<RepoResponse[]> => {
  return request<RepoResponse[]>('/repos');
};

export const getExternalRepos = async (): Promise<GitHubRepo[]> => {
  return request<GitHubRepo[]>('/external-repos');
};

export const connectRepo = async (input: ConnectRepoInput): Promise<RepoResponse> => {
  return request<RepoResponse, ConnectRepoInput>('/repos', 'POST', input);
};

export const triggerSync = async (repoId: string): Promise<void> => {
  await request(`/repos/${repoId}/sync`, 'POST');
};

export const getFiles = async (repoId: string): Promise<FileResponse[]> => {
  return request<FileResponse[]>(`/repos/${repoId}/files`);
};

export const getFile = async (fileId: string): Promise<FileResponse> => {
  return request<FileResponse>(`/files/${fileId}`);
};

export const getCommits = async (repoId: string): Promise<CommitResponse[]> => {
  return request<CommitResponse[]>(`/repos/${repoId}/commits`);
};

export const getFileCommits = async (fileId: string): Promise<CommitResponse[]> => {
  return request<CommitResponse[]>(`/files/${fileId}/commits`);
};

export const getFileNotes = async (fileId: string): Promise<NoteResponse[]> => {
  return request<NoteResponse[]>(`/files/${fileId}/notes`);
};

export const createNote = async (fileId: string, content: string): Promise<NoteResponse> => {
  return request<NoteResponse, { content: string }>(`/files/${fileId}/notes`, 'POST', { content });
};

export const deleteNote = async (fileId: string, noteId: string): Promise<void> => {
  await request(`/files/${fileId}/notes/${noteId}`, 'DELETE');
};

export const search = async (query: string, repoId?: string): Promise<SearchResponse> => {
  const params = new URLSearchParams({ q: query });
  if (repoId) {
    params.append('repoId', repoId);
  }
  return request<SearchResponse>(`/search?${params.toString()}`);
};

export const getStats = async (): Promise<{ repoCount: number; fileCount: number; noteCount: number }> => {
  return request<{ repoCount: number; fileCount: number; noteCount: number }>('/stats');
};
