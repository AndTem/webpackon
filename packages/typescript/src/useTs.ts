import { createConfigDecorator } from '@webpackon/core';

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

export type UseTsParams = {};

const TS_EXTENSIONS = ['.ts', '.tsx'];

export const useTs = createConfigDecorator<UseTsParams, false>((config) => {
  const { extensions: configExtensions = [], plugins: configPlugins = [] } =
    config.resolve || {};

  const extensions = Array.from(
    new Set([...configExtensions, ...TS_EXTENSIONS])
  );

  return {
    ...config,
    resolve: {
      ...config.resolve,
      plugins: [...configPlugins, new TsconfigPathsPlugin({ extensions })],
      extensions,
    },
  };
});
