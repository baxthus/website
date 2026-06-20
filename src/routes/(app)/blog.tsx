import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/blog')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>WIP</div>;
}
