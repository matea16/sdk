/* eslint-disable */
import { Entity } from './Base';

/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * A user group, typically associated with some type of access control, such as a group in Okta or in Office365. If a UserGroup has an access policy attached, and all member Users of the UserGroup would inherit the policy.
 */
export type UserGroup = Entity & {
  /**
   * The group email address
   */
  email?: string;
  [k: string]: unknown;
};
