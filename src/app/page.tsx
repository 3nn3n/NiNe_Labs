import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"


export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background flex-col gap-4">
      <div className="text-center text-2xl font-bold">
        <h1>Welcome to the NiNe Labs</h1>
      </div>
      <div className="flex gap-4">
        <OrganizationSwitcher />
        <UserButton />
      </div>
    </div>
  )
}

