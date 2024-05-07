/* eslint-disable react/function-component-definition */
import Image from 'next/image';
import { groq } from 'next-sanity';
import { PortableText } from '@portabletext/react';
import { RichTextComponents } from '@/c/RichTextComponents';
import { client } from '@/l/sanity/client';
import urlForImage from '@/u/urlForImage';
import Link from 'next/link';
import sanityFetch from '@/lib/sanity/fetch';
import { queryAuthorBySlug } from '@/lib/sanity/queries';
import formatDate from '@/lib/util/formatDate';
import AuthorLinks from '@/components/global/AuthorLinks';
type Props = {
  params: {
    slug: string;
  };
};

// export const revalidate = 60 * 60 * 24 * 7;
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
          {author.bio && (
            <div className='flex flex-row justify-between px-6 py-5'>
              <div>
                  <PortableText
                    value={author.bio}
                    components={RichTextComponents}
                  />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Authored Articles  */}
      <section className='mx-18 my-12'>
        <h1 className='mb-4 border-b border-untele pb-2 text-3xl font-bold'>
          Latest Articles
        </h1>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>
          {author.relatedArticles?.map((post) => (
            <Link
              key={post._id}
              href={`/post/${post.slug.current}`}
              className='flex flex-col justify-between rounded-md border border-untele/80 bg-slate-400 text-slate-900 shadow-md'
            >
              <div className='flex flex-col space-y-4'>
                <div className='relative h-80 w-full drop-shadow-xl transition-transform duration-200 ease-out hover:scale-105'>
                  <Image
                    src={urlForImage(post.mainImage as any)?.url() || ''}
                    fill
                    alt='image'
                    className='rounded-md object-fill'
                  />
                </div>
                <div className='flex flex-col space-y-2 px-4 pb-3'>
                  <h3 className='text-lg font-semibold'>{post.title}</h3>
                  <p>{formatDate(post.eventDate || post._createdAt)}</p>
                  {post.categories &&
                    post.categories.map((category) => (
                      <div
                        key={category._id}
                        className='max-w-[160px] rounded-xl border border-untele bg-slate-900/80 px-5 py-2 text-center text-xs font-semibold text-untele lg:text-sm'
                      >
                        <p>{category.title}</p>
                      </div>
                    ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

// Call the Sanity Fetch Function for the Photographer Information
async function getAuthorBySlug(slug: string) {
  // Fetch author data from Sanity
  const author: Author = await sanityFetch({
    query: queryAuthorBySlug,
    params: { slug },
    tags: ['author'],
  });
  return author;
}

// Generate the static params for the author list
export async function generateStaticParams() {
  const query = groq`*[_type=='author']
  {
    slug
  }`;

  const slugs: any = await client.fetch(query);
  const slugRoutes = slugs ? slugs.map((slug: any) => slug.slug.current) : [];

  return slugRoutes.map((slug) => ({
    slug,
  }));
}