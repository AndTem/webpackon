const path = require('path');

const { createConfig } = require('@webpackon/react-config');

module.exports = createConfig({
  templatePath: path.resolve(__dirname, 'public', 'index.html'),
  useTs: true,
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: path.resolve(__dirname, 'build'),
});
