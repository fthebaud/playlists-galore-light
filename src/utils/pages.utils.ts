import { PAGE_SIZE } from '@/config';

export function getPageCount(items: unknown[]) {
  return Math.ceil(items.length / PAGE_SIZE);
}
