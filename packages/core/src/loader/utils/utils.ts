import { Loader } from '../types';
import { Config } from '../../config';

export const addLoaders =
  (loaders: Loader[]) =>
  (config: Partial<Config>): Partial<Config> => ({
    ...config,
    module: {
      rules: [...(config.module?.rules || []), ...loaders],
    },
  });
