export function getHoursDifference(timeString: number): string {
  const inputTime = new Date(timeString * 1000);
  if (isNaN(inputTime.getTime())) {
    throw new Error("Invalid date format");
  }

  const currentTime = new Date();

  const diffMilliseconds = currentTime.getTime() - inputTime.getTime();

  const diffHours = diffMilliseconds / (1000 * 60 * 60);

  if (diffHours >= 720) {
    return `${(diffHours / 720).toFixed(1)}m`;
  }

  if (diffHours >= 168 && diffHours < 720) {
    return `${(diffHours / 168).toFixed(1)}w`;
  }

  if (diffHours > 72 && diffHours < 168) {
    return `${(diffHours / 24).toFixed(1)}d`;
  }

  return `${diffHours.toFixed(1)}h`;
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
