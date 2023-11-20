// التاريخ بالهجري
// التاريخ بالميلادي
// اليوم
// بإستخراج مواعيد الصلاة
// -اجعل للتاريخ زر لاظهار بالهجري و زر اخر للميلادي

if (
  localStorage.getItem("user") === undefined ||
  localStorage.getItem("user") === null
) {
  window.location.href = "signIn.html";
} else {
  const user = JSON.parse(localStorage.getItem("user"));
  document.getElementById(
    "navbarUserName"
  ).innerText = `Welcom, ${user.username}`;
}
const date = document.getElementById("date");
const day = document.getElementById("day");
const changeDateBtn = document.getElementById("changeDate");
const cardContainer = document.querySelector(".card-container");
const prayerTimeBtn = document.getElementById("prayerTimesBtn");
const backButton = document.getElementById("backButton");
let currentDate = "hijri";

const getData = async () => {
  try {
    const response = await fetch(
      "https://api.aladhan.com/v1/calendarByCity/2023/11?city=Riyadh&country=Saudi%20Arabia&method=2"
    );
    const data = await response.json();

    date.textContent = `Gregorian: ${data.data[19].date.gregorian.date}`;
    day.textContent = `Day: ${data.data[19].date.gregorian.day}`;

    const prayerName = Object.keys(data.data[19].timings);
    const prayerTimes = Object.values(data.data[19].timings);
    for (let i = 0; i < prayerName.length; i++) {
      if (
        prayerName[i] === "Sunrise" ||
        prayerName[i] === "Sunset" ||
        prayerName[i] === "Lastthird" ||
        prayerName[i] === "Firstthird" ||
        prayerName[i] === "Midnight" ||
        prayerName[i] === "Imsak"
      ) {
        continue;
      } else {
        cardContainer.insertAdjacentHTML(
          "beforeend",
          ` <div
        class="card d-flex justify-content-center flex-column align-items-center shadow"
        style="width: 12rem"
      >
        <div class="card-body">
          <h3 class="card-title text-center" id="prayerName">${prayerName[i]}</h3>
          <h4 class="card-text text-center" id="prayerTime">${prayerTimes[i]}</h4>
        </div>
      </div>`
        );
      }
    }
  } catch (error) {
    console.log(`status ${error}`);
  }
};
getData();

changeDateBtn.addEventListener("click", changeDate);

async function changeDate() {
  try {
    const response = await fetch(
      "https://api.aladhan.com/v1/calendarByCity/2023/11?city=Riyadh&country=Saudi%20Arabia&method=2"
    );
    const data = await response.json();

    if (currentDate === "gregorian") {
      date.textContent = `Gregorian: ${data.data[19].date.gregorian.date}`;
      day.textContent = `Day: ${data.data[19].date.gregorian.day}`;
      currentDate = "hijri";
    } else if (currentDate === "hijri") {
      date.textContent = `Hijri: ${data.data[19].date.hijri.date}`;
      day.textContent = `Day: ${data.data[19].date.hijri.day}`;
      currentDate = "gregorian";
    }
  } catch (error) {
    console.log(`status ${error}`);
  }
}
prayerTimeBtn.addEventListener("click", () => {
  document.querySelector(".headerBtn").classList.toggle("hide");
  document.querySelector(".paryer-times-container").classList.remove("hide");
});
backButton.addEventListener("click", () => {
  document.querySelector(".headerBtn").classList.toggle("hide");
  document.querySelector(".paryer-times-container").classList.add("hide");
});
