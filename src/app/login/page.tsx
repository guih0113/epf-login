'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaDiscord, FaFacebookF, FaGithub } from 'react-icons/fa'
import z from 'zod'
import { authClient } from '@/lib/auth-client'

const loginFormSchema = z.object({
  email: z.email('E-mail inválido.'),
  password: z.string().min(6, 'A senha deve ter, no mínimo, 6 caracteres.'),
})

type LoginFormSchema = z.infer<typeof loginFormSchema>

export default function Login() {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(formData: LoginFormSchema) {
    setMessage('')
    setError('')
    setLoading(true)

    const { error: authError } = await authClient.signIn.email(
      {
        email: formData.email,
        password: formData.password,
        callbackURL: '/dashboard',
      },
      {
        onRequest: (ctx) => {
          console.log('Requisição Better Auth:', ctx)
        },
        onSuccess: (ctx) => {
          console.log('Logado com sucesso:', ctx)
          setMessage('Login realizado com sucesso! Redirecionando...')
          router.replace('/dashboard')
        },
        onError: (ctx) => {
          console.error('Erro ao criar conta com Better Auth:', ctx)
          setError(ctx.error.error || 'Erro ao logar. Verifique os dados.')
        },
      },
    )

    setLoading(false)
    if (authError) {
      console.error('Erro direto do authClient:', authError)
      setError(authError.message || 'Ocorreu um erro inesperado no cadastro.')
    }

    reset()
  }

  async function handleSignInWithGithub() {
    await authClient.signIn.social({
      provider: 'github',
      callbackURL: '/dashboard',
    })
  }

  async function handleSignInWithDiscord() {
    await authClient.signIn.social({
      provider: 'discord',
      callbackURL: '/dashboard',
    })
  }

  async function handleSignInWithFacebook() {
    await authClient.signIn.social({
      provider: 'facebook',
      callbackURL: '/dashboard',
    })
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

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5 px-10">
          <div>
            <label htmlFor="email" className="text-sm">
              E-mail
            </label>
            <div className="relative my-2 rounded-md bg-zinc-700 px-3 py-3 text-sm">
              <span className="absolute">📧</span>
              <input
                type="email"
                {...register('email')}
                placeholder="yourname@gmail.com"
                id="email"
                className="ml-8 outline-none"
              />
            </div>
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>

          <div>
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <div className="relative my-2 rounded-md bg-zinc-700 px-3 py-3 text-sm">
              <span className="absolute">🔒</span>
              <input
                type="password"
                {...register('password')}
                placeholder="Password"
                id="password"
                className="ml-8 outline-none"
              />
            </div>
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] py-3 font-bold text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                {/** biome-ignore lint/a11y/noSvgWithoutTitle: aaa */}
                <svg
                  className="h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Cadastrando...
              </>
            ) : (
              'Cadastrar'
            )}
          </button>

          {message && <p className="mt-2 text-center text-green-400">{message}</p>}
          {error && <p className="mt-2 text-center text-red-500">{error}</p>}

          <p className="text-center text-sm">
            Não possui uma conta?{' '}
            <Link href="register" prefetch>
              <span className="cursor-pointer underline hover:no-underline">Cadastre-se</span>
            </Link>
          </p>

          <div className="space-y-5 text-center text-sm">
            <p className="text-zinc-500">Ou continue com</p>

            <div className="flex justify-center gap-6">
              <button type="button" onClick={handleSignInWithFacebook}>
                <FaFacebookF className="size-6 cursor-pointer transition-transform duration-200 hover:scale-110" />
              </button>
              <button type="button" onClick={handleSignInWithDiscord}>
                <FaDiscord className="size-6 cursor-pointer transition-transform duration-200 hover:scale-110" />
              </button>
              <button type="button" onClick={handleSignInWithGithub}>
                <FaGithub className="size-6 cursor-pointer transition-transform duration-200 hover:scale-110" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
