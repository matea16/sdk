import { PersistedObject } from './persistedObject';

export type PrimitiveEntity = EntityCoreProperties &
  PrimitiveEntityAdditionalProperties;

type EntityIdProperty = {
  /**
   * The natural identifier of the entity as provided by the data source API.
   *
   * Many APIs answer resources having a property representing the identity of
   * the resource within the data source system. This value should be
   * transferred to the entity's `id` property.
   *
   * In some cases an entity is known to a number of systems. The integrations
   * that do not own the entity will use mapped relationships and provide the
   * `id` value the data source maintains for the resource. The mapper will
   * merge the values into a single Array.
   *
   * An identity value that is maintained as a number must be converted to a
   * string. It is advisable to store the value in an additional property, such
   * as `<resource>Id`, where `<resource>` reflects the type of resource
   * represented by the entity (i.e. `domainId`, `userId`, etc.)
   */
  id?: string | string[];
};

type PrimitiveEntityAdditionalProperties = Record<
  string,
  PrimitiveEntityPropertyValue
> &
  EntityIdProperty;

type PrimitiveEntityPropertyValue =
  | Array<string | number | boolean>
  | string
  | string[]
  | number
  | number[]
  | boolean
  | undefined
  | null;

export type Entity = EntityCoreProperties &
  RawDataTracking &
  EntityAdditionalProperties;

interface EntityCoreProperties extends Omit<PersistedObject, '_class'> {
  // entity can have multiple classes
  _class: string | string[];
}

type EntityAdditionalProperties = Record<string, EntityPropertyValue> &
  EntityIdProperty;

type EntityPropertyValue = PrimitiveEntityPropertyValue | EntityRawData[];

export interface RawDataTracking {
  /**
   * Maintains references to a collection of raw data uploads accumulated during
   * the construction of an entity.
   *
   * This data will not be included in any operations delivered to the persister.
   * Each input is placed in a queue by the `RawDataUploader` for upload to
   * temporary storage and the associated storage URI is added to
   * `_rawDataTempUris`.
   */
  _rawData?: EntityRawData[];
}

/**
 * Raw data to store
 */
export type EntityRawData = {
  /**
   * A name that identifies the payload when there are multiple data sources
   * used to build an entity.
   *
   * This name is part of a permanent key associated with the data. It must be
   * unique within the context of the entity. `'default'` is an acceptable value
   * when there is only one data payload, though it is recommended to use names
   * that are more meaningful when there is more than one.
   *
   * For example, consider an AWS IAM Role entity, where the role has an
   * embedded policy obtained through a separate API call:
   *
   * ```
   * [
   *   { name: 'role', ... },
   *   { name: 'policy', ... }
   * ]
   * ```
   */
  name: string;

  /**
   * A string or an object of any type representing the source content used to build an entity.
   */
  rawData: NonArrayObject | string;
};

type NonArrayObject = Record<string, unknown>;
