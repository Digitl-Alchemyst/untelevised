// getAllNews.ts
import { groq } from 'next-sanity';
import { client } from '@/l/sanity/client';

export default async function getAllUrls() {
  const galleryQuery = groq`
    *[_type == "gallery"] {
      ...,
      slug,
    }`;
  const blogQuery = groq`
    *[_type == "blog"] {
      ...,
      slug,
    }`;
  const galleryCategoryQuery = groq`
    *[_type == "galleryCategory"] {
      ...,
      slug,
    }`;
  const blogCategoryQuery = groq`
    *[_type == "blogCategory"] {
      ...,
      slug,
    }`;

  try {
    const gallery = await client.fetch(galleryQuery);
    const blog = await client.fetch(blogQuery);
    const galleryCategory = await client.fetch(galleryCategoryQuery);
    const blogCategory = await client.fetch(blogCategoryQuery);

    const allUrls = [...gallery, ...blog, ...galleryCategory, ...blogCategory];

    return allUrls;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error; // You can handle the error according to your needs
  }
}
