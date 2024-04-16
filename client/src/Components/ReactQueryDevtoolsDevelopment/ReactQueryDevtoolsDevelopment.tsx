import { IS_ENV_DEVELOPMENT } from '@Utils/Environment';
import LazySuspense from '@Utils/LazySuspense';
import { lazy } from 'react';

export const emptyComponent = () => <></>;

const ReactQueryDevtoolsDevelopment = IS_ENV_DEVELOPMENT
  ? LazySuspense(
      lazy(() =>
        import('@tanstack/react-query-devtools/build/lib/index.prod.js').then((module) => ({
          default: module.ReactQueryDevtools,
        }))
      )
    )
  : LazySuspense(
      lazy(() =>
        import('@Components/ReactQueryDevtoolsDevelopment/ReactQueryDevtoolsDevelopment').then(
          (module) => ({
            default: module.emptyComponent,
          })
        )
      )
    );

export default ReactQueryDevtoolsDevelopment;
