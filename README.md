# Webpackon
<p align="center">
  <img src='https://raw.githubusercontent.com/AndTem/webpackon/master/images/logo.svg' height='120' width='120'>
</p>
<p align="center">
  Webpackon - this is a collection of decorators for a quick tune webpack 5.
</p>

## JS
- [@webpackon/use-babel]()
- [@webpackon/use-swc]()

## TypeScript
- [@webpackon/use-ts]()

## Optimization
- [@webpackon/use-optimization]()
- [@webpackon/use-dev-server]()

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

## Utils
- [@webpackon/core]()

## Example
Full examples are [here](https://github.com/AndTem/webpackon/tree/master/examples)

### React with babel example
```webpack.config.js```

```js
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

module.exports = (_, { mode }) =>
  compose(
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

```

Result:
<img src='https://raw.githubusercontent.com/AndTem/webpackon/master/images/react-example-result.png'>
