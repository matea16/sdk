/* eslint-disable */
import { GraphObject } from './Base';

/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * The Internet node in the graph. There should be only one Internet node.
 */
export type Internet = GraphObject & {
  /**
   * Display name
   */
  displayName?: 'Internet';
  /**
   * The IPv4 network CIDR block
   */
  CIDR?: '0.0.0.0/0';
  /**
   * The IPv6 network CIDR block
   */
  CIDRv6?: '::/0';
  /**
   * Indicates if the network is open to public access
   */
  public?: true;
  [k: string]: unknown;
};
