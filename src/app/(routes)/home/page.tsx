import { UserButton, auth } from '@clerk/nextjs'

export default async function HomePage() {
  const { sessionClaims, userId } = auth()
  return (
    <div>
      <p>home page</p>
      <p>{JSON.stringify({ sessionClaims, userId })}</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}
