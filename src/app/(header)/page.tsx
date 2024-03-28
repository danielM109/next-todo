import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/db";
import ImgFondo from "@/components/ImgFondo";

import Link from 'next/link';
import * as actions from '@/actions';
import { EditIcon } from "@/UI/EditIcon";
import { DeleteIcon } from "@/UI/DeleteIcon";
// import {DeleteIcon} from "./DeleteIcon";
// import {columns, users} from "./data";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';

export interface TodoProps {
  id:      string,
  name:    string,
  tag:     string,
  when:    string,
  priority: string,
  date:    string
}

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  if (!data.session?.user) {
    redirect("/login");
  }

  const todos = await prisma.todo.findMany({
    where: { userId: data.session.user.id },
  });

  const renderedTodolists = todos.map((todo: TodoProps) => {
    return (
      <tr key={todo.id}>
        <th key={todo.id+todo.name}>{todo.name}</th>
        <th key={todo.id+todo.tag}>{todo.tag}</th>
        <th key={todo.id+todo.when}>{todo.when}</th>
        <th key={todo.id+todo.priority}>{todo.priority}</th>
        <th key={todo.id+todo.date}>{todo.date}</th>
        <th key={todo.id+'actions'} className='px-10'>
          <div className="flex justify-center">
            <Link
              key={todo.id}
              href={`/todo/${todo.id}`}
            >
              <div className='border border-green-800 hover:bg-green-800 focus:border-green-1000 text-green-800 hover:text-white focus:text-green-1000 font-bold py-2 px-2 text-sm rounded-full focus:outline-none focus:shadow-outline'>
                <EditIcon/>
              </div>
            </Link>

            {/* <form action={actions.deleteTodolist.bind(null, todo.id)} className='border border-red-800 hover:bg-red-800 focus:border-red-1000 text-red-800 hover:text-white focus:text-red-1000 font-bold py-1 px-2 text-sm rounded-full focus:outline-none focus:shadow-outline'>
              <button><DeleteIcon/></button>
            </form> */}

            <Popover key={todo.id} triggerType='dialog' backdrop='opaque' placement="bottom-end" offset={10} size='lg'>
              <PopoverTrigger>
                <button className='border border-red-800 hover:bg-red-800 focus:border-red-1000 text-red-800 hover:text-white focus:text-red-1000 font-bold py-1 px-2 text-sm rounded-full focus:outline-none focus:shadow-outline'>
                  <DeleteIcon/>
                </button>
              </PopoverTrigger>
              <PopoverContent >
                <form action={actions.deleteTodolist.bind(null, todo.id)}>
                  <button color='danger' className="border border-red-800 hover:bg-red-800 focus:border-red-1000 text-red-800 hover:text-white focus:text-red-1000 font-bold py-1 px-2 text-sm rounded-full focus:outline-none focus:shadow-outline">
                    Are you sure?
                  </button>
                </form>
              </PopoverContent>
            </Popover>

          </div>
        </th>
      </tr>
    );
  });

  return (
    <div>
      <ImgFondo/>
      <div className="relative top-5 bg-white bg-opacity-70 p-5">
        <div>
          <table /*style={{ width: '100%', borderCollapse: 'collapse'}}*/>
            <thead className="head-table relative">
              <tr key={'idRow'}>
                <th key={'nameRow'} className="font-bold m-5 p-3 text-lg">Task Name</th>
                <th key={'tagRow'} className="font-bold m-5 p-3 text-lg">Tag</th>
                <th key={'whenRow'} className="font-bold m-5 p-3 text-lg">When</th>
                <th key={'priorityRow'} className="font-bold m-5 p-3 text-lg">Priority</th>
                <th key={'datelineRow'} className="font-bold m-5 p-3 text-lg">Dateline</th>
                <th key={'actionsRow'} className="font-bold m-5 p-3 text-lg">Actions</th>
                {/* <th className="font-bold m-5 p-3 text-lg">Remove</th> */}
              </tr>
            </thead>
            <tbody>
              {renderedTodolists}
            </tbody>
          </table>
          {/* <pre className="top-30">{JSON.stringify({ session: data.session, todos }, null, 4)}</pre> */}
        </div>
      </div>
    </div>
  );

}


