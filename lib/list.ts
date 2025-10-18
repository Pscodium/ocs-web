export function formatList(items: string[]): string {
  const size = items.length;

  if (size === 0) return "";
  if (size === 1) return items[0];
  if (size === 2) return `${items[0]} e ${items[1]}`;

  return `${items.slice(0, -1).join(", ")} e ${items[size - 1]}`;
}