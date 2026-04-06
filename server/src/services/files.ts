import { dbGetCommitsByFileId, dbGetFileById, dbGetFileCount, dbGetFilesByRepoId } from '../db/queries/files';
import { Commit, File } from '../db/schema';
import { NotFoundError } from '../errors/http';

export const getFilesByRepoId = async (repoId: string): Promise<File[]> => {
  return await dbGetFilesByRepoId(repoId);
};

export const getFileById = async (fileId: string): Promise<File | null> => {
  const result = await dbGetFileById(fileId);
  if (!result) {
    throw new NotFoundError(`File with id ${fileId} not found`);
  }
  return result;
};

export const getCommitsByFileId = async (fileId: string): Promise<Commit[]> => {
  return await dbGetCommitsByFileId(fileId);
};

export const getFileCount = async () => {
  const fileCount = await dbGetFileCount();
  return fileCount;
};
