import 'server-only';

import type { ClientPerspective } from 'next-sanity';
import type { QueryParams } from '@sanity/client';
import { draftMode } from 'next/headers';
import { client } from './client';
import { readToken } from '@/l/sanity/tokens';

const DEFAULT_PARAMS = {} as QueryParams;
const DEFAULT_TAGS = [] as string[];

export default async function sanityFetch<QueryResponse>({
  query,
  params = DEFAULT_PARAMS,
  tags = DEFAULT_TAGS,
  perspective = draftMode().isEnabled ? 'previewDrafts' : 'published',
  /**
   * Stega embedded Content Source Maps are used by Visual Editing by both the Sanity Presentation Tool and Vercel Visual Editing.
   * The Sanity Presentation Tool will enable Draft Mode when loading up the live preview, and we use it as a signal for when to embed source maps.
   * When outside of the Sanity Studio we also support the Vercel Toolbar Visual Editing feature, which is only enabled in production when it's a Vercel Preview Deployment.
   */
  stega = perspective === 'previewDrafts' || process.env.VERCEL_ENV === 'preview',
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
  perspective?: Omit<ClientPerspective, 'raw'>;
  stega?: boolean;
}): Promise<QueryResponse> {
  const isDraftMode = draftMode().isEnabled;
  if (isDraftMode && !readToken) {
    throw new Error(
      'The `SANITY_API_READ_TOKEN` environment variable is required for draft mode.',
    );
  }

  if (perspective === 'previewDrafts') {
    return client.fetch<QueryResponse>(query, params, {
      stega,
      perspective: 'previewDrafts',
      // The token is required to fetch draft content
      token: readToken,

      // The `previewDrafts` perspective isn't available on the API CDN
      useCdn: false,
      // And we can't cache the responses as it would slow down the live preview experience
      cache: 'no-store',
      next: { revalidate: 0 },
    });
  }
  return client.fetch<QueryResponse>(query, params, {
    stega,
    perspective: 'published',
    cache: 'no-store',
    // The `published` perspective is available on the API CDN
    useCdn: true,
    // Only enable Stega in production if it's a Vercel Preview Deployment, as the Vercel Toolbar supports Visual Editing
    // When using the `published` perspective we use time-based revalidation to match the time-to-live on Sanity's API CDN (60 seconds)
    next: { tags },
  });
}
