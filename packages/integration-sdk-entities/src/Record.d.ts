/* eslint-disable */
import { RecordEntity } from './Base';

/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * A DNS record; or an official record (e.g. Risk); or a written document (e.g. Policy/Procedure); or a reference (e.g. Vulnerability/Weakness). The exact record type is captured in the _type property of the Entity.
 */
export type Record = RecordEntity & {
  [k: string]: unknown;
};
