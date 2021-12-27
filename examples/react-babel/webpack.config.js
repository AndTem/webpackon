const path = require('path');

const { compose } = require('@webpackon/core');
const { useTs } = require('@webpackon/use-ts');
const { useReactRefresh } = require('@webpackon/use-react-refresh');
const { useHtml } = require('@webpackon/use-html');
const { useBabel } = require('@webpackon/use-babel');
const { useCss } = require('@webpackon/use-css');
const { useFonts } = require('@webpackon/use-fonts');
const { useUrlImages } = require('@webpackon/use-url-images');
const { useDevServer } = require('@webpackon/use-dev-server');
const { useOptimization } = require('@webpackon/use-optimization');
const { useTranspileModules } = require('@webpackon/use-transpile-modules');

module.exports = (_, { mode }) =>
  compose(
    useTranspileModules({ transpileModules: ['@webpackon/example-package'] }),
    useReactRefresh({ mode }),
    useHtml({
      mode,
      templatePath: path.resolve(__dirname, 'public', 'index.html'),
    }),
    useBabel({ useTs: true }),
    useTs(),
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
