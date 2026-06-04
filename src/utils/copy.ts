import { toast } from '@heroui/react';

export async function copyToClipboard(text: string, description?: string) {
  await navigator.clipboard.writeText(text);
  toast.success('Copied to clipboard', { description });
}
