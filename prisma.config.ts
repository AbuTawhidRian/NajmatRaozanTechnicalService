import { defineConfig } from 'prisma/config';
import * as fs from 'fs';
import * as path from 'path';

let directUrl = process.env.DIRECT_URL;
if (!directUrl) {
  try {
    const envContent = fs.readFileSync(path.resolve(process.cwd(), '.env'), 'utf8');
    const match = envContent.match(/DIRECT_URL="?([^"\n]+)"?/);
    if (match) {
      directUrl = match[1];
    }
  } catch (e) {
    // ignore
  }
}

export default defineConfig({
  datasource: {
    url: directUrl,
  },
  migrations: {
    seed: 'npx tsx ./prisma/seed.ts',
  },
});
