import { searchCommits, searchFiles, searchNotes } from '@/db/queries/search';
import { SearchResponse } from '@codelore/schemas';
import { NextFunction, Request, Response, Router } from 'express';
import { InternalServerError } from '../errors/http';

const searchRouter = Router();

searchRouter.get('/search', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { q, repoId } = req.query;
    if (typeof q !== 'string') {
      res.status(400).json({ error: "Query parameter 'q' is required and must be a string" });
      return;
    }

    const [files, commits, notes] = await Promise.all([
      searchFiles(q, typeof repoId === 'string' ? repoId : undefined),
      searchCommits(q, typeof repoId === 'string' ? repoId : undefined),
      searchNotes(q),
    ]);

    res.json(SearchResponse.parse({ files, commits, notes }));
  } catch {
    next(new InternalServerError('An error occurred while performing the search'));
  }
});

export default searchRouter;
