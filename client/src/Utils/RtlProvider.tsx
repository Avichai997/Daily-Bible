import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const RtlProvider = ({ children }: { children: React.ReactNode }) => (
  <CacheProvider value={cacheRtl}>{children}</CacheProvider>
);

export default RtlProvider;
