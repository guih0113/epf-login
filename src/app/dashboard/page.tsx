import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { Button } from './button'

export default async function DashBoard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/')
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-1">
      <p className="text-lg">Usuário: {session.user.name}</p>
      <p className='text-lg'>E-mail: {session.user.email}</p>
      <Button />
    </div>
  )
}
