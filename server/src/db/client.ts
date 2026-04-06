import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { config } from '../config';

const pgClient = postgres(config.databaseUrl);
export const db = drizzle(pgClient);

export const disconnectDb = async (): Promise<void> => {
  await pgClient.end();
};
