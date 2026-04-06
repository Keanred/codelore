import { CreateNoteInput } from '@codelore/schemas';
import { NextFunction, Request, Response, Router } from 'express';
import { ZodError } from 'zod';
import { BadRequestError, InternalServerError, isHttpError } from '../errors/http';
import { createNote, deleteNote, getNotesByFileId } from '../services/notes';

const notesRouter = Router();

notesRouter.get('/files/:fileId/notes', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fileId } = req.params;
    const notes = await getNotesByFileId(fileId);
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes for file:', error);
    next(isHttpError(error) ? error : new InternalServerError('Failed to fetch notes'));
  }
});

notesRouter.post('/files/:fileId/notes', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsedRequest = CreateNoteInput.parse({ fileId: req.params.fileId, ...req.body });
    const note = await createNote(parsedRequest.fileId, parsedRequest.content);
    res.status(201).json(note);
  } catch (error) {
    console.error('Error creating note for file:', error);
    if (error instanceof ZodError) {
      return next(new BadRequestError(error.errors[0]?.message ?? 'Invalid request'));
    }
    next(isHttpError(error) ? error : new InternalServerError('Failed to create note'));
  }
});

notesRouter.delete('/files/:fileId/notes/:noteId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { noteId } = req.params;
    await deleteNote(noteId);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting note:', error);
    next(isHttpError(error) ? error : new InternalServerError('Failed to delete note'));
  }
});

export default notesRouter;
