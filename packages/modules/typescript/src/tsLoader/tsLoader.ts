import {
  createLoader,
  LoaderCreatorParams,
  getExcludePackagesRegexp,
} from '@webpackon/core';

type TsLoaderAddParams = {
  transpileModules?: string[];
  enableTypeCheck?: boolean;
  options?: Record<string, unknown>;
};

export type TsLoaderOptions = LoaderCreatorParams<TsLoaderAddParams>;

export const createTsLoader = createLoader<TsLoaderAddParams>(
  ({ transpileModules, enableTypeCheck = false, options }) => ({
    test: /\.(ts|tsx)$/,
    exclude: transpileModules
      ? getExcludePackagesRegexp(transpileModules)
      : /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: enableTypeCheck,
          ...options,
        },
      },
    ],
  })
);
