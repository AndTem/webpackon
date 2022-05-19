import path from 'path';

import { getExcludePackagesRegexp, getIncludePackagesRegexp } from './utils';

describe('getExcludePackagesRegexp', () => {
  it.each<[{ packages: string[]; input: string }, boolean]>([
    [{ packages: ['react'], input: `node_modules${path.sep}react` }, false],
    [{ packages: ['react'], input: `node_modules${path.sep}react/dom` }, false],
    [{ packages: ['react'], input: `node_modules${path.sep}react-dom` }, true],
    [
      {
        packages: ['lib/utils'],
        input: `node_modules${path.sep}lib${path.sep}utils`,
      },
      false,
    ],
  ])(
    'Input: %s returned regexp test is %s',
    ({ packages, input }, testRegexpResult) => {
      expect(getExcludePackagesRegexp(packages).test(input)).toBe(
        testRegexpResult
      );
    }
  );
});

describe('getIncludePackagesRegexp', () => {
  it.each<[{ packages: string[]; input: string }, boolean]>([
    [{ packages: ['react'], input: `node_modules${path.sep}react` }, true],
    [
      {
        packages: ['react'],
        input: `node_modules${path.sep}react${path.sep}dom`,
      },
      true,
    ],
    [{ packages: ['react'], input: `node_modules${path.sep}react-dom` }, false],
    [
      {
        packages: ['lib/utils'],
        input: `node_modules${path.sep}lib${path.sep}utils`,
      },
      true,
    ],
  ])(
    'Input: %s returned regexp test is %s',
    ({ packages, input }, testRegexpResult) => {
      expect(getIncludePackagesRegexp(packages).test(input)).toBe(
        testRegexpResult
      );
    }
  );
});
