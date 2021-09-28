import {
  createConfigDecorator,
  Mode,
  isDevelopment,
  addPlugins,
  compose,
} from '@webpackon/core';
import reactRefreshBabelPlugin from 'react-refresh/babel';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import { withBabel, WithBabelParams } from '@webpackon/babel';
import { withTs, WithTsParams } from '@webpackon/typescript';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

type WithReactRefreshParams = Pick<WithBabelParams, 'transpileModules'> & {
  mode: Mode;
  babelParams?: WithBabelParams;
  tsParams?: WithTsParams;
  useTs?: boolean;
};

// TODO: remove connectivity with withBabel, withTs
export const withReactRefresh = createConfigDecorator<
  WithReactRefreshParams,
  true
>((config, { useTs, transpileModules, babelParams, tsParams, mode }) => {
  if (useTs) {
    return withTs({
      transpileModules,
      ...tsParams,
      loaderParams: {
        ...tsParams?.loaderParams,
        options: {
          ...tsParams?.loaderParams?.options,
          getCustomTransformers: () => ({
            before: isDevelopment(mode) ? [ReactRefreshTypeScript()] : [],
          }),
        },
      },
    })(config);
  }

  const baseBabelPlugins = babelParams?.loaderParams?.options?.plugins || [];
  const babelPlugins = isDevelopment(mode)
    ? [...baseBabelPlugins, reactRefreshBabelPlugin]
    : baseBabelPlugins;

  const modifyConfig = compose(
    withBabel({
      transpileModules,
      ...babelParams,
      loaderParams: {
        ...babelParams?.loaderParams,
        options: {
          ...babelParams?.loaderParams?.options,
          plugins: babelPlugins,
        },
      },
    }),
    addPlugins(isDevelopment(mode) ? [] : [new ReactRefreshWebpackPlugin()])
  );

  return modifyConfig(config);
});
