const fs = require('fs');

const environment = `
export const environment = {
  production: true,
  supabaseUrl: '${process.env["SUPABASE_URL"]}',
  supabaseKey: '${process.env["SUPABASE_KEY"]}',
};
`;

fs.writeFileSync('./src/environments/environment.ts', environment);