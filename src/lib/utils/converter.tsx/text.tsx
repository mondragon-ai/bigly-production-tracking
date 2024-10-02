export function getInitials(name: string) {
  const words = name.split(" ");

  let initials = "";
  for (const w of words) {
    initials += w.charAt(0).toLocaleUpperCase();
  }

  return initials;
}
