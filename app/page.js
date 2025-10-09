import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const handleLogout = async () => {
    'use server'
    const supabase = createClient()
    await supabase.auth.signOut()
    return redirect('/login')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="p-8 bg-gray-100 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
        {session ? (
          <div className="space-y-4">
            <p>You are logged in as {session.user.email}</p>
            <form action={handleLogout}>
              <button className="bg-red-500 text-white p-2 rounded-lg w-full">Logout</button>
            </form>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link href="/login" className="bg-blue-500 text-white p-3 rounded-lg">
              Login or Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}