/* eslint-disable react/function-component-definition */
import Image from 'next/image';
import { groq } from 'next-sanity';
import { PortableText } from '@portabletext/react';
import { RichTextComponents } from '@/c/RichTextComponents';
import SocialShare from '@/c/SocialShare';
import { client } from '@/l/sanity/client';
import urlForImage from '@/u/urlForImage';
import EventMap from '@/components/EventMap';
import formatDate from '@/lib/util/formatDate';
import { queryEventBySlug } from '@/lib/sanity/queries';
import sanityFetch from '@/lib/sanity/fetch';
import getTimeSinceEvent from '@/lib/util/getTimeSinceEvent';
import ClientSideRoute from '@/components/ClientSideRoute';
import resolveHref from '@/lib/util/resolveHref';
// export { generateMetadata } from '@/util/generateLiveEventMetadata';

type Props = {
  params: {
    slug: string;
  };
};

async function Article({ params: { slug } }: Props) {
  const liveEvent: LiveEvent = (await getEventBySlug(slug)) as LiveEvent;

  const allEvents = [
    ...(Array.isArray(liveEvent.relatedArticles)
      ? liveEvent.relatedArticles.map((article) => ({
          ...article,
          source: 'relatedArticles',
        }))
      : []),
    ...(Array.isArray(liveEvent.keyEvent)
      ? liveEvent.keyEvent.map((event) => ({
          ...event,
          source: 'keyEvent',
        }))
      : []),
  ];

  // Sort the allEvents array based on the eventDate property
  allEvents.sort((a, b) => {
    // Check if either eventDate is not a valid date
    if (isNaN(Date.parse(a.eventDate)) || isNaN(Date.parse(b.eventDate))) {
      // If both dates are invalid, return 0 to indicate no change in order. This prevents sorting based on invalid dates
      return 0;
    }
    // Compare the eventDate strings directly to determine the order
    return a.eventDate > b.eventDate ? -1 : a.eventDate < b.eventDate ? 1 : 0;
  });



  return (
    <>
      <hr className='mx-auto mb-8 max-w-[95wv] border-untele md:max-w-[85vw]' />

      <article className='mx-auto max-w-[95vw] pb-28 md:max-w-[85vw] lg:px-10'>
        {/* Top Section: Image, Title, Date, Description  */}
        <section className='flex flex-col space-x-4 text-slate-700 lg:flex-row'>
          {/* Image  */}
          <div className='h-auto min-w-max xl:w-full'>
            <Image
              src={urlForImage(liveEvent.mainImage as any)?.url() || ''}
              alt='Image Description'
              style={{
                width: '100%',
                height: 'auto',
              }}
              width={550}
              height={475}
              className='rounded-lg'
            />
          </div>

          {/* Info Block  */}
          <div className='flex w-full flex-col space-y-2 py-2'>
            {/* Title & Date    */}
            <div className='flex w-full  flex-col space-y-1'>
              {liveEvent.isCurrentEvent && (
                <h2 className='w-min animate-pulse rounded bg-untele px-3 py-1 text-2xl font-bold text-slate-200'>
                  Live
                </h2>
              )}
              <h1 className='w-full text-3xl font-bold'>{liveEvent.title}</h1>

              <div>
                {/* <h3>{liveEvent.location}</h3> */}
                <p>{formatDate(liveEvent.eventDate || liveEvent._createdAt)}</p>
              </div>
            </div>
            {/* Description  */}
            <div className='w-full'>
              <p className='w-full italic lg:text-xs xl:text-base'>
                {liveEvent.description}
              </p>
            </div>
          </div>
        </section>

        <SocialShare
          url={`https://untelevised.media/live-event/${slug}`}
          title={liveEvent.title}
        />

        <div className='flex flex-col items-center justify-center space-x-4'>
          {/* Coverage Video  */}
          <div className='my-4 flex items-center justify-center'>
            <iframe
              width='720'
              height='420'
              className='rounded-lg border border-untele bg-slate-700/30'
              src={`${liveEvent.videoLink}`}
              title='YouTube video player'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen'
            />
          </div>

          <EventMap />
        </div>
        <section className='mt-12 flex flex-col space-y-4 lg:flex-row lg:space-x-5 lg:space-y-0'>
          {/* Timeline */}
          <div className='h-full lg:w-3/5'>
            {allEvents.length > 0 ? (
              <ul>
                {allEvents.map((event) => (
                  <li
                    key={event._id}
                    className='mb-3 flex flex-col rounded-lg border border-untele bg-slate-700/30 px-6 py-3'
                  >
                    <div className='flex flex-col space-y-1'>
                      <h3 className='text-base font-bold underline'>
                        {event.title}
                      </h3>
                      <h4 className='text-sm text-untele/70'>
                        {getTimeSinceEvent(event.eventDate)}
                      </h4>
                      {event.source === 'relatedArticles' ? (
                        <>
                          <p>{event.description as string}</p>
                          <ClientSideRoute
                            route={
                              resolveHref('post', event.slug?.current) || ''
                            }
                          >
                            <button className='cursor-pointer self-end rounded-md border border-untele/40 bg-slate-700/30 px-3 py-1 font-bold hover:text-blue-700 text-untele/60 underline hover:opacity-80'>
                              Read More
                            </button>
                          </ClientSideRoute>
                        </>
                      ) : (
                        <PortableText
                          value={event.description as Block[]}
                          components={RichTextComponents}
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='mb-3 flex flex-col rounded-lg border border-untele bg-slate-700/30 px-6 py-3 text-slate-700'>
                No events available at the moment. Please check back shortly.
              </p>
            )}
          </div>
          {/* Developments / Story */}
          <div className='mx-auto h-min rounded-lg border border-untele bg-slate-700/30 px-10 py-5 md:max-w-[70vw] lg:w-2/5'>
            <PortableText
              value={liveEvent.body}
              components={RichTextComponents}
            />
          </div>
        </section>
      </article>
    </>
  );
}

export default Article;

// Call the Sanity Fetch Function for the Article by Slug
async function getEventBySlug(slug: string) {
  try {
    // Fetch article data from Sanity
    const post = await sanityFetch({
      query: queryEventBySlug,
      params: { slug },
      tags: ['post'],
    });
    return post || [];
  } catch (error) {
    console.log('Failed to fetch article:', error);
    return [] || null;
  }
}

// // Generate the static params for the list of Live Events
export async function generateStaticParams() {
  const query = groq`*[_type=='liveEvent'] { slug }`;
  const slugs: LiveEvent[] = await client.fetch(query);
  const slugRoutes = slugs ? slugs.map((slug) => slug.slug.current) : [];

  return slugRoutes.map((slug) => ({
    slug,
  }));
}
