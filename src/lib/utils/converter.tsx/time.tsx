export function getHoursDifference(timeString: string): string {
  const inputTime = new Date(timeString);
  if (isNaN(inputTime.getTime())) {
    throw new Error("Invalid date format");
  }

  const currentTime = new Date();

  const diffMilliseconds = currentTime.getTime() - inputTime.getTime();

  const diffHours = diffMilliseconds / (1000 * 60 * 60);

  return diffHours.toFixed(1);
}

export const createCurrentSeconds = () => {
  const dateInMillisecs = new Date().getTime();
  return Math.round(dateInMillisecs / 1000);
};

export const formatTimestamp = (seconds: number): string => {
  const date = new Date(seconds * 1000);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return date.toLocaleString("en-US", options);
};
