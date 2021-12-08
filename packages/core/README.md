<p align="center">
  <img src='https://raw.githubusercontent.com/AndTem/webpackon/master/images/logo.svg' height='120' width='120'>
</p>
<p align="center">
  <a href="https://github.com/AndTem/webpackon#readme">Webpackon</a>
</p>

# @webpackon/core
Utils collection for webpackon.

## Install
```shell
npm i @webpackon/core --save
```

```shell
yarn add @webpackon/core
```

## Utils

### compose
Used for composition webpackon decorators. Decorators applied from right to left or upwards.

#### Example

```js
const path = require('path');

const { compose } = require('@webpackon/core');
const { useCss } = require('@webpackon/use-css');
const { useBabel } = require('@webpackon/use-babel');

module.exports = (_, { mode }) =>
  compose(
    useCss({ mode }),
    useBabel()
  )({
    target: 'web',
    entry: path.resolve(__dirname, 'src', 'index.jsx'),
  });
```

### isProduction

#### Example

```js
const path = require('path');

const { compose, isProduction } = require('@webpackon/core');
const { useCss } = require('@webpackon/use-css');
const { useBabel } = require('@webpackon/use-babel');

module.exports = (_, { mode }) =>
  compose(
    useCss({ mode }),
    useBabel()
  )({
    target: 'web',
    entry: path.resolve(__dirname, 'src', 'index.jsx'),
    output: {
			clean: isProduction(mode)
    }
  });
```

### isDevelopment

#### Example

```js
const path = require('path');

const { compose, isDevelopment } = require('@webpackon/core');
const { useCss } = require('@webpackon/use-css');
const { useBabel } = require('@webpackon/use-babel');

module.exports = (_, { mode }) =>
  compose(
    useCss({ mode }),
    useBabel()
  )({
    target: 'web',
    entry: path.resolve(__dirname, 'src', 'index.jsx'),
    output: {
			clean: !isProduction(mode)
    }
  });
```
