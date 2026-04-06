import { dbCreateNote, dbDeleteNote, dbGetNotesByFileId } from '@/db/queries/notes';
import { dbGetCommitsByFileId, dbGetFileById, dbGetFilesByRepoId } from '../db/queries/files';
import { Commit, File, Note } from '../db/schema';
import { BadRequestError, NotFoundError } from '../errors/http';

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

export const getNotesByFileId = async (fileId: string) => {
  await getFileById(fileId); // throws NotFoundError if file doesn't exist
  return dbGetNotesByFileId(fileId);
};

export const createNote = async (fileId: string, content: string): Promise<Note> => {
  if (!content.trim()) {
    throw new BadRequestError('Content cannot be empty');
  }
  const result = await dbCreateNote({ fileId, content });
  return result;
};

export const deleteNote = async (noteId: string) => {
  await dbDeleteNote(noteId);
};
