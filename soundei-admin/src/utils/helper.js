export function formatDateTimeWithSeconds(isoString) {
  const date = new Date(isoString);

  // Use Intl.DateTimeFormat for localized formatting
  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "short", // Full day name
    year: "numeric",
    month: "short", // Full month name
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Use 24-hour format
  });

  return formatter.format(date);
}
