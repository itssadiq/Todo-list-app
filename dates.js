import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

const today = dayjs();
const currentDay = today.format("ddd");
const currentDate = today.format("D");

const yesterday = today.subtract(1, "day");
const yesterdayDay = yesterday.format("ddd");
const yesterdayDate = yesterday.format("D");

const tomorrow = today.add(1, "day");
const tomorrowDay = tomorrow.format("ddd");
const tomorrowDate = tomorrow.format("D");

const day2 = today.add(2, "day");
const day2day = day2.format("ddd");
const day2date = day2.format("D");

const day3 = today.add(3, "day");
const day3day = day3.format("ddd");
const day3date = day3.format("D");

const day4 = today.add(4, "day");
const day4day = day4.format("ddd");
const day4date = day4.format("D");

document.querySelector(".js-date").innerHTML = `
    <div class="date-box">
        <div>${yesterdayDay}</div>
        <div>${yesterdayDate}</div>
    </div>
    <div class="date-box current-date">
          <div>${currentDay}</div>
          <div>${currentDate}</div>
    </div>
    <div class="date-box">
          <div>${tomorrowDay}</div>
          <div>${tomorrowDate}</div>
    </div>
    <div class="date-box">
          <div>${day2day}</div>
          <div>${day2date}</div>
    </div>
    <div class="date-box">
          <div>${day3day}</div>
          <div>${day3date}</div>
    </div>
    <div class="date-box">
          <div>${day4day}</div>
          <div>${day4date}</div>
    </div>
`;
