export function formatDateTimeWithSeconds(isoString) {
  const date = new Date(isoString);

  // Use Intl.DateTimeFormat for localized formatting
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Use 24-hour format
  });

  return formatter.format(date);
}
