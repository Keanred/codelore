import { ConnectRepoInput } from '@codelore/schemas';
import { Request, Response, Router } from 'express';
import { config } from '../config';
import { getUserRepos } from '../services/github';
import { connectRepo, getRepoById, getRepos } from '../services/repos';
import { syncRepo } from '../services/sync';

const router = Router();
const githubToken = config.githubToken;

// List GitHub repositories available to connect — must be before /repos/:id
router.get('/repos/external', async (_req: Request, res: Response) => {
  const results = await getUserRepos(githubToken);
  res.json(results);
});

// List all connected repositories
router.get('/repos', async (_req: Request, res: Response) => {
  const results = await getRepos();
  res.json(results);
});

router.post('/repos/:id/sync', async (req: Request, res: Response) => {
  const { id } = req.params;
  const repo = await getRepoById(id);
  if (!repo) {
    return res.status(404).json({ error: 'Repository not found' });
  }
  syncRepo(repo.id, repo.githubOwner, repo.name)
    .then(() => res.json({ message: 'Sync started' }))
    .catch((err) => {
      console.error(`syncRepo failed for repo ${repo.id}:`, err);
      res.status(500).json({ error: 'Failed to start sync' });
    });
});

// Get a single connected repository by ID
router.get('/repos/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const repo = await getRepoById(id);
  res.json(repo);
});

// Save repo to DB and trigger initial sync
router.post('/repos/connect', async (req: Request, res: Response) => {
  const input = ConnectRepoInput.parse(req.body);
  const result = await connectRepo(input);
  syncRepo(result.id, input.owner, input.name).catch((err) =>
    console.error(`syncRepo failed for repo ${result.id}:`, err),
  );
  res.status(201).json(result);
});

export default router;
