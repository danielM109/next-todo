'use client';

import Input from "@/ui/input"; 

import { useFormState } from 'react-dom';
import * as actions from '@/actions';
import ImgFondo from "@/components/imgFondo";
import { Select, SelectItem } from "@nextui-org/react";
// import Header from "@/components/header";

const PriorityOptions = [
  {value: 'Very High', label: 'Very High'},
  {value: 'High', label: 'High'},
  {value: 'Medium', label: 'Medium'},
  {value: 'Low', label: 'Low'},
  {value: 'Very Low', label: 'Very Low'}
]

const WhenOptions = [
  {value: 'Today', label: 'Today'},
  {value: 'Tomorrow', label: 'Tomorrow'},
  {value: 'This Week', label: 'This Week'},
  {value: 'Next Week', label: 'Next Week'},
  {value: 'This Month', label: 'This Month'},
  {value: 'Later', label: 'Later'},
  {value: 'Done', label: 'Done'}
]



export default function TodolistCreatePage() {
  const [formState, action] = useFormState(actions.createTodolist, {
    message: '',
  })

  return (
    <div className="flex items-center justify-center">
      {/* <Header/>  */}
      <ImgFondo/>
      <form action={action}  className="relative top-5 bg-green-700 bg-opacity-90 p-5 max-w-3xl w-full">
        <h2 className="font-bold m-5 p-3 text-3xl flex items-center justify-center color-white">Create a new task</h2>
        <div className="flex flex-col gap-4">
          <Input label="Name" id="name" name="name" type="text" placeholder="Clean up" />
          <Input label="Tag" id="tag" name="tag" type="text" placeholder="Home" />
          <Select 
            name="when"
            label="Select a moment" 
            className="max-w-3xl" 
          >
            {WhenOptions.map((when) => (
              <SelectItem key={when.value} value={when.value}>
                {when.label}
              </SelectItem>
            ))}
          </Select>
          <Select 
            name="priority"
            label="Select a priority" 
            className="max-w-3xl" 
            >
            {PriorityOptions.map((priority) => (
              <SelectItem key={priority.value} value={priority.value}>
                {priority.label}
              </SelectItem>
            ))}
          </Select>
          {/* <Input label="When" id="when" name="when" type="text" placeholder="Today, Tomorrow, This Week, Next Week, This Month, Later, Done"/> */}
          {/* <Input label="Priority" id="priority" name="priority" type="text" placeholder="Very High, High, Medium, Low, Very Low" /> */}
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
