import { Avatar } from '@heroui/react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/')({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <Avatar className="size-32 rounded-full">
        <Avatar.Image src="/avatar.jpeg" alt="Avatar" />
        <Avatar.Fallback>B</Avatar.Fallback>
      </Avatar>

      <h1 className="text-4xl font-bold">baxthus</h1>
    </div>
  );
}
