import Link from 'next/link';
// import {Button} from "@nextui-org/react";
import {UserIcon} from '@/UI/UserIcon';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  Button,
  // Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';
import Logout from './Logout';

export default async function Header() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  if (!data.session?.user) {
    redirect("/login");
  }

  return (
    <div className="w-full relative text-white bg-green-700 z-10 top-0 ">
    {/* <div className="w-full absolute text-white bg-green-700 z-10 top-0 "> */}
      <nav className="contaienr relative flex flex-wrap items-center justify-between mx-auto p-8">
        <Link href="/" className="font-bond text-3xl hover:text-white focus:outline-none focus:shadow-outline">
          Home - To do List
        </Link>

        <div className="relative text-xl flex">
          <Link href="/new" className='mr-2 border border-green-700 hover:border-white focus:border-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline'>New To Do</Link>
          <Link href="/roadmap" className='mr-2 border border-green-700 hover:border-white hover:text-white focus:border-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline'>Road Map</Link>
        </div>
        <div>
          <Popover placement="bottom">
            <PopoverTrigger>
              <Button variant="bordered" startContent={<UserIcon/>} className='border border-white text-white font-bond text-lg'>
                {data.session.user.email}
              </Button>
            </PopoverTrigger>
            <PopoverContent >
              <div className="p-4">
                  <Logout/>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </nav>
    </div>
  );
}