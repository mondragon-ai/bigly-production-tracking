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
