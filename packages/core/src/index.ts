export { createLoader, addLoaders, LoaderCreatorParams } from './loader';
export { addPlugins, Plugin } from './plugin';
export {
  createConfigDecorator,
  Config,
  addResolveExtensions,
  addTranspileModulesToRule,
} from './config';
export { Mode, isProduction, isDevelopment } from './mode';
export {
  compose,
  getExcludePackagesRegexp,
  getIncludePackagesRegexp,
} from './common/utils';
export { createPackageErrorGenerator } from './errors';
