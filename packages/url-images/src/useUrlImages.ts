import {
  createConfigDecorator,
  addLoaders,
  addPlugins,
  Mode,
  isProduction,
  compose,
} from '@webpackon/core';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';

import {
  UrlImagesLoaderOptions,
  createUrlImagesLoader,
} from './urlImagesLoader';

type UseUrlImagesParams = {
  mode: Mode;
  loaderParams?: UrlImagesLoaderOptions;
  transpileModules?: string[];
  imageminPlugins?: Array<[string, Record<string, unknown>]>;
};

const DEFAULT_IMAGEMIN_PLUGINS: UseUrlImagesParams['imageminPlugins'] = [
  ['jpegtran', { progressive: true }],
  ['svgo', {}],
];

export const useUrlImages = createConfigDecorator<UseUrlImagesParams, true>(
  (config, { loaderParams = {}, transpileModules, imageminPlugins, mode }) => {
    const prodPlugins = [
      new ImageMinimizerPlugin({
        minimizerOptions: {
          plugins: imageminPlugins || DEFAULT_IMAGEMIN_PLUGINS,
        },
      }),
    ];

    const modifyConfig = compose(
      addPlugins(isProduction(mode) ? prodPlugins : []),
      addLoaders([createUrlImagesLoader({ transpileModules, ...loaderParams })])
    );

    return modifyConfig(config);
  }
);
