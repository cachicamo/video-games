const { writeFile } = require('fs');
const { argv } = require('yargs');
// read environment variables from .env file
require('dotenv').config();
// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';

if (!process.env.RAWG_KEY || !process.env.RAPIDAPI_KEY) {
   console.error('All the required environment variables were not provided!');
   process.exit(-1);
}

const targetPath = isProduction
   ? `./src/environments/environment.prod.ts`
   : `./src/environments/environment.ts`;
// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   RAPIDAPI_KEY: "${process.env.RAPIDAPI_KEY}",
   RAWG_KEY: "${process.env.RAWG_KEY}",
   BASE_URL: 'https://rawg-video-games-database.p.rapidapi.com'
};
`;
// write the content to the respective file
writeFile(targetPath, environmentFileContent, ((err) => {
   if (err) {
      console.log(err);
   }
   console.log(`Wrote variables to ${targetPath}`);
}));