import {
  getExcludePackagesRegexp,
  getIncludePackagesRegexp,
} from '@webpackon/core';

type ChunkGroups = Array<{
  chunkName: string;
  includePackages: string[];
}>;

type CacheGroups = Record<
  string,
  { test: RegExp; chunks: string; name: string; filename: string }
>;

const CHUNK_FILENAME = '[name].[chunkhash].js';

const getAllChunkGroupsPackages = (chunkGroups: ChunkGroups = []) =>
  chunkGroups.reduce<string[]>(
    (packages, { includePackages }) => [...packages, ...includePackages],
    []
  );

const addChunkGroups = (
  baseCacheGroups: CacheGroups,
  chunkGroups: ChunkGroups
): CacheGroups =>
  chunkGroups.reduce(
    (result, { chunkName, includePackages }) => ({
      ...result,
      [chunkName]: {
        test: getIncludePackagesRegexp(includePackages),
        chunks: 'all',
        name: chunkName,
        filename: CHUNK_FILENAME,
      },
    }),
    baseCacheGroups
  );

export const getCacheGroups = (chunkGroups?: ChunkGroups): CacheGroups => {
  const result = {
    defaultVendors: {
      test: chunkGroups
        ? getExcludePackagesRegexp(getAllChunkGroupsPackages(chunkGroups))
        : /[\\/]node_modules[\\/]/,
      chunks: 'all',
      name: 'modules',
      filename: CHUNK_FILENAME,
    },
  };

  if (!chunkGroups) return result;

  return addChunkGroups(result, chunkGroups);
};
