import { UserButton, currentUser } from '@clerk/nextjs'

export default async function HomePage() {
  const user = await currentUser()
  return (
    <div>
      <p>home page</p>
      <p>{JSON.stringify({ user }, null, 2)}</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}
