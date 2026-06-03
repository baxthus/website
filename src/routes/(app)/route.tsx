import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)')({
  component: AppLayout,
});

function AppLayout() {
  return (
    <main className="flex flex-col items-center p-8">
      <Outlet />
    </main>
  );
}
