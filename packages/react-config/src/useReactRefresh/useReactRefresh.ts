import {
  createConfigDecorator,
  Mode,
  isDevelopment,
  addPlugins,
  compose,
} from '@webpackon/core';
import reactRefreshBabelPlugin from 'react-refresh/babel';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import { useBabel, UseBabelParams } from '@webpackon/use-babel';
import {
  useTs as useTsDecorator,
  UseTsParams,
} from '@webpackon/use-typescript';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

type UseReactRefreshParams = Pick<UseBabelParams, 'transpileModules'> & {
  mode: Mode;
  babelParams?: UseBabelParams;
  tsParams?: UseTsParams;
  useTs?: boolean;
};

// TODO: remove connectivity use useBabel, useTs
export const useReactRefresh = createConfigDecorator<
  UseReactRefreshParams,
  true
>((config, { useTs, transpileModules, babelParams, tsParams, mode }) => {
  if (useTs) {
    return useTsDecorator({
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
    useBabel({
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
