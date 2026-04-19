import { revalidateTag } from 'next/cache';

/**
 * Invalidates cached data tagged with the given names so the next request
 * rebuilds from the database. Call after any admin mutation that changes
 * public-facing content.
 */
export function revalidateTags(...tags: string[]): void {
  for (const tag of tags) {
    revalidateTag(tag);
  }
}
