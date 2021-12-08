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
  imageminPlugins?: Array<[string, Record<string, unknown>]>;
};

const DEFAULT_IMAGEMIN_PLUGINS: UseUrlImagesParams['imageminPlugins'] = [
  ['jpegtran', { progressive: true }],
  ['svgo', {}],
];

export const useUrlImages = createConfigDecorator<UseUrlImagesParams, true>(
  (config, { loaderParams = {}, imageminPlugins, mode }) => {
    const prodPlugins = [
      new ImageMinimizerPlugin({
        minimizerOptions: {
          plugins: imageminPlugins || DEFAULT_IMAGEMIN_PLUGINS,
        },
      }),
    ];

    const modifyConfig = compose(
      addPlugins(isProduction(mode) ? prodPlugins : []),
      addLoaders([createUrlImagesLoader(loaderParams)])
    );

    return modifyConfig(config);
  }
);
