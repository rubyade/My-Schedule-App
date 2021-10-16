function settingDate(date, day) {
  date = new Date(date);
  date.setDate(day);
  date.setHours(23);
  return date;
}

function getDatesBetween(date1, date2) {
  let range1 = new Date(date1);
  let range2 = new Date(date2);
  date1 = settingDate(date1, 31);
  date2 = settingDate(date2, 31);
  let temp;
  let dates = [];
  while (date1 <= date2) {
    if (date1.getDate() != 31) {
      temp = settingDate(date1, 0);
      if (temp >= range1 && temp <= range2) dates.push(temp);
      date1 = settingDate(date1, 31);
    } else {
      temp = new Date(date1);
      if (temp >= range1 && temp <= range2) dates.push(temp);
      date1.setMonth(date1.getMonth() + 1);
    }
  }

  console.log(dates);
  let content = "";
  let weekDays = [
    { shortDay: "Mon", fullDay: "Monday" },
    { shortDay: "Tues", fullDay: "Tuesday" },
    { shortDay: "Wed", fullDay: "Wednesday" },
    { shortDay: "Thurs", fullDay: "Thursday" },
    { shortDay: "Fri", fullDay: "friday" },
    { shortDay: "Sat", fullDay: "Saturday" },
    { shortDay: "Sun", fullDay: "Sunday" },
  ];

  for (let i = 0; i < dates.length; i++) {
    let LastDate = dates[i];
    firstDate = new Date(dates[i].getFullYear(), dates[i].getMonth(), 1);
    content += "<div id='calendarTable_" + (i + 1) + "'>";
    content +=
      "<h2>" +
      firstDate.toString().split(" ")[1] +
      "-" +
      firstDate.getFullYear() +
      "</h2>";
    content += "<table>";
    content += "<thead>";

    weekDays.map((item) => {
      content += "<th>" + item.fullDay + "</th>";
    });
    content += "</thead>";
    content += "<tbody>";
    let j = 1;
    let displayNum, idMonth;
    while (j <= LastDate.getDate()) {
      content += "<tr>";

      content += "</tr>";
    }
    content += "</tbody>";
    content += "</table >";
    content += "</div>";
  }
  return content;
}

let content = getDatesBetween("2021/01/01", "2022/01/01");

document.getElementById("calendar").innerHTML = content;