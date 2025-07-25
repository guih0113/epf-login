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
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <p className="text-lg">Usuário: teste</p>
      <Button />
    </div>
  )
}
