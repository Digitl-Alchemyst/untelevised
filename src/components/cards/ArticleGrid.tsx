/* eslint-disable react/function-component-definition */
import ArticleCardLg from './ArticleCardLg';

function ArticleGrid({ posts }: { posts: Article[] }) {
  return (
    <div>
      <hr className='mb-8 border-untele' />
      <div className='grid grid-cols-1 gap-x-10 gap-y-12 px-10 pb-24 md:grid-cols-2 xl:grid-cols-3'>
        {posts.map((post) => (
          <ArticleCardLg key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default ArticleGrid;
