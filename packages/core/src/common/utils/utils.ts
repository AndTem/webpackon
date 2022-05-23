import path from 'path';

import { compose as ramdaCompose } from 'ramda';

import { Config } from '../../config/types';

type ComposeConfig = (config: Config) => Config;

export const compose = (...funcs: ComposeConfig[]): ComposeConfig =>
  (ramdaCompose as any)(...funcs);

const replaceOSSlash = (string: string): string =>
  string.replace(/\//, `\\${path.sep}`);

const generateOrPackagesRegexpPart = (transpileModules: string[]): string =>
  transpileModules
    .map(replaceOSSlash)
    .flatMap((moduleName) => [`${moduleName}$`, `${moduleName}\\${path.sep}`])
    .join('|');

export const getExcludePackagesRegexp = (
  transpileModules: string[]
): RegExp => {
  const modulesOrRule = generateOrPackagesRegexpPart(transpileModules);

  const regExpString = `node_modules[\\${path.sep}](?!(${modulesOrRule}))`;

  return new RegExp(regExpString);
};

export const getIncludePackagesRegexp = (
  transpileModules: string[]
): RegExp => {
  const modulesOrRule = generateOrPackagesRegexpPart(transpileModules);

  const regExpString = `node_modules[${path.sep}](${modulesOrRule})`;

  return new RegExp(regExpString);
};
