import type { ComponentPropsWithoutRef } from 'react';

// Setting up InputProps that contain the default <input> props as well as some custom props (label, id)
type InputProps = {
  label: string;
  id: string;
} & ComponentPropsWithoutRef<'input'>;

export default function Input({ label, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="w-12 font-bold text-white">{label}</label>
      <input id={id} {...props} className="border rounded-md p-3 w-full container mx-auto" />
    </div>
  );
}