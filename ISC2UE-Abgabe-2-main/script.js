function currentDay() {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date();
    const dayOfWeek = weekdays[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const dateString = `${dayOfWeek}, ${month} ${addLeadingZero(dayOfMonth)}, ${year}`;
    document.getElementById("current-day").innerText = dateString;
  }
  
  function currentTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const timeString = `${addLeadingZero(hours)}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`;
    document.getElementById("current-time").innerText = timeString;
    setTimeout(currentTime, 1000);

  }
  
  function addLeadingZero(value) {
    if (value < 10) {
      return `0${value}`;
    } else {
      return value;
    }
  }
  
  let startTime = new Date();
  
  function timeOnPage() {
    const currentTime = new Date();
    const timeDiff = currentTime - startTime;
    const secondsDiff = Math.floor(timeDiff / 1000);
    const minutesDiff = Math.floor(secondsDiff / 60);
    const hoursDiff = Math.floor(minutesDiff / 60);
    const timeOnPageString = `${addLeadingZero(hoursDiff)}:${addLeadingZero(minutesDiff % 60)}:${addLeadingZero(secondsDiff % 60)}`;
    //document.getElementById("time-on-page").innerText = timeOnPageString;
    //setTimeout(timeOnPage, 1000);
  }
  
  function refresh() {
    location.reload();
  }

  function timeOnPageAlert() {
    const currentTime = new Date();
    const timeDiff = currentTime - startTime;
    const secondsDiff = Math.floor(timeDiff / 1000);
    const minutesDiff = Math.floor(secondsDiff / 60);
    const hoursDiff = Math.floor(minutesDiff / 60);
    alert(`You have been on this page for: ${addLeadingZero(hoursDiff)} hours, ${addLeadingZero(minutesDiff % 60)} minutes, ${addLeadingZero(secondsDiff % 60)} seconds`)
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    currentDay();
    currentTime();
    timeOnPage();
  });

  