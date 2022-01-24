import {
  createConfigDecorator,
  createPackageErrorGenerator,
  addTranspileModulesToRule,
} from '@webpackon/core';

const generateError = createPackageErrorGenerator(
  '@webpackon/use-transpile-modules'
);

export type UseTranspileModulesParams = { transpileModules: string[] };

export const useTranspileModules = createConfigDecorator<
  UseTranspileModulesParams,
  true
>((config, { transpileModules }) => {
  if (!transpileModules)
    throw generateError('transpileModules param not found');

  return {
    ...config,
    module: {
      ...config.module,
      rules: config.module?.rules?.map((rule) =>
        addTranspileModulesToRule(rule, transpileModules)
      ),
    },
  };
});
