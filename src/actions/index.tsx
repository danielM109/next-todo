'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { prisma } from "../../lib/db";
import { z } from "zod";

interface TodolistEditFormProps {
  name: string,
  tag: string,
  when: string,
  priority: string,
  date: string,
}

// Define el esquema de validación utilizando Zod
const userSchema = z.object({
  name: z.string().min(1),
  tag: z.string().min(2),
  when: z.string().min(1),
  priority: z.string().min(1),
  date: z.string().min(1),
  userId: z.string(),
});

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

  revalidatePath('/');
  redirect('/');
}

export async function deleteTodolist(id: string) {

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
  console.log(formData);
  try {
    // Check the user's inputs and make sure they're valid
    const name = formData.get('name');
    const tag = formData.get('tag');
    const when = formData.get('when');
    const priority = formData.get('priority');
    const date = formData.get('date');

    // Validar los datos utilizando el esquema
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.auth.getSession();
    if (!data.session?.user) {
      redirect("/login");
    }
    
    const validatedData = userSchema.parse({name, tag, when, priority, date, userId: data.session.user.id});

    if (validatedData) {
      await prisma.todo.create({
        data: validatedData,
      });
    } else {
      alert('Complete all fields')
    }

  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: 'Error de completitud de campos o conexion al servidor. Asegurate de completar todos los campos',
      };
    } else {
      return {
        message: 'Something went wrong...',
      };
    }
  }

  revalidatePath('/roadmap');
  // Redirect the user back to the root route
  redirect('/roadmap');
}
