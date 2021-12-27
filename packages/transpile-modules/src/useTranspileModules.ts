import {
  createConfigDecorator,
  createPackageErrorGenerator,
  getExcludePackagesRegexp,
} from '@webpackon/core';

import { addExcludeToAllLoaders } from './utils';

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

  return addExcludeToAllLoaders(
    config,
    getExcludePackagesRegexp(transpileModules)
  );
});
