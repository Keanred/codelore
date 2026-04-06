import { count, eq } from 'drizzle-orm';
import { db } from '../client';
import { repos } from '../schema';

type NewRepo = typeof repos.$inferInsert;

export const dbGetRepos = async () => {
  try {
    const results = await db.select().from(repos);
    return results;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
};

export const dbGetRepoById = async (id: string) => {
  try {
    const [result] = await db.select().from(repos).where(eq(repos.id, id)).limit(1);
    return result;
  } catch (error) {
    console.error(`Error fetching repository with ID ${id}:`, error);
    throw error;
  }
};

export const dbAddRepo = async (repo: NewRepo) => {
  try {
    const [result] = await db.insert(repos).values(repo).returning();
    return result;
  } catch (error) {
    console.error('Error adding repository:', error);
    throw error;
  }
};

export const dbGetRepoCount = async () => {
  try {
    const [countResult] = await db.select({ count: count(repos.id) }).from(repos);
    return Number(countResult.count);
  } catch (error) {
    console.error('Error counting repositories:', error);
    throw error;
  }
};
