/* eslint-disable react/function-component-definition */
import { draftMode } from 'next/headers';
import { LiveQuery } from 'next-sanity/preview/live-query';
import { query } from '@/components/DocumentsCount';
import PreviewDocumentsCount from '@/components/PreviewDocumentsCount';
import { sanityFetch } from '@/lib/sanity.fetch';



export default async function HomePage() {
  const data = await sanityFetch<number>({ query, tags: ['post'] });

  if(draftMode()) {
  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={query}
      initialData={data}
      as={PreviewDocumentsCount}
    >
      This is Draft Mode
    </LiveQuery>
  );
}

// const post = await client.fetch(query);
return (
  <div>
      <h1>Regular View</h1>
    </div>
  );

}