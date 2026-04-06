import { dbCreateNote, dbDeleteNote, dbGetNoteCount, dbGetNotesByFileId } from '../db/queries/notes';
import { Note } from '../db/schema';
import { BadRequestError } from '../errors/http';
import { getFileById } from './files';

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

export const getNoteCount = async (): Promise<number> => {
  const noteCount = await dbGetNoteCount();
  return noteCount;
};
