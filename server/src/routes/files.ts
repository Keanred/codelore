import { CreateNoteInput } from '@codelore/schemas';
import { NextFunction, Request, Response, Router } from 'express';
import { ZodError } from 'zod';
import { BadRequestError, InternalServerError, isHttpError } from '../errors/http';
import {
  createNote,
  deleteNote,
  getCommitsByFileId,
  getFileById,
  getFilesByRepoId,
  getNotesByFileId,
} from '../services/files';

const filesRouter = Router();

filesRouter.get('/repos/:repoId/files', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { repoId } = req.params;
    const files = await getFilesByRepoId(repoId);
    res.json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    next(isHttpError(error) ? error : new InternalServerError('Failed to fetch files'));
  }
});

filesRouter.get('/files/:fileId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fileId } = req.params;
    const file = await getFileById(fileId);
    res.json(file);
  } catch (error) {
    console.error('Error fetching file:', error);
    next(isHttpError(error) ? error : new InternalServerError('Failed to fetch file'));
  }
});

filesRouter.get('/files/:fileId/commits', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fileId } = req.params;
    const commits = await getCommitsByFileId(fileId);
    res.json(commits);
  } catch (error) {
    console.error('Error fetching commits for file:', error);
    next(isHttpError(error) ? error : new InternalServerError('Failed to fetch commits'));
  }
});

filesRouter.get('/files/:fileId/notes', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fileId } = req.params;
    const notes = await getNotesByFileId(fileId);
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes for file:', error);
    next(isHttpError(error) ? error : new InternalServerError('Failed to fetch notes'));
  }
});

filesRouter.post('/files/:fileId/notes', async (req: Request, res: Response, next: NextFunction) => {
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

filesRouter.delete('/notes/:noteId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { noteId } = req.params;
    await deleteNote(noteId);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting note:', error);
    next(isHttpError(error) ? error : new InternalServerError('Failed to delete note'));
  }
});

export default filesRouter;
