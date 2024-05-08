/* eslint-disable react/function-component-definition */
import ClientSideRoute from '../ClientSideRoute';
import sanityFetch from '@/lib/sanity/fetch';
import { queryCategories } from '@/lib/sanity/queries';
import formatTitleForURL from '@/lib/util/formatTitleForURL';
import resolveHref from '@/lib/util/resolveHref';

async function Nav() {
  const categories: any = await getNewsCategories();
  const sortedCategories = categories.sort((a, b) => a.order - b.order);

  return (
    <nav className='flex flex-wrap gap-x-3 gap-y-2 px-6 py-4 text-sm text-slate-800 md:text-base md:font-semibold lg:text-lg'>
      {sortedCategories.map((category, index) => (
        <ClientSideRoute
          route={
            resolveHref('category', formatTitleForURL(category.title)) || ''
          }
          key={index}
        >
          <div className='rounded-md border border-untele/40 bg-slate-700/30 px-3 py-2'>
            {category.title}
          </div>
        </ClientSideRoute>
      ))}
    </nav>
  );
}

export default Nav;

// Call the Sanity Fetch Function for a list of All Authors
async function getNewsCategories() {
  try {
    // Fetch author data from Sanity
    const categories = await sanityFetch({
      query: queryCategories,
      tags: ['author'],
    });
    return categories;
  } catch (error) {
    console.error('Failed to fetch author:', error);
    return null;
  }
}