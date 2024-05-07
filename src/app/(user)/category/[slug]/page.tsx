/* eslint-disable react/function-component-definition */
import { groq } from 'next-sanity';
import { client } from '@/lib/sanity/client';
import ArticleCardLg from '@/components/cards/ArticleCardLg';
import { queryArticleByCategory } from '@/lib/sanity/queries';
import ClientSideRoute from '@/components/ClientSideRoute';
import sanityFetch from '@/lib/sanity/fetch';

type Props = {
  params: {
    slug: string;
  };
};

export default async function CategoryPage({ params: { slug } }: Props) {
  const articles = await getArticlesByCategory(slug);

  return (
    <div className='mx-auto max-w-[95wv] md:max-w-[85vw]'>
      <div>
        <hr className='mb-8 border-untele' />
        <div className='grid grid-cols-1 gap-x-10 gap-y-12 px-10 pb-24 md:grid-cols-2 xl:grid-cols-3'>
          {articles?.map((post) => (
            <ClientSideRoute
              route={`/post/${post.slug?.current}`}
              key={post._id}
            >
              <ArticleCardLg post={post} />
            </ClientSideRoute>
          ))}
        </div>
      </div>
    </div>
  );
}

// Call the Sanity Fetch Function for the Article Information Filtered by Category
async function getArticlesByCategory(slug: string): Promise<Article[] | null> {
  try {
    // Fetch article data by category from Sanity
    const articles: Article[] = await sanityFetch({
      query: queryArticleByCategory,
      params: { slug },
      tags: ['post'],
    });
    return articles;
  } catch (error) {
    console.error('Failed to fetch author:', error);
    return [] || null;
  }
}
// Generate the static params for the category list
export async function generateStaticParams() {
  const query = groq`*[_type=='category'] { slug }`;
  const slugs: Category[] = await client.fetch(query);
  const slugRoutes = slugs ? slugs.map((slug) => slug.slug.current) : [];  
  return slugRoutes.map((slug) => ({
    slug,
  }));
  }