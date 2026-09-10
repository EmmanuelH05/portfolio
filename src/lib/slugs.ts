interface HasSlug {
  slug: string;
}

export function findBySlug<T extends HasSlug>(items: T[], slug: string): T | undefined {
  return items.find((item) => item.slug === slug);
}

/** The item after `slug`, wrapping around, for "Next" links at the bottom of a page. */
export function nextAfter<T extends HasSlug>(items: T[], slug: string): T {
  const index = items.findIndex((item) => item.slug === slug);
  return items[(index + 1) % items.length];
}
