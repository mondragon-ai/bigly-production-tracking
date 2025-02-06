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

export const constGetCurrentMonth = () => {
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  return `01/${month < 10 ? `0${month + 1}` : month + 1}/${year}`;
};

/**
 * Gets the number of days in the current month.
 *
 * @returns {number} The number of days in the current month.
 */
export const getDaysInCurrentMonth = (): number => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return daysInMonth;
};

export const formatDateToYYYYMMDD = (date: Date | string): string | null => {
  if (!date) return null;

  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
