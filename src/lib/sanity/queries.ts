/* eslint-disable import/prefer-default-export */
import { groq } from 'next-sanity';

export const queryArticleBySlug = groq`
    *[_type == 'post' && slug.current == $slug][0] {
      ...,
      author->,
      categories[]->,
      'comments': *[
        _type == 'comment' &&
        post._ref == ^._id &&
        approved == true
      ],
    }`;

export const queryArticleByCategory = groq`
  *[_type == 'post' && references(categories, *[_type == 'category' && slug.current == $slug]._id)] {
    ...,
    author->,
    categories[]->,
    description,
    publistedAt,
  } | order(_createdAt desc)
`;

export const queryAuthorBySlug = groq`
  *[_type == 'author' && slug.current == $slug][0] {
    ...,
    'relatedArticles': *[_type == 'post' && references(^._id)]| order(_createdAt desc) {
      ...,
      author->,
      categories[]->,
    }
  }
`;