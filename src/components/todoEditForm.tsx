'use client';

// import type { Todolist } from '@prisma/client';
// import Editor from '@monaco-editor/react';
import { ChangeEvent, useState } from 'react';
import * as actions from '@/actions';
import Input from '@/UI/Input';
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

  const editTodolistAction = actions.editTodolist.bind(null, todolist.id, todo);
  const deleteTodolistAction = actions.deleteTodolist.bind(null, todolist.id);

  return (
    <div className="flex flex-col gap-4">
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
      <Input 
        label="When" 
        id="when" 
        name="when" 
        type="text" 
        defaultValue={todolist.when} 
        onChange={handleInputChange}
        placeholder="Today, Tomorrow, This Week, Next Week, This Month, Later, Done"/>
      <Input
        label="Priority" 
        id="priority" 
        name="priority" 
        type="text" 
        defaultValue={todolist.priority} 
        onChange={handleInputChange}
        placeholder="Very High, High, Medium, Low, Very Low" />
      <Input 
        label="Date" 
        id="date" 
        name="date" 
        type="date" 
        defaultValue={todolist.date}
        onChange={handleInputChange} />

      <div className="flex gap-4">
        <form action={editTodolistAction}>
          <button type="submit" className="p-2 border rounded bg-green-700 text-white">
            Save
          </button>
        </form>
        <form action={deleteTodolistAction}>
          <button className="p-2 border rounded bg-red-900 text-white">
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}