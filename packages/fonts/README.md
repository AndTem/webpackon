<p align="center">
  <img src='https://raw.githubusercontent.com/AndTem/webpackon/master/images/logo.svg' height='120' width='120'>
</p>
<p align="center">
  <a href="https://github.com/AndTem/webpackon#readme">Webpackon</a>
</p>

# @webpackon/use-fonts

Adds loader for fonts.

Supported extensions:
- otf
- eot
- ttf
- woff
- woff2

## Install
```shell
npm i @webpackon/use-fonts --save
```

```shell
yarn add @webpackon/use-fonts
```

## API

```ts
const { useFonts } = require('@webpackon/use-fonts');

useFonts(params?: UseFontsParams)(config: WebpackConfig)
```

### UseFontsParams
```ts
export type UseFontsParams = {
  loaderParams?: {
    generator?: Record<string, any>;
  }
};
```

- loaderParams.generator - [webpack option](https://webpack.js.org/guides/asset-modules/#custom-data-uri-generator)

## Example
Full examples are [here](https://github.com/AndTem/webpackon/tree/master/examples)

```js
const path = require('path');

const { compose } = require('@webpackon/core');
const { useFonts } = require('@webpackon/use-fonts');

module.exports = (_, { mode }) =>
  compose(
    useFonts()
  )({
    target: 'web',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
  });
```
