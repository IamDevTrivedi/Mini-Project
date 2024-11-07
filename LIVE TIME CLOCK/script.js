function updateTimeAndDate() {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istTime = new Date(now.getTime() + istOffset);

  const hours = String(istTime.getUTCHours()).padStart(2, "0");
  const minutes = String(istTime.getUTCMinutes()).padStart(2, "0");
  const seconds = String(istTime.getUTCSeconds()).padStart(2, "0");
  const milliseconds = String(istTime.getUTCMilliseconds()).padStart(3, "0");

  const day = String(istTime.getUTCDate()).padStart(2, "0");
  const month = String(istTime.getUTCMonth() + 1).padStart(2, "0");
  const year = istTime.getUTCFullYear();

  let currentDate = new Date() ; 

  document.getElementById(
    "time"
  ).textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
  document.getElementById("date").textContent = currentDate.toDateString();
}

setInterval(updateTimeAndDate, 1);
updateTimeAndDate(); // Initial call to set the time immediately
