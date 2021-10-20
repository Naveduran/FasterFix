import React from 'react';

export default function Login() {
  return(
    <div class="flex h-screen items-center bg-gray-100 justify-center">
      <div class="w-auto h-auto bg-gray-200 p-9 text-center shadow-2xl rounded-xl">
        <h2 class="m-3 text-5xl">
            Faster Fix
        </h2>
        <p>
            Warranties Manager System
        </p>
        <form>
            <label class="flex gap-x-11 my-6">
                <p>
                    Email:
                </p>
                <input type="text" name="name" class="mx-2   border-2 rounded-lg" />
            </label>
            <label class="flex gap-x-3">
                <p>
                    Password
                </p>
                <input type="password" name="name" class="mx-2   border-2 rounded-lg" />
            </label>
            <div class="mt-7">
                <button 
                type="submit" 
                class="transition font-serif duration-500 bg-gray-500 hover:bg-gray-400 transform hover:-translate-y-1 hover:scale-110 rounded- py-1 px-2"
                >Start
                </button>
            </div>
        </form>
      </div>
    </div>
  )
}