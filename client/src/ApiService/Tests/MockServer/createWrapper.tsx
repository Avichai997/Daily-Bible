/* eslint-disable no-console */
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@Utils/ReactQueryConfig';
import { ReactElement, ReactNode } from 'react';
import { render, RenderResult } from '@testing-library/react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { isEnvTest } from '@Utils/Environment';

const createTestsQueryClient = () => {
  const queryClient = createQueryClient({
    logger: {
      log: console.log,
      warn: console.warn,
      error: isEnvTest ? () => null : console.error,
    },
  });
  const options = queryClient.getDefaultOptions();
  options.queries = { ...options.queries, retry: false };

  return queryClient;
};

export const createWrapper = () => {
  const queryClient = createTestsQueryClient();

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return wrapper;
};

export function renderWithQueryClient(ui: ReactElement): RenderResult {
  const queryClient = createTestsQueryClient();

  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
}

export function setTestLocation(location: Location) {
  Object.defineProperty(window, 'location', {
    writable: true,
    value: location,
  });
}

export function renderComponentWithProviders(reactElement: ReactElement) {
  render(
    <BrowserRouter>
      <QueryClientProvider client={createTestsQueryClient()}>{reactElement}</QueryClientProvider>
      <ToastContainer rtl />
    </BrowserRouter>
  );
}
