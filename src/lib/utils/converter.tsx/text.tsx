export function getInitials(name: string) {
  const words = name.split(" ");

  let initials = "";
  for (const w of words) {
    initials += w.charAt(0).toLocaleUpperCase();
  }

  return initials;
}

export const truncateString = (str: string, n: number): string => {
  return str.length > n ? str.substring(0, n) + "..." : str;
};
