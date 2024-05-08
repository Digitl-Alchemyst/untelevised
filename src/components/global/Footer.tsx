/* eslint-disable react/function-component-definition */
import Link from 'next/link';
import {
  FaYoutube,
  FaTwitch,
  FaTiktok,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaReddit,
  FaDiscord,
} from 'react-icons/fa';
import { FaThreads } from 'react-icons/fa6';
import { MdLiveTv } from 'react-icons/md';
import { RiKickLine } from 'react-icons/ri';
import ClientSideRoute from '../providers/ClientSideRoute';
import sanityFetch from '@/lib/sanity/fetch';
import { queryCategories, queryPoliciesList } from '@/lib/sanity/queries';
import resolveHref from '@/lib/util/resolveHref';
import formatTitleForURL from '@/lib/util/formatTitleForURL';

async function Footer() {
  const categories: any = await getNewsCategories();
  const sortedCategories = categories.sort((a, b) => a.order - b.order);

  const policies: any = await getPoliciesList();
  const sortedPolicies = policies.sort((a, b) => a.order - b.order);

  return (
    <div className='flex flex-col space-y-10 bg-slate-600 px-2 py-3'>
      <div className='flex flex-col justify-between space-y-2 px-12 md:flex-row md:space-x-6 md:space-y-0'>
        {/* News Sections & About  */}
        <h4 className='pb-2 text-lg font-semibold text-slate-950 underline md:hidden'>
          News Categories
        </h4>
        <div className='flex flex-wrap space-x-3 text-slate-900 md:flex-col md:space-x-0'>
          <h4 className='hidden pb-2 text-xl font-semibold text-slate-950 underline md:flex'>
            News Categories
          </h4>
          {sortedCategories
            // .sort((a, b) => a.order - b.order)
            .map((category) => (
              <ClientSideRoute
                route={
                  resolveHref('category', formatTitleForURL(category.title)) ||
                  ''
                }
                key={category._id}
              >
                {category.title}
              </ClientSideRoute>
            ))}
        </div>

        {/* Media */}
        <h4 className='pb-2 text-lg font-semibold text-slate-950 underline md:hidden'>
          Media
        </h4>
        <div className='flex flex-wrap space-x-3 text-slate-900 md:flex-col md:space-x-0'>
          <h4 className='hidden pb-2 text-xl font-semibold text-slate-950 underline md:flex'>
            Media
          </h4>
          <Link href='/'>Photo</Link>
          <Link href='/'>Video</Link>
          <Link href='/'>Investigations</Link>
          <Link href='/'>RSS</Link>
        </div>

        {/* Social Links */}
        <h4 className='pb-2 text-lg font-semibold text-slate-950 underline md:hidden'>
          Social Media Platforms
        </h4>
        <div className='flex flex-wrap space-x-3 text-slate-900 md:flex-col md:space-x-0'>
          <h4 className='hidden pb-2 text-xl font-semibold text-slate-950 underline md:flex'>
            Social Media Platforms
          </h4>
          <Link
            className='flex items-center gap-x-2'
            href='https://www.youtube.com/@UnTelevised'
            target='_blank'
          >
            <FaYoutube className='h-4 w-4' />
            Youtube
          </Link>
          <Link
            className='flex items-center gap-x-2'
            href='https://www.twitch.tv/untelevised'
            target='_blank'
          >
            <FaTwitch className='h-4 w-4' />
            Twitch
          </Link>
          <Link
            className='flex items-center gap-x-2'
            href='https://www.tiktok.com/@untelevisedmedia'
            target='_blank'
          >
            <FaTiktok className='h-4 w-4' />
            TikTok
          </Link>
          <Link
            className='flex items-center gap-x-2'
            href='https://twitter.com/UnTelevisedLive'
            target='_blank'
          >
            <FaTwitter className='h-4 w-4' />
            Twitter/X
          </Link>
          <Link
            className='flex items-center gap-x-2'
            href='https://www.threads.net/@untelevised.media'
            target='_blank'
          >
            <FaThreads className='h-4 w-4' />
            Threads
          </Link>
          <Link
            className='flex items-center gap-x-2'
            href='https://www.facebook.com/UnTelevisedLive'
            target='_blank'
          >
            <FaFacebook className='h-4 w-4' />
            Facebook
          </Link>
          <Link
            className='flex items-center gap-x-2'
            href='https://www.instagram.com/untelevised.media/'
            target='_blank'
          >
            <FaInstagram className='h-4 w-4' />
            Instagram
          </Link>
          <Link
            className='flex items-center gap-x-2'
            href='https://www.reddit.com/r/UnTelevisedMedia/'
            target='_blank'
          >
            <FaReddit className='h-4 w-4' />
            Reddit
          </Link>
          <Link
            className='flex items-center gap-x-2'
            href='https://discord.gg/w9vMH5zr6j'
            target='_blank'
          >
            <FaDiscord className='h-4 w-4' />
            Discord
          </Link>
          <Link
            className='flex items-center gap-x-2'
            href='https://dlive.tv/UnTelevised'
            target='_blank'
          >
            <MdLiveTv className='h-4 w-4' />
            D-Live
          </Link>
          <Link
            className='flex items-center gap-x-2'
            href='https://kick.com/untelevised'
            target='_blank'
          >
            <RiKickLine className='h-4 w-4' />
            Kick
          </Link>
        </div>

        {/* Principles & Policies  */}
        <h4 className='pb-2 text-lg font-semibold text-slate-950 underline md:hidden'>
          Policies
        </h4>
        <div className='flex flex-row flex-wrap space-x-3 text-slate-900 md:flex-col md:space-x-0'>
          <h4 className='hidden pb-2 text-xl font-semibold text-slate-950 underline md:flex'>
            Policies
          </h4>
          {sortedPolicies.map((policy) => (
            <ClientSideRoute
              route={
                resolveHref('policies', formatTitleForURL(policy.title)) || ''
              }
              key={policy._id}
            >
              {policy.title}
            </ClientSideRoute>
          ))}
        </div>

        {/* About */}
        <h4 className='pb-2 text-lg font-semibold text-slate-950 underline md:hidden'>
          About
        </h4>
        <div className='flex flex-wrap space-x-3 text-slate-900 md:flex-col md:space-x-0'>
          <h4 className='hidden pb-2 text-xl font-semibold text-slate-950 underline md:flex'>
            About
          </h4>
          <Link href='/about'>About UnTelevised</Link>
          <Link href='/staff'>Meet Our Staff</Link>
          <Link href='https://forms.gle/nB9utZPukUCaCb179' target='_blank'>
            Join Our Team
          </Link>
          <Link href='/donate'>Donate/Support Our Outlet</Link>
          <Link href='mailto:newsroom@untelevised.live'>
            Contact the Newsroom
          </Link>
          <Link href='mailto:newsroom@untelevised.live'>
            Licensing & Syndication
          </Link>
          <Link href='mailto:newsroom@untelevised.live'>Advertise</Link>
          <Link href='mailto:newsroom@untelevised.live'>Send a News Tip</Link>
          <Link href='mailto:newsroom@untelevised.live'>
            Request a Correction
          </Link>
        </div>
      </div>

      {/* Copywrite Notice */}
      <div className='flex justify-between'>
        {/* Copywrite  */}
        <p className='text-sm font-light text-slate-950'>
          © Copyright 2023 UnTelevised Media™ All Rights Reserved.
        </p>
        <p className='text-sm font-extralight text-slate-600'>
          1156 Humboldt St, Denver, CO 80218
        </p>
      </div>
    </div>
  );
}

export default Footer;

// Call the Sanity Fetch Function for a list of All Authors
async function getPoliciesList() {
  try {
    // Fetch author data from Sanity
    const policies = await sanityFetch({
      query: queryPoliciesList,
      tags: ['author'],
    });
    return policies;
  } catch (error) {
    console.error('Failed to fetch author:', error);
    return null;
  }
}

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
