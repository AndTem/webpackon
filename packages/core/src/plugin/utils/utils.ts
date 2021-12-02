import { Plugin } from '../types';
import { Config } from '../../config';

export const addPlugins =
  (plugins: Plugin[]) =>
  ({
    plugins: configPlugins = [],
    ...config
  }: Partial<Config>): Partial<Config> => ({
    ...config,
    plugins: [...configPlugins, ...plugins],
  });
