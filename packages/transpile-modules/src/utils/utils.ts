import { Config } from '@webpackon/core';

export const addExcludeToAllLoaders = (
  config: Config,
  exclude: RegExp
): Config => ({
  ...config,
  module: {
    ...config.module,
    rules: config.module?.rules?.map((rule) => {
      if (typeof rule === 'string') return rule;

      if (Array.isArray(rule.exclude)) {
        return { ...rule, exclude: [...(rule.exclude || []), exclude] };
      }

      if (!rule.exclude) return { ...rule, exclude };

      return { ...rule, exclude: [rule.exclude, exclude] };
    }),
  },
});
