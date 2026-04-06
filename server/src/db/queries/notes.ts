import { CreateNoteInput } from '@codelore/schemas';
import { count, desc, eq } from 'drizzle-orm';
import { db } from '../client';
import { Note, notes } from '../schema';

export const dbGetNotesByFileId = async (fileId: string): Promise<Note[]> => {
  const result = db.select().from(notes).where(eq(notes.fileId, fileId)).orderBy(desc(notes.createdAt));
  return result;
};

export const dbCreateNote = async ({ fileId, content }: CreateNoteInput): Promise<Note> => {
  const [result] = await db.insert(notes).values({ fileId, content }).returning();
  return result;
};

export const dbDeleteNote = async (noteId: string): Promise<void> => {
  await db.delete(notes).where(eq(notes.id, noteId));
};

export const dbGetNoteCount = async (): Promise<number> => {
  const [countResult] = await db.select({ count: count(notes.id) }).from(notes);
  return Number(countResult.count);
};
