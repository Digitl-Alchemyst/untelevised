/* eslint-disable import/prefer-default-export */
import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId, studioUrl } from '@/lib/sanity/api';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // If webhook revalidation is setup we want the freshest content, if not then it's best to use the speedy CDN
  useCdn: false,
  // These settings will be overridden in
  // ./sanity/lib/store.ts when draftMode is enabled
  perspective: 'published',
  stega: {
    enabled: false,
    studioUrl,
    logger: console,
    filter: (props) => {
      if (props.sourcePath.at(-1) === 'title') {
        return true;
      }

      return props.filterDefault(props);
    },
  },
});
