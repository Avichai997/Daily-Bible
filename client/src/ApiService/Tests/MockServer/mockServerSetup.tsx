import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { mockServerHandlers } from './mockServerHandlers';

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

export const mockServer = setupServer(...mockServerHandlers);

// Establish API mocking before all tests.
beforeAll(() => {
  vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(100);
  vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(100);
  mockServer.listen();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => mockServer.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => mockServer.close());
