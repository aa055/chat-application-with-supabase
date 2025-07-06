const fs = require('fs');
const path = require('path');

const envDir = path.join(__dirname, '../src/environments');
const envFile = path.join(envDir, 'environment.ts');

// 1. Create the directory if it doesn't exist
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

const environment = `
export const environment = {
  production: true,
  SUPABASE_URL: '${process.env["SUPABASE_URL"]}',
  SUPABASE_KEY: '${process.env["SUPABASE_KEY"]}',
};
`;

fs.writeFileSync(envFile, environment);
// fs.writeFileSync('./src/environments/environment.ts', environment);