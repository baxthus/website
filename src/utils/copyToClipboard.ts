import { addToast } from '@heroui/react';

export default async function copyToClipboard(
  text: string,
  description?: string,
) {
  await navigator.clipboard.writeText(text);
  addToast({
    title: 'Copied to clipboard',
    description,
    color: 'success',
  });
}
