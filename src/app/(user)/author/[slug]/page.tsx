/* eslint-disable react/function-component-definition */
import Image from 'next/image';
import { groq } from 'next-sanity';
import { PortableText } from '@portabletext/react';
import { RichTextComponents } from '@/c/RichTextComponents';
import { client } from '@/l/sanity/client';
import urlForImage from '@/u/urlForImage';
import sanityFetch from '@/lib/sanity/fetch';
import { queryAuthorBySlug } from '@/lib/sanity/queries';
import AuthorLinks from '@/components/global/AuthorLinks';
import ClientSideRoute from '@/components/ClientSideRoute';
import ArticleCardLg from '@/components/cards/ArticleCardLg';
type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 15;

export default async function Author({ params: { slug } }: Props) {
  const author = await getAuthorBySlug(slug);

  return (
    <>
      <hr className='mx-auto mb-8 max-w-[95wv] border-untele md:max-w-[85vw]' />
      <section className='mb-6 py-4'>
        <div className='mx-4 flex max-w-4xl flex-col justify-center rounded-md border border-untele/80 bg-slate-400 text-slate-900 shadow-md md:mx-auto'>
          <div className='flex flex-row space-x-8 px-6 py-4 md:space-x-18'>
            <div className='rounded-md border border-untele/80 shadow-md'>
              <Image
                src={urlForImage(author.image as any)?.url() || ''}
                width={320}
                height={320}
                alt='image'
                className='rounded-md shadow-md'
              />
            </div>

            <div className='flex flex-col space-y-2'>
              <h1 className='text-2xl font-bold md:text-3xl lg:text-4xl'>
                {author.name}
              </h1>
              <h3 className='text-xl font-semibold text-slate-700'>
                {author.title}
              </h3>
              <AuthorLinks author={author} />
            </div>
          </div>
          <div className='flex flex-col justify-between px-6 py-5'>
            <PortableText value={author.bio} components={RichTextComponents} />
          </div>
        </div>
      </section>

      {/* Authored Articles  */}
      <section className='mx-18 my-12'>
        <h1 className='mb-4 border-b border-untele pb-2 text-3xl font-bold'>
          Latest Articles
        </h1>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>
          {author.relatedArticles?.map((post) => (
            <ClientSideRoute
              key={post._id}
              route={`/post/${post.slug.current}`}
            >
              <ArticleCardLg post={post} />
            </ClientSideRoute>
          ))}
        </div>
      </section>
    </>
  );
}

// Call the Sanity Fetch Function for the Photographer Information
async function getAuthorBySlug(slug: string): Promise<Author | null> {
  try {
    // Fetch author data from Sanity
    const author: Author = await sanityFetch({
      query: queryAuthorBySlug,
      params: { slug },
      tags: ['author'],
    });
    return author;
  } catch (error) {
    console.error('Failed to fetch author:', error);
    // Return null or a default author object if necessary
    return null;
  }
}

// Generate the static params for the author list
export async function generateStaticParams() {
  const query = groq`*[_type=='author'] { slug }`;
  const slugs: any = await client.fetch(query);
  const slugRoutes = slugs ? slugs.map((slug: any) => slug.slug.current) : [];
  return slugRoutes.map((slug) => ({
    slug,
  }));
}
