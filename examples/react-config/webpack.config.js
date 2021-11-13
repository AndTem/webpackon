const path = require('path');

const { createConfig, compose } = require('@webpackon/react-config');
const { useTs } = require('@webpackon/use-typescript');
const { useReactRefresh } = require('@webpackon/use-react-refresh');

module.exports = createConfig({
  templatePath: path.resolve(__dirname, 'public', 'index.html'),
  useTs: true,
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  modify: (config, { mode }) =>
    compose(
      useReactRefresh({ mode }),
      useTs({ transpileLoaderUseItems: ['babel-loader'] })
    )(config),
});
