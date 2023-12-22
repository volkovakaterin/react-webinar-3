export default function correctDate(date) {
  const originalDate = new Date(date);
  const dateOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };

  let formattedDate = originalDate.toLocaleDateString("ru-RU", dateOptions);
  formattedDate = formattedDate.replace(/ г\.$/, "");
  formattedDate += ` в ${originalDate.toLocaleTimeString(
    "ru-RU",
    timeOptions
  )}`;
  return formattedDate;
}
