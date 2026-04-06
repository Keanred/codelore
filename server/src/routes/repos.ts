import { ConnectRepoInput } from '@codelore/schemas';
import { NextFunction, Request, Response, Router } from 'express';
import { ZodError } from 'zod';
import { config } from '../config';
import { BadRequestError, InternalServerError, NotFoundError, isHttpError } from '../errors/http';
import { getUserRepos } from '../services/github';
import { connectRepo, getRepoById, getRepos } from '../services/repos';
import { syncRepo } from '../services/sync';

const router = Router();
const githubToken = config.githubToken;

// List GitHub repositories available to connect — must be before /repos/:id
router.get('/repos/external', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await getUserRepos(githubToken);
    res.json(results);
  } catch (error) {
    console.error('Error fetching external repos:', error);
    next(isHttpError(error) ? error : new InternalServerError('Failed to fetch external repositories'));
  }
});

// List all connected repositories
router.get('/repos', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await getRepos();
    res.json(results);
  } catch (error) {
    console.error('Error fetching repos:', error);
    next(isHttpError(error) ? error : new InternalServerError('Failed to fetch repositories'));
  }
});

router.post('/repos/:id/sync', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const repo = await getRepoById(id);
    if (!repo) {
      return next(new NotFoundError('Repository not found'));
    }
    syncRepo(repo.id, repo.githubOwner, repo.name).catch((err) => {
      console.error(`syncRepo failed for repo ${repo.id}:`, err);
    });
    res.status(202).json({ message: 'Sync started' });
  } catch (error) {
    console.error('Error syncing repo:', error);
    next(isHttpError(error) ? error : new InternalServerError('Failed to start sync'));
  }
});

// Get a single connected repository by ID
router.get('/repos/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const repo = await getRepoById(id);
    if (!repo) {
      return next(new NotFoundError('Repository not found'));
    }
    res.json(repo);
  } catch (error) {
    console.error('Error fetching repo:', error);
    next(isHttpError(error) ? error : new InternalServerError('Failed to fetch repository'));
  }
});

// Save repo to DB and trigger initial sync
router.post('/repos/connect', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const input = ConnectRepoInput.parse(req.body);
    const result = await connectRepo(input);
    syncRepo(result.id, input.owner, input.name).catch((err) =>
      console.error(`syncRepo failed for repo ${result.id}:`, err),
    );
    res.status(201).json(result);
  } catch (error) {
    console.error('Error connecting repo:', error);
    if (error instanceof ZodError) {
      return next(new BadRequestError(error.errors[0]?.message ?? 'Invalid request'));
    }
    next(isHttpError(error) ? error : new InternalServerError('Failed to connect repository'));
  }
});

export default router;
