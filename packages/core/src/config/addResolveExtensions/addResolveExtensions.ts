import { Config } from '../types';

export const addResolveExtensions =
  (extensions: string[]) =>
  (config: Partial<Config>): Partial<Config> => {
    const resultExtensions = new Set([
      ...(config.resolve?.extensions || []),
      ...extensions,
    ]);

    return {
      ...config,
      resolve: {
        ...config.resolve,
        extensions: Array.from(resultExtensions),
      },
    };
  };
