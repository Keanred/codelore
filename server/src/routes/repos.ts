import { Request, Response, Router } from 'express';
import { getUserRepos } from '../services/github';

const router = Router();

// List ALL connected repositories
router.get('/repos', (req: Request, res: Response) => {
  // Mock data for repositories
  const repositories = [
    { id: 1, name: 'Repo One', description: 'First repository' },
    { id: 2, name: 'Repo Two', description: 'Second repository' },
    { id: 3, name: 'Repo Three', description: 'Third repository' },
  ];
  const results = getUserRepos('octocat');

  res.json(repositories);
});

// Get a single connected repository by ID
router.get('/repos/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  // Mock data for a single repository
  const repository = { id: parseInt(id), name: `Repo ${id}`, description: `Repository with ID ${id}` };

  res.json(repository);
});

// List github repositories available to connect
router.get('/repos/external', (req: Request, res: Response) => {
  // Mock data for external repositories
  const externalRepositories = [
    { id: 1, name: 'External Repo One', description: 'First external repository' },
    { id: 2, name: 'External Repo Two', description: 'Second external repository' },
    { id: 3, name: 'External Repo Three', description: 'Third external repository' },
  ];

  res.json(externalRepositories);
});

router.post('/repos/connect', (req: Request, res: Response) => {
  const { repoId } = req.body;

  // Mock connection logic
  if (repoId) {
    res.json({ message: `Repository with ID ${repoId} connected successfully.` });
  } else {
    res.status(400).json({ error: 'Repository ID is required to connect.' });
  }
});

export default router;
