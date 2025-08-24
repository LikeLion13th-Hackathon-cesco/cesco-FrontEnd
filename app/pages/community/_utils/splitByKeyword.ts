export function splitByKeyword(text: string, search: string) {
  if (!search) return [text];

  const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  return text.split(regex).filter(Boolean) as string[];
}
