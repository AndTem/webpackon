import {
  createLoader,
  LoaderCreatorParams,
  Mode,
  isProduction,
} from '@webpackon/core';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

type CssLoaderAddParams = {
  mode: Mode;
  enableCssModules?: boolean;
  options?: Record<string, any>;
};

export type CssLoaderOptions = LoaderCreatorParams<CssLoaderAddParams>;

export const createCssLoader = createLoader<CssLoaderOptions>(
  ({ options, mode, enableCssModules = false }) => ({
    test: /\.css$/,
    use: [
      isProduction(mode) ? MiniCssExtractPlugin.loader : 'style-loader',
      {
        loader: 'css-loader',
        options: { importLoaders: 1, modules: enableCssModules, ...options },
      },
    ],
  })
);
