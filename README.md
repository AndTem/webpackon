# Webpackon
<p align="center">
  <img src='https://raw.githubusercontent.com/AndTem/webpackon/master/images/logo.svg' height='80' width='80'>
</p>

Webpackon - this is a collection of decorators for a quick tune webpack 5.

## JS
- [@webpackon/use-optimization]()
- [@webpackon/use-babel]()

## TypeScript
- [@webpackon/use-typeScript]()

## CSS
- [@webpackon/use-css]()

## HTML
- [@webpackon/use-html]()

## Fonts
- [@webpackon/use-fonts]()

## Images
- [@webpackon/use-url-images]()

## React
- [@webpackon/use-react-refresh]()

## Dev
- [@webpackon/use-dev-server]()

## Utils
- [@webpackon/core]()

## Example
Full example is [here]()

### React example
```webpack.config.js```
```js
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

```

Result:
<img src='https://raw.githubusercontent.com/AndTem/webpackon/master/images/react-example-result.png'>
