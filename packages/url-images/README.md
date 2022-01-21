<p align="center">
  <img src='https://raw.githubusercontent.com/AndTem/webpackon/master/images/logo.svg' height='120' width='120'>
</p>
<p align="center">
  <a href="https://github.com/AndTem/webpackon#readme">Webpackon</a>
</p>

# @webpackon/use-url-images

Features:
- adds support imports images as url from scripts and css files
- transforming jpeg to progressive jpeg (default)
- minification svg (default)

Supported extensions:
- png
- jpg
- jpeg
- gif
- webp
- svg

## Install
```shell
npm i @webpackon/use-url-images --save
```

```shell
yarn add @webpackon/use-url-images
```

## API

```ts
const { useUrlImages } = require('@webpackon/use-url-images');

useUrlImages(params: UseUrlImagesParams)(config: WebpackConfig)
```

### UseUrlImagesParams
```ts
type UseUrlImagesParams = {
  mode: 'development' | 'production';
  loaderParams?: {
    generator?: Record<string, any>;
  };
  imageminPlugins?: Array<[string, Record<string, unknown>]>;
  transpileModules?: string[];
};
```

- ```mode``` - webpack mode
- ```loaderParams.generator``` - [webpack option](https://webpack.js.org/guides/asset-modules/#custom-data-uri-generator)
- ```imageminPlugins``` - [image-minimizer-webpack-plugin](https://www.npmjs.com/package/image-minimizer-webpack-plugin) ```plugin``` option
- ```transpileModules```
```ts
useUrlImages({
  mode: 'production',
  transpileModules: ['my-package']
})
```

## Example
Full examples are [here](https://github.com/AndTem/webpackon/tree/master/examples)

```webpack.config.js```
```js
const path = require('path');

const { compose } = require('@webpackon/core');
const { useUrlImages } = require('@webpackon/use-url-images');

module.exports = (_, { mode }) =>
  compose(
    useUrlImages({ mode }),
  )({
    target: 'web',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
  });
```

```example.js```
```js
import myImageSrc from 'public/images/myImage.svg';

...
<img src={myImageSrc} alt="my image" />
...
```

```example.css```
```css
article {
  background-image: url('~public/images/bg-image.jpg');
}
```
