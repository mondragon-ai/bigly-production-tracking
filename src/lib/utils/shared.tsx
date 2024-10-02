export const copyToClipBoard = (value: string) => {
  if (navigator) {
    navigator.clipboard.writeText(value);
  }
};
