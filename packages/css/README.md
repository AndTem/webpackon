<p align="center">
  <img src='https://raw.githubusercontent.com/AndTem/webpackon/master/images/logo.svg' height='80' width='80'>
  <a href="https://github.com/AndTem/webpackon#readme">Webpackon</a>
</p>

# @webpackon/use-css

Features:
- adds css support
- minify css
- optimize css with cssnano
- adds autoprefixer and postcss flexbugsFixes

## API

```ts
const { useCss } = require('@webpackon/use-css');

useCss(params: UseCssParams)(config: WebpackConfig)
```

### UseCssParams
```ts
export type UseCssParams = {
  mode: 'development' | 'production';
  enableCssModules?: boolean;
  cssLoaderParams?: {
    options?: Record<string, any>;
  };
  postCssPlugins?: any[];
  postCssLoaderOptions?: {
    options?: Record<string, any>;
  };
};
```

- mode - webpack mode

- enableCssModules - adds css modules support

- cssLoaderParams.options - [css-loader options](https://www.npmjs.com/package/css-loader#Options)

- postCssPlugins - [postcss plugins option](https://www.npmjs.com/package/postcss-loader#postcssOptions)

- postCssLoaderOptions.options - [postcss-loader option](https://www.npmjs.com/package/postcss-loader#Options)

## Example

```js
const path = require('path');

const { compose } = require('@webpackon/core');
const { useCss } = require('@webpackon/use-css');

module.exports = (_, { mode }) =>
  compose(
    useCss({ mode })
  )({
    target: 'web',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
  });
```
