import webpack from 'webpack';
import { CreateConfigParams } from '@webpackon/core';

export type AdditionalEntryParams = {
  entry: webpack.Entry;
  output?: webpack.WebpackOptionsNormalized['output'];
  resolve?: webpack.ResolveOptions;
  enableJSX?: boolean;
  templatePath?: string;
  htmlTitle?: string;
  dev?: {
    useLocalIp?: boolean;
    autoOpen?: boolean;
    proxy?: Record<string, unknown>;
    hot?: boolean;
  };
  production?: {
    dropConsole?: boolean;
    splitChunkCacheGroups?: Array<{
      chunkName: string;
      includePackages: string[];
    }>;
  };
};

export type EntryParams = CreateConfigParams<AdditionalEntryParams>;
