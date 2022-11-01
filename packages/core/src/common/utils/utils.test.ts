import path from 'path';

import { getExcludePackagesRegexp, getIncludePackagesRegexp } from './utils';

describe('getExcludePackagesRegexp', () => {
  it.each<[{ packages: string[]; input: string }, boolean]>([
    [{ packages: ['react'], input: 'node_modules/react' }, false],
    [{ packages: ['react'], input: 'node_modules/react/dom' }, false],
    [{ packages: ['react'], input: 'node_modules/react-dom' }, true],
    [
      {
        packages: ['lib/utils'],
        input: 'node_modules/lib/utils',
      },
      false,
    ],
  ])(
    'Input: %s returned regexp test is %s for path.sep = /',
    ({ packages, input }, testRegexpResult) => {
      (path as any).sep = '/';

      expect(getExcludePackagesRegexp(packages).test(input)).toBe(
        testRegexpResult
      );
    }
  );

  it.each<[{ packages: string[]; input: string }, boolean]>([
    [{ packages: ['react'], input: 'node_modules\\react' }, false],
    [{ packages: ['react'], input: 'node_modules\\react\\dom' }, false],
    [{ packages: ['react'], input: 'node_modules\\react-dom' }, true],
    [
      {
        packages: ['lib/utils'],
        input: 'node_modules\\lib\\utils',
      },
      false,
    ],
  ])(
    'Input: %s returned regexp test is %s for path.sep = \\',
    ({ packages, input }, testRegexpResult) => {
      (path as any).sep = '\\';

      expect(getExcludePackagesRegexp(packages).test(input)).toBe(
        testRegexpResult
      );
    }
  );
});

describe('getIncludePackagesRegexp', () => {
  it.each<[{ packages: string[]; input: string }, boolean]>([
    [{ packages: ['react'], input: 'node_modules/react' }, true],
    [
      {
        packages: ['react'],
        input: 'node_modules/react/dom',
      },
      true,
    ],
    [{ packages: ['react'], input: 'node_modules/react-dom' }, false],
    [
      {
        packages: ['lib/utils'],
        input: 'node_modules/lib/utils',
      },
      true,
    ],
  ])(
    'Input: %s returned regexp test is %s for path.sep = /',
    ({ packages, input }, testRegexpResult) => {
      (path as any).sep = '/';

      expect(getIncludePackagesRegexp(packages).test(input)).toBe(
        testRegexpResult
      );
    }
  );

  it.each<[{ packages: string[]; input: string }, boolean]>([
    [{ packages: ['react'], input: 'node_modules\\react' }, true],
    [
      {
        packages: ['react'],
        input: 'node_modules\\react\\dom',
      },
      true,
    ],
    [{ packages: ['react'], input: 'node_modules\\react-dom' }, false],
    [
      {
        packages: ['lib/utils'],
        input: 'node_modules\\lib\\utils',
      },
      true,
    ],
  ])(
    'Input: %s returned regexp test is %s for path.sep = \\',
    ({ packages, input }, testRegexpResult) => {
      (path as any).sep = '\\';

      expect(getIncludePackagesRegexp(packages).test(input)).toBe(
        testRegexpResult
      );
    }
  );
});
