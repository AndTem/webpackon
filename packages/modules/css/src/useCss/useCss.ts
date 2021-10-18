import path from 'path';

import {
  createConfigDecorator,
  addLoaders,
  Mode,
  isProduction,
  Plugin,
  compose,
  addPlugins,
} from '@webpackon/core';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

import { createCssLoader, CssLoaderOptions } from '../cssLoader';
import { createPostCssLoader, PostCssLoaderOptions } from '../postCssLoader';

type UseCssParams = {
  mode: Mode;
  cssLoaderParams?: Partial<CssLoaderOptions>;
  postCssPlugins?: PostCssLoaderOptions['plugins'];
  postCssLoaderOptions?: Partial<PostCssLoaderOptions>;
};

const getMiniCssExtractPlugin = (mode: Mode): Plugin =>
  new MiniCssExtractPlugin({
    filename: path.join(
      'styles',
      isProduction(mode) ? '[hash].css' : '[name].css'
    ),
  });

export const useCss = createConfigDecorator<UseCssParams, true>(
  (config, { cssLoaderParams, mode, postCssPlugins, postCssLoaderOptions }) => {
    const modifyConfig = compose(
      addLoaders([
        createCssLoader({ mode, ...cssLoaderParams }),
        createPostCssLoader({
          mode,
          plugins: postCssPlugins,
          ...postCssLoaderOptions,
        }),
      ]),
      addPlugins([getMiniCssExtractPlugin(mode)])
    );

    return modifyConfig({
      ...config,
      optimization: {
        ...config.optimization,
        minimizer: [
          ...config.optimization.minimizer,
          new OptimizeCSSAssetsPlugin(),
        ],
      },
    });
  }
);