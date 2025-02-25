import { APIClient } from '../index';
import 'fetch-mock-jest';
import fetch from 'node-fetch';

jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox());
const fetchMock = fetch;

jest.setTimeout(10000);

const createClient = (): APIClient => {
  return new APIClient();
};

test('test ctor', () => {
  const client = createClient();
  expect(client).toBeDefined();
});

test('it returns 200 status', async () => {
  const client = createClient();
  const testUrl = 'http://localhost';
  fetchMock.get(testUrl, { value: 'test1234' });

  const response = await client.executeAPIRequest({
    url: testUrl,
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  });
  expect(response.data).toEqual({ value: 'test1234' });
});

test('it throws a forbidden error code', async () => {
  const client = createClient();
  const testUrl = 'http://testUrl';
  fetchMock.get(testUrl, () => {
    return { status: 403 };
  });
  await expect(
    client.executeAPIRequest({
      url: testUrl,
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    }),
  ).rejects.toThrowError('API request error for http://testUrl: 403 Forbidden');
});

test('it handles a rate limit code with no headers', async () => {
  const client = createClient();
  const testUrl = 'http://testUrlRateLimitedWithNoHeaders';
  fetchMock.mockReset();
  fetchMock.get(testUrl, () => {
    return { status: 429 };
  });
  await expect(
    client.executeAPIRequest({
      url: testUrl,
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    }),
  ).rejects.toThrowError('Could not complete request within 5 attempts!');
  expect(fetchMock).toHaveFetchedTimes(5);
});

test('it handles a rate limit code with headers', async () => {
  const client = createClient();
  const testUrl = 'http://testUrlRateLimitedWithHeaders';
  fetchMock.mockReset();
  fetchMock.get(testUrl, () => {
    return {
      status: 429,
      headers: {
        'X-RateLimit-Remaining': 7,
        'X-RateLimit-Limit': 10,
        'X-RateLimit-RetryAfter': 3,
      },
    };
  });
  await expect(
    client.executeAPIRequest({
      url: testUrl,
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    }),
  ).rejects.toThrowError('Could not complete request within 5 attempts!');
  expect(fetchMock).toHaveFetchedTimes(5);
});
