import { compose as ramdaCompose } from 'ramda';

import { Config } from '../../config/types';

type ComposeConfig = (config: Config) => Config;

export const compose = (...funcs: ComposeConfig[]): ComposeConfig =>
  (ramdaCompose as any)(...funcs);

const generateOrPackagesRegexpPart = (transpileModules: string[]): string =>
  transpileModules
    .flatMap((moduleName) => [`${moduleName}$`, `${moduleName}/`])
    .join('|');

export const getExcludePackagesRegexp = (
  transpileModules: string[]
): RegExp => {
  const modulesOrRule = generateOrPackagesRegexpPart(transpileModules);

  const regExpString = `node_modules[\\\\/](?!(${modulesOrRule}))`;

  return new RegExp(regExpString);
};

export const getIncludePackagesRegexp = (
  transpileModules: string[]
): RegExp => {
  const modulesOrRule = generateOrPackagesRegexpPart(transpileModules);

  const regExpString = `node_modules[\\\\/](${modulesOrRule})`;

  return new RegExp(regExpString);
};
