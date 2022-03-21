import webpack from 'webpack';

import { getExcludePackagesRegexp } from '../../common/utils';

const isNodeModulesExclude = (exclude: string | RegExp): boolean =>
  String(exclude).replace(new RegExp('/', 'g'), '') === 'node_modules';

type ModuleRule = webpack.RuleSetRule | '...';

export const addTranspileModulesToRule = (
  rule: ModuleRule,
  transpileModules: string[]
): ModuleRule => {
  if (typeof rule === 'string') return rule;

  const exclude = getExcludePackagesRegexp(transpileModules);

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
};
