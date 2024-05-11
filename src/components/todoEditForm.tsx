'use client';

// import type { Todolist } from '@prisma/client';
// import Editor from '@monaco-editor/react';
import { ChangeEvent, useState } from 'react';
import * as actions from '@/actions';
import Input from '@/UI/Input';
import { Select, SelectItem } from "@nextui-org/react";
// import { TodoProps } from '@/app/(header)/page';

// interface TodolistEditFormProps {
//   todolist: Todolist;
// }

interface TodolistEditFormProps {
  todolist: {
    id:      string,
    name:    string,
    tag:     string,
    when:    string,
    priority: string,
    date:    string
  }
}

const WhenOptions = [
  {value: 'Today', label: 'Today'},
  {value: 'Tomorrow', label: 'Tomorrow'},
  {value: 'This Week', label: 'This Week'},
  {value: 'Next Week', label: 'Next Week'},
  {value: 'This Month', label: 'This Month'},
  {value: 'Later', label: 'Later'},
  {value: 'Done', label: 'Done'}
]

const PriorityOptions = [
  {value: 'Very High', label: 'Very High'},
  {value: 'High', label: 'High'},
  {value: 'Medium', label: 'Medium'},
  {value: 'Low', label: 'Low'},
  {value: 'Very Low', label: 'Very Low'}
]

export default function TodolistEditForm({ todolist }: TodolistEditFormProps) {
  const [todo, setTodo] = useState({
    name: todolist.name,
    tag: todolist.tag,
    when: todolist.when,
    priority: todolist.priority,
    date: todolist.date, 
  });

  // const handleEditorChange = (value: string = '') => {
  //   setTodo(value);
  // };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target

    setTodo({
      ...todo,
      [name]: value
    })
  }

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = event.target

    setTodo({
      ...todo,
      [name]: value
    })
  }

  const editTodolistAction = actions.editTodolist.bind(null, todolist.id, todo);
  const deleteTodolistAction = actions.deleteTodolist.bind(null, todolist.id);

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-4 relative top-5 bg-green-700 bg-opacity-90 p-5 max-w-3xl w-full ">
        <Input 
          label="Name" 
          id="name" 
          name="name" 
          type="text" 
          defaultValue={todolist.name}
          onChange={handleInputChange}
          placeholder="Clean up" />
        <Input 
          label="Tag" 
          id="tag" 
          name="tag" 
          type="text" 
          defaultValue={todolist.tag}
          onChange={handleInputChange}
          placeholder="Home" />
        <div className="flex flex-col">
          <label htmlFor={'when'} className="w-12 font-bold text-white">Moment</label>
          <Select 
            name="when"
            label="Select a moment" 
            className="max-w-3xl" 
            defaultSelectedKeys={[todolist.when]}
            onChange={handleSelectChange}
            >
            {WhenOptions.map((when) => (
              <SelectItem key={when.value} value={when.value}>
                {when.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex flex-col">
          <label htmlFor={'priority'} className="w-12 font-bold text-white">Priority</label>
          <Select 
            name="priority"
            label="Select a priority" 
            className="max-w-3xl" 
            defaultSelectedKeys={[todolist.priority]}
            onChange={handleSelectChange}
            >
            {PriorityOptions.map((priority) => (
              <SelectItem key={priority.value} value={priority.value}>
                {priority.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <Input 
          label="Date" 
          id="date" 
          name="date" 
          type="date" 
          defaultValue={todolist.date}
          onChange={handleInputChange} />

        <div className="flex flex-col gap-4 w-full">
          <form action={editTodolistAction}>
            <button type="submit" className="p-2 border rounded bg-green-800 text-white w-full">
              Save
            </button>
          </form>
          <form action={deleteTodolistAction}>
            <button className="p-2 border rounded bg-red-900 text-white w-full">
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}