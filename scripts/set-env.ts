import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const environment = `
export const environment = {
  production: true,
  SUPABASE_URL: '${process.env["SUPABASE_URL"]}',
  SUPABASE_KEY: '${process.env["SUPABASE_KEY"]}',
};
`;

// fs.writeFileSync(envFile, environment);
fs.writeFileSync('./src/environments/environment.ts', environment);