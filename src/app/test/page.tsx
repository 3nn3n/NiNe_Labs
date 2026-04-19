import {prisma} from "@/lib/db";

export default async function TestPage() {
  const users = await prisma.voice.findMany();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background flex-col gap-4">
      <div className="text-center text-2xl font-bold">
        <h1>Users</h1>
      </div>
      <div className="flex flex-col gap-2">
        {users.map((user) => (  
          <div key={user.id} className="p-4 bg-white rounded shadow">
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Category:</strong> {user.category}</p>
            <p><strong>Created At:</strong> {user.createdAt.toISOString()}</p>
            <p><strong>Updated At:</strong> {user.updatedAt.toISOString()}</p>
            <p><strong>Variant:</strong> {user.variant}</p>
          </div>
        ))}
      </div>
    </div>
  );
}