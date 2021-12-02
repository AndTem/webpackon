<p align="center">
  <img src='https://raw.githubusercontent.com/AndTem/webpackon/master/images/logo.svg' height='80' width='80'>
  <a href="https://github.com/AndTem/webpackon#readme">Webpackon</a>
</p>

# @webpackon/use-html

Adds html template support (uses html-webpack-config).

Features:
- minify html for production

## Install
```shell
npm i @webpackon/use-html --save
```

```shell
yarn add @webpackon/use-html
```

## API

```ts
const { useHtml } = require('@webpackon/use-html');

useHtml(params: UseHtmlParams)(config: WebpackConfig)
```

### UseHtmlParams
```ts
export type UseHtmlParams = {
  mode: 'development' | 'production';
  title?: string;
  templatePath?: string;
};
```

- mode - webpack mode

- title - html title

- templatePath - path for html template

## Example

```js
const path = require('path');

const { compose } = require('@webpackon/core');
const { useHtml } = require('@webpackon/use-html');

module.exports = (_, { mode }) =>
  compose(
    useHtml({
      mode,
      templatePath: path.resolve(__dirname, 'public', 'index.html'),
    }),
  )({
    target: 'web',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
  });
```
