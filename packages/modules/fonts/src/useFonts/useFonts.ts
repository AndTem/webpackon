import { createConfigDecorator, addLoaders } from '@webpackon/core';

import { FontsLoaderOptions, createFontsLoader } from '../fontsLoader';

type UseFontsParams = {
  loaderParams?: FontsLoaderOptions;
};

export const useFonts = createConfigDecorator<UseFontsParams, false>(
  (config, { loaderParams } = {}) =>
    addLoaders([createFontsLoader(loaderParams || {})])(config)
);
