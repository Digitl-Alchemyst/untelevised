/* eslint-disable import/prefer-default-export */
import { groq } from 'next-sanity';
import { client } from '@/lib/sanity/client';
import urlForImage, { urlForOpenGraphImage } from '@/u/urlForImage';
import { queryGalleryMetadata } from '../sanity/queries';
import { Metadata } from 'next';

type Props = {
  params: {
    slug: string;
  };
};

const baseURL = process.env.NEXT_PUBLIC_METADATA_BASE_URL;

// Define the generateMetadata function
export async function generateMetadata({ params: { slug } }: Props) {
  // Fetch the blog data based on the slug
  const query = queryGalleryMetadata;

  const gallery: Gallery = await client.fetch(query, { slug });

  // Create metadata object with dynamic values
  const metadata: Metadata = {
    title: `${gallery.title} Photography Gallery`,
    description: gallery.snippet,
    keywords: gallery.keywords,
    authors: gallery.author,
    publisher: 'Digitl Alchemyst',

    openGraph: {
      title: `${gallery.title} | Steven Watkins Photography`,
      description: gallery.snippet,
      url: `${baseURL}gallery/${slug}`,
      locale: 'en_US',
      siteName: 'Steven Watkins Photography',
      images: {
        url: urlForImage(gallery.mainImage as any)?.url() || '',
        width: 1200,
        height: 6300,
        alt: gallery.mainImage.alt,
      },
    },

    twitter: {
      card: 'summary_large_image',
      title: `${gallery.title} | Steven Watkins Photography`,
      description: gallery.snippet,
      siteId: '@DigitlAlchemyst',
      creator: '@DigitlAlchemyst',
      creatorId: '@DigitlAlchemyst',
      images: {
        url: urlForImage(gallery.mainImage as any)?.url() || '',
        alt: gallery.mainImage.alt,
      },
    },

    referrer: 'origin-when-cross-origin',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };

  return metadata;
}
