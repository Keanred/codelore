import { ConnectRepoInput } from '@codelore/schemas';
import { Request, Response, Router } from 'express';
import { config } from '../config';
import { getUserRepos } from '../services/github';
import { connectRepo, getRepoById, getRepos } from '../services/repos';

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
  res.status(201).json(result);
});

export default router;
