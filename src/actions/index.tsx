'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { prisma } from "../../lib/db";

interface TodolistEditFormProps {
  name: string,
  tag: string,
  when: string,
  priority: string,
  date: string,
}

export async function editTodolist(id: string, {name, tag, when, priority, date}: TodolistEditFormProps) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  if (!data.session?.user) {
    redirect("/login");
  }

  await prisma.todo.update({
    where: { userId: data.session.user.id, id },
    data: { 
      name,
      tag,
      when,
      priority,
      date 
    },
  });

  // const todos = await prisma.Todo.findMany({
  //   where: { userId: data.session.user.id },
  // });
  
  // await db.todolist.update({
  //   where: { id },
  //   data: { 
  //     name,
  //     tag,
  //     when,
  //     priority,
  //     date 
  //   },
  // });

  revalidatePath('/');
  redirect('/');
}

export async function deleteTodolist(id: string) {
  // await db.todolist.delete({
  //   where: { id },
  // });

  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  if (!data.session?.user) {
    redirect("/login");
  }

  await prisma.todo.delete({
    where: { userId: data.session.user.id, id },
  });

  revalidatePath('/');
  redirect('/');
}

export async function createTodolist( 
  formState: { message: string },
  formData: FormData
) {
  try {
    // Check the user's inputs and make sure they're valid
    const name = formData.get('name');
    const tag = formData.get('tag');
    const when = formData.get('when');
    const priority = formData.get('priority');
    const date = formData.get('date');

    if (typeof name !== 'string' || name.length < 3) {
      return {
        message: 'Name must be longer',
      };
    }
    if (typeof tag !== 'string' || tag.length < 1) {
      return {
        message: 'Tag must be longer',
      };
    }
    if (typeof when !== 'string' || when.length < 1) {
      return {
        message: 'When must be longer',
      };
    }
    if (typeof priority !== 'string' || priority.length < 1) {
      return {
        message: 'Priority must be longer',
      };
    }
    if (typeof date !== 'string' || date.length < 1) {
      return {
        message: 'Date must be longer',
      };
    }

    // Create a new record in the database
    // await db.todolist.create({
    //   data: {
    //     name,
    //     tag,
    //     when,
    //     priority,
    //     date
    //   },
    // });
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.auth.getSession();
    if (!data.session?.user) {
      redirect("/login");
    }

    await prisma.todo.create({
      data: {
        name,
        tag,
        when,
        priority,
        date,
        userId: data.session.user.id
      },
    });

  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    } else {
      return {
        message: 'Something went wrong...',
      };
    }
  }

  revalidatePath('/');
  // Redirect the user back to the root route
  redirect('/');
}
