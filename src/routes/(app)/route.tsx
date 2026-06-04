import { createFileRoute, Outlet } from '@tanstack/react-router';

import Footer from '@/components/footer';

export const Route = createFileRoute('/(app)')({
  component: AppLayout,
});

function AppLayout() {
  return (
    <main className="flex flex-col items-center space-y-8 p-8">
      <Outlet />
      <Footer />
    </main>
  );
}
