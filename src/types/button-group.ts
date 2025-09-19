import type { Icon } from '@tabler/icons-react';

export type ButtonGroup = Array<{
  title: string;
  content?: string;
  icon: Icon;
  action?: () => void;
  copy?: boolean;
}>;
