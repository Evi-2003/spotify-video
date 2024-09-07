'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Callback = () => {
  const router = useRouter()

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code')

    localStorage.setItem('spotify_code', code ?? '')

    router.push('/')
  }, [router])

  return <div>Logging in</div>
}

export default Callback
