export default function showTime(currentDate: Date) {
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  let formattedTime = "";
  if (hours < 12) {
    formattedTime = `${hours}:${minutes} AM`;
  } else if (hours === 12) {
    formattedTime = `12:${minutes} PM`;
  } else {
    formattedTime = `${hours - 12}:${minutes} PM`;
  }

  return formattedTime;
}
