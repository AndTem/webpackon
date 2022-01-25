import { createConfigDecorator, addLoaders } from '@webpackon/core';

import { FontsLoaderOptions, createFontsLoader } from './fontsLoader';

type UseFontsParams = {
  loaderParams?: FontsLoaderOptions;
  transpileModules?: string[];
};

export const useFonts = createConfigDecorator<UseFontsParams, false>(
  (config, { loaderParams, transpileModules } = {}) =>
    addLoaders([createFontsLoader({ transpileModules, ...loaderParams })])(
      config
    )
);
