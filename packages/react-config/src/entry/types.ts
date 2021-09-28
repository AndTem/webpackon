import { CreateConfigParams } from '@webpackon/core';
import { AdditionalEntryParams as BaseConfigAdditionalEntryParams } from '@webpackon/base-config';

export type AdditionalEntryParams = Omit<
  BaseConfigAdditionalEntryParams,
  'disableDefaultBabelLoader' | 'enableHotModuleReplacement'
> & { useTs?: boolean };

export type EntryParams = CreateConfigParams<AdditionalEntryParams>;
