import React from 'react';
import { Separator } from '../ui/separator';
import { Breadcrumbs } from '../breadcrumbs';
import SearchInput from '../search-input';
import { UserNav } from './user-nav';
import { ModeToggle } from './ThemeToggle/theme-toggle';
import { IconPhotoUp } from '@tabler/icons-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='sticky top-0 flex h-16 w-full shrink-0 items-center justify-between gap-2 border-b bg-background z-50'>
      <div className='flex items-center gap-2 px-4'>
        <Link href='/collection' className='flex items-center gap-2 hover:opacity-80 transition-opacity'>
          <IconPhotoUp className='h-6 w-6 text-primary' />
          <span className='font-semibold text-lg'>Logmons</span>
        </Link>
        <Separator orientation='vertical' className='mx-2 h-4' />
        <Breadcrumbs />
      </div>

      <div className='flex items-center gap-2 px-4'>
        <div className='hidden'>
          <SearchInput />
        </div>
        <UserNav />
        <ModeToggle />
      </div>
    </header>
  );
}
