import {
  createLoader,
  LoaderCreatorParams,
  getExcludePackagesRegexp,
} from '@webpackon/core';

type BabelLoaderAddParams = {
  transpileModules?: string[];
  options?: Record<string, any>;
  useTs?: boolean;
};

export type BabelLoaderOptions = LoaderCreatorParams<BabelLoaderAddParams>;

export const createBabelLoader = createLoader<BabelLoaderAddParams>(
  ({ options, transpileModules, useTs }) => ({
    test: useTs ? /\.(ts|tsx)$/ : /\.(js|jsx)$/,
    exclude: transpileModules
      ? getExcludePackagesRegexp(transpileModules)
      : /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options,
      },
    ],
  })
);
