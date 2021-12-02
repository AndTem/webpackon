import {
  createConfigDecorator,
  isDevelopment,
  createPackageErrorGenerator,
  Mode,
  compose,
  addPlugins,
} from '@webpackon/core';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

import { findLoaderIndex, modifyLoader } from './utils';

export type UseReactRefreshParams = {
  mode: Mode;
};

const generateError = createPackageErrorGenerator(
  '@webpackon/use-react-refresh'
);

const BABEL_LOADER_NAME = 'babel-loader';
const SWC_LOADER_NAME = 'swc-loader';

export const useReactRefresh = createConfigDecorator<
  UseReactRefreshParams,
  true
>((config, { mode }) => {
  if (!isDevelopment(mode)) return config;

  const babelLoaderIndex = findLoaderIndex({
    config,
    loaderName: BABEL_LOADER_NAME,
  });
  const swcLoaderIndex = findLoaderIndex({
    config,
    loaderName: SWC_LOADER_NAME,
  });

  if (babelLoaderIndex === -1 && swcLoaderIndex === -1) {
    throw generateError(
      'babel-loader or swc-loader not found. Add some of this to the config'
    );
  }

  const modifiedConfig = {
    ...config,
    devServer: { ...config.devServer, hot: true },
  };

  if (babelLoaderIndex !== -1) {
    const modifyConfig = compose(
      addPlugins([new ReactRefreshWebpackPlugin()]),
      modifyLoader({
        ruleIndex: babelLoaderIndex,
        loaderName: BABEL_LOADER_NAME,
        generateNewUseItem: (useItem) => ({
          ...useItem,
          loader: BABEL_LOADER_NAME,
          options: {
            ...useItem.options,
            plugins: [
              ...(useItem.options?.plugins || []),
              'react-refresh/babel',
            ],
          },
        }),
      })
    );

    return modifyConfig(modifiedConfig);
  }

  if (swcLoaderIndex !== -1) {
    const modifyConfig = modifyLoader({
      ruleIndex: babelLoaderIndex,
      loaderName: SWC_LOADER_NAME,
      generateNewUseItem: (useItem) => ({
        ...useItem,
        loader: SWC_LOADER_NAME,
        options: {
          ...useItem.options,
          jsc: {
            ...useItem.options?.jsc,
            transform: {
              ...useItem.options?.jsc?.transform,
              react: {
                ...useItem.options?.jsc?.transform?.react,
                development: true,
                refresh: true,
              },
            },
          },
        },
      }),
    });

    return modifyConfig(modifiedConfig);
  }

  return modifiedConfig;
});
