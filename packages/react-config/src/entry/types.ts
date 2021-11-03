import { CreateConfigParams } from '@webpackon/core';
import { AdditionalEntryParams as BaseConfigAdditionalEntryParams } from '@webpackon/base-config';

export type AdditionalEntryParams = BaseConfigAdditionalEntryParams;

export type EntryParams = CreateConfigParams<AdditionalEntryParams>;
