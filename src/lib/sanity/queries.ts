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

export const queryAuthorBySlug = groq`
  *[_type=='author' && slug.current == $slug][0] {
    ...,
  }
`;