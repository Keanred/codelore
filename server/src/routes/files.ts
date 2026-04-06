import { NextFunction, Request, Response, Router } from 'express';
import { InternalServerError, isHttpError } from '../errors/http';
import { getCommitsByFileId, getCommitsByRepoId, getFileById, getFilesByRepoId } from '../services/files';

const filesRouter = Router();

filesRouter.get('/repos/:repoId/commits', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { repoId } = req.params;
    const commits = await getCommitsByRepoId(repoId);
    res.json(commits);
  } catch (error) {
    console.error('Error fetching commits for repo:', error);
    next(isHttpError(error) ? error : new InternalServerError('Failed to fetch commits'));
  }
});

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

export default filesRouter;
