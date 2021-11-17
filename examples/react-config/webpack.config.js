const path = require('path');

const { compose } = require('@webpackon/core');
const { useTs } = require('@webpackon/use-typescript');
const { useReact } = require('@webpackon/use-react');
const { useHtmlTemplate } = require('@webpackon/use-html');
const { useBabel } = require('@webpackon/use-babel');
const { useCss } = require('@webpackon/use-css');
const { useFonts } = require('@webpackon/use-fonts');
const { useImages } = require('@webpackon/use-images');
const { useDevServer } = require('@webpackon/use-dev-server');

// module.exports = createConfig({
//   templatePath: path.resolve(__dirname, 'public', 'index.html'),
//   useTs: true,
//   entry: path.resolve(__dirname, 'src', 'index.tsx'),
//   modify: (config, { mode }) =>
//     compose(
//       useReactRefresh({ mode }),
//       useTs({ transpileLoaderUseItems: ['babel-loader'] })
//     )(config),
// });

module.exports = (_, { mode }) =>
  compose(
    useReact({ mode }),
    useHtmlTemplate({
      templatePath: path.resolve(__dirname, 'public', 'index.html'),
    }),
    useBabel(),
    useTs({ transpileLoaderUseItems: ['babel-loader'] }),
    useCss({ mode }),
    useFonts(),
    useImages({ mode }),
    useDevServer({ mode })
  )({
    target: 'web',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
  });
