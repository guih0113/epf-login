'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa'

export default function Login() {
  const { handleSubmit, reset, register } = useForm()

  function handleMakeLogin() {
    console.log('test')
    reset()
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div
        className="flex w-md flex-col items-center justify-center gap-8 overflow-hidden rounded-[20px] bg-black/80 py-7"
        style={{ boxShadow: '0 0 30px rgba(255, 255, 255, 0.15)' }}
      >
        <div className="mt-2">
          <Image src="/logo.png" alt="Logo" width={60} height={60} quality={100} />
        </div>

        <div className="space-y-3">
          <h1 className="text-center font-bold text-2xl">Seja bem vindo!</h1>
          <p className="text-sm text-zinc-400">Seja vem vindo de volta, sentimos sua falta!</p>
        </div>

        <form onSubmit={handleSubmit(handleMakeLogin)} className="w-full space-y-5 px-10">
          <div>
            <label htmlFor="email" className="text-sm">
              E-mail
            </label>
            <div className="relative mt-2 rounded-md bg-zinc-700 px-3 py-3 text-sm">
              <span className="absolute">📧</span>
              <input
                type="email"
                {...register('email')}
                placeholder="yourname@gmail.com"
                id="email"
                className="ml-8 outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <div className="relative mt-2 rounded-md bg-zinc-700 px-3 py-3 text-sm">
              <span className="absolute">🔒</span>
              <input
                type="password"
                {...register('password')}
                placeholder="Password"
                id="password"
                className="ml-8 outline-none"
              />
            </div>
          </div>

          <input
            type="submit"
            value="Log-in"
            className="mt-3 w-full cursor-pointer rounded-lg bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] py-3 font-bold text-sm"
          />

          <p className="text-center text-sm">
            Não possui uma conta?{' '}
            <Link href="register">
              <span className="cursor-pointer underline hover:no-underline">Cadastre-se</span>
            </Link>
          </p>

          <div className="space-y-5 text-center text-sm">
            <p className="text-zinc-500">Ou continue com</p>

            <div className="flex justify-center gap-6">
              <FaTwitter className="size-6 cursor-pointer transition-transform duration-200 hover:scale-110" />
              <FaGoogle className="size-6 cursor-pointer transition-transform duration-200 hover:scale-110" />
              <FaGithub className="size-6 cursor-pointer transition-transform duration-200 hover:scale-110" />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
