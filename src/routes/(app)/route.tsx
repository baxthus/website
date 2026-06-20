import { createFileRoute, Outlet } from '@tanstack/react-router';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export const Route = createFileRoute('/(app)')({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="mx-4 my-3.5 max-w-3xl space-y-3.5 md:mx-auto">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
