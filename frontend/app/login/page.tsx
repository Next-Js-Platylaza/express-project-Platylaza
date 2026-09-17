import Link from "next/link";
import { login } from "../lib/actions";

export default function Page(){
    return <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <div className="flex flex-col gap-[32px] border-2 border-black">
          <h1 className="text-center w-full font-bold mt-2 -mb-6">Login:</h1>
          <form className="w-full" action={login}>
            <div className="border-1 border-black my-1">
              <label htmlFor="email">Email:</label>
              <input type="text" name="email"></input>
            </div>
            <div className="border-1 border-black my-1">
              <label htmlFor="password">Password:</label>
              <input type="password" name="password"></input>
            </div>
            <button type="submit" className="w-full bg-red-200 border-1 p-1 my-1">Login</button>
          </form>
          </div>
          <h4 className="-mt-5 m-auto" >Don't have an account? <Link href="/" className="text-blue-600 underline hover:text-blue-800 backdrop-blur-none">Create one here.</Link></h4>
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          Copyright 2025
        </footer>
    </div>
}