import { Request, Response, Router } from 'express';
import { getFileCount } from '../services/files';
import { getNoteCount } from '../services/notes';
import { getRepoCount } from '../services/repos';

const statsRouter = Router();

statsRouter.get('/stats', async (_req: Request, res: Response) => {
  const repoCount = await getRepoCount();
  const fileCount = await getFileCount();
  const noteCount = await getNoteCount();
  const stats = {
    totalRepos: repoCount,
    totalFiles: fileCount,
    totalNotes: noteCount,
  };
  res.json(stats);
});

export default statsRouter;
