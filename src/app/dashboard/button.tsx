'use client'

import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export function Button() {
  const router = useRouter()

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace('/')
        },
      },
    })
  }

  return (
    <button
      type="button"
      onClick={signOut}
      className="mt-4 cursor-pointer rounded bg-red-600 px-3 py-2 hover:bg-red-600/90"
    >
      Sign-Out
    </button>
  )
}
