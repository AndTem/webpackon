import { Config } from '@webpackon/core';

const isNodeModulesExclude = (exclude: string | RegExp): boolean =>
  String(exclude).replaceAll('/', '') === 'node_modules';

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
        const currentExclude = (
          [...(rule.exclude || []), exclude] as Array<string | RegExp>
        ).filter((regexp) => !isNodeModulesExclude(regexp));

        return { ...rule, exclude: currentExclude };
      }

      if (!rule.exclude) return { ...rule, exclude };

      if (isNodeModulesExclude(rule.exclude as string | RegExp)) {
        return { ...rule, exclude };
      }

      return { ...rule, exclude: [rule.exclude, exclude] };
    }),
  },
});
