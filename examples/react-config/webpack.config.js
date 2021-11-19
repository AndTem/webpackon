const path = require('path');

const { compose } = require('@webpackon/core');
const { useTs } = require('@webpackon/use-typescript');
const { useReactRefresh } = require('@webpackon/use-react-refresh');
const { useHtmlTemplate } = require('@webpackon/use-html');
const { useBabel } = require('@webpackon/use-babel');
const { useCss } = require('@webpackon/use-css');
const { useFonts } = require('@webpackon/use-fonts');
const { useUrlImages } = require('@webpackon/use-url-images');
const { useDevServer } = require('@webpackon/use-dev-server');
const { useOptimization } = require('@webpackon/use-optimization');

module.exports = (_, { mode }) =>
  compose(
    useReactRefresh({ mode }),
    useHtmlTemplate({
      templatePath: path.resolve(__dirname, 'public', 'index.html'),
    }),
    useBabel(),
    useTs({ transpileLoaderUseItems: ['babel-loader'] }),
    useCss({ mode }),
    useFonts(),
    useUrlImages({ mode }),
    useDevServer({ mode }),
    useOptimization({
      mode,
      splitChunkCacheGroups: [
        { chunkName: 'react', includePackages: ['react', 'react-dom'] },
      ],
    })
  )({
    target: 'web',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
  });
