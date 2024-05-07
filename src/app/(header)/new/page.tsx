'use client';

import Input from "@/ui/input"; 

import { useFormState } from 'react-dom';
import * as actions from '@/actions';
import ImgFondo from "@/components/ImgFondo";
// import Header from "@/components/header";


export default function TodolistCreatePage() {
  const [formState, action] = useFormState(actions.createTodolist, {
    message: '',
  })

  return (
    <div>
      {/* <Header/>  */}
      <ImgFondo/>
      <form action={action}  className="relative top-5 bg-white bg-opacity-80 p-5 ">
        <h2 className="font-bold m-5 p-3 text-xl">Create a new task</h2>
        <div className="flex flex-col gap-4">
          <Input label="Name" id="name" name="name" type="text" placeholder="Clean up" />
          <Input label="Tag" id="tag" name="tag" type="text" placeholder="Home" />
          <Input label="When" id="when" name="when" type="text" placeholder="Today, Tomorrow, This Week, Next Week, This Month, Later, Done"/>
          <Input label="Priority" id="priority" name="priority" type="text" placeholder="Very High, High, Medium, Low, Very Low" />
          <Input label="Date" id="date" name="date" type="date" />

          {formState.message ? (
            <div className="my-2 p-2 bg-red-200 border rounded border-red-400">
              {formState.message}
            </div>
          ) : null}

          <button type="submit" className="rounded p-2 bg-green-700 text-white">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
