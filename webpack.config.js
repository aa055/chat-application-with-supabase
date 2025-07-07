const Dotenv = require('dotenv-webpack');
const fs = require('fs');

const dotenvPath = './.env';
const dotenvExists = fs.existsSync(dotenvPath);

module.exports = {
  plugins: [
    new Dotenv({
      path: dotenvExists ? dotenvPath : undefined,
      silent: true // suppress warnings if .env missing
    })
  ]
};