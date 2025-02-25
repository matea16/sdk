import { Polly } from '@pollyjs/core';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import FSPersister from '@pollyjs/persister-fs';
import { loadProjectStructure } from '@jupiterone/integration-sdk-private-test-utils';
import { SynchronizationJobStatus } from '@jupiterone/integration-sdk-core';
import { generateSynchronizationJob } from './util/synchronization';
import { createCli } from '../index';
import { setupSynchronizerApi } from './util/synchronization';
import * as log from '../log';
import { createTestPolly } from './util/recording';

jest.mock('../log');

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

let polly: Polly;

beforeEach(() => {
  process.env.JUPITERONE_API_KEY = 'testing-key';
  process.env.JUPITERONE_ACCOUNT = 'mochi';
  loadProjectStructure('validationFailure');

  polly = createTestPolly('run-cli-failure');

  jest.spyOn(process, 'exit').mockImplementation((code: number | undefined) => {
    throw new Error(`Process exited with code ${code}`);
  });
});

afterEach(() => {
  polly.disconnect();
});

test('aborts synchronization job if an error occurs', async () => {
  const job = generateSynchronizationJob();

  setupSynchronizerApi({ polly, job, baseUrl: 'https://api.us.jupiterone.io' });

  await createCli().parseAsync([
    'node',
    'j1-integration',
    'run',
    '--integrationInstanceId',
    'test',
  ]);

  expect(log.displaySynchronizationResults).toHaveBeenCalledTimes(1);
  expect(log.displaySynchronizationResults).toHaveBeenCalledWith({
    ...job,
    status: SynchronizationJobStatus.ABORTED,
  });
});
