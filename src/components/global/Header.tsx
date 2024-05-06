import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Socials from './Socials';
import Logo from './Logo';

const Header = () => {
  return (
    <header className='flex w-full items-center justify-between space-x-2 border-b-2 border-untele/30 bg-static px-5 py-2 shadow-lg'>
      {/* Logo */}
      <Logo />

      {/* Support */}
      <div className='hidden items-center md:flex'>
        <Link href='/donate'>
          <Image src='/sim.png' alt='Support Independent Media: Donation Link' width={320} height={35} />
        </Link>
      </div>

      {/* Socials */}
      <div className='relative'>
        <Socials />
      </div>
    </header>
  );
};

export default Header;
