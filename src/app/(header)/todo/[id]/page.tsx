import { notFound } from 'next/navigation';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "../../../../../lib/db";
import TodolistEditForm from '@/components/todo-edit-form'; 
import ImgFondo from '@/components/ImgFondo';
import Header from '@/components/header';

interface TodolistEditPageProps {
  params: {
    id: string;
  };
}

export default async function TodolistEditPage(props: TodolistEditPageProps) {
  // const id = parseInt(props.params.id);
  // const todolist = await db.todolist.findFirst({
  //   where: { id },
  // });
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  if (!data.session?.user) {
    redirect("/login");
  }

  const todos = await prisma.todo.findFirst({
    where: { userId: data.session.user.id, id: props.params.id },
  });

  // console.log(todos);

  if (!todos) {
    return notFound();
  }

  return (
    <div>
      {/* <Header/>  */}
      <ImgFondo/>
      <div className="relative top-5 bg-white bg-opacity-70 p-5 "> 
        <TodolistEditForm todolist={todos} />
      </div>
    </div>
  );
}