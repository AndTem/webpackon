import { getExcludePackagesRegexp, getIncludePackagesRegexp } from './utils';

describe('getExcludePackagesRegexp', () => {
  it.each<[{ packages: string[]; input: string }, boolean]>([
    [{ packages: ['react'], input: 'node_modules/react' }, false],
    [{ packages: ['react'], input: 'node_modules/react/dom' }, false],
    [{ packages: ['react'], input: 'node_modules/react-dom' }, true],
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
    [{ packages: ['react'], input: 'node_modules/react' }, true],
    [{ packages: ['react'], input: 'node_modules/react/dom' }, true],
    [{ packages: ['react'], input: 'node_modules/react-dom' }, false],
  ])(
    'Input: %s returned regexp test is %s',
    ({ packages, input }, testRegexpResult) => {
      expect(getIncludePackagesRegexp(packages).test(input)).toBe(
        testRegexpResult
      );
    }
  );
});
