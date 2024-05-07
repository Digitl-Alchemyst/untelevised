/* eslint-disable react/function-component-definition */
import { groq } from 'next-sanity';
import { client } from '@/lib/sanity/client';
import ArticleCardLg from '@/components/cards/ArticleCardLg';
import { queryArticleByCategory } from '@/lib/sanity/queries';
import ClientSideRoute from '@/components/ClientSideRoute';

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 180;

export default async function CategoryPage({ params: { slug } }: Props) {
  const articles = await client.fetch(queryArticleByCategory, { slug });

  return (
    <div className='mx-auto max-w-[95wv] md:max-w-[85vw]'>
      <div>
        <hr className='mb-8 border-untele' />
        <div className='grid grid-cols-1 gap-x-10 gap-y-12 px-10 pb-24 md:grid-cols-2 xl:grid-cols-3'>
          {articles.map((post) => (
            <ClientSideRoute
              route={`/post/${post.slug?.current}`}
              key={post._id}
            >
              <ArticleCardLg key={post._id} post={post} />
            </ClientSideRoute>
          ))}
        </div>
      </div>
    </div>
  );
}

// Generate the static params for the category list
export async function generateStaticParams() {
  const query = groq`*[_type=='category']
  {
    slug
  }`;
  const slugs: Article[] = await client.fetch(query);
  const slugRoutes = slugs ? slugs.map((slug) => slug.slug.current) : [];
  
  return slugRoutes.map((slug) => ({
    slug,
  }));
  }