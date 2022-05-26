const DAYS_API = {
  monday: true,
  tuesday: false,
  wednesday: true,
  thursday: false,
  friday: true,
  saturday: false,
  sunday: false,
};
console.log(DAYS_API);

const $calendar = document.querySelector("#calendar");
const ORDER_DAYS = getOrderDays(); // 숫자(0 일요일, 6 토요일)
console.log(ORDER_DAYS);

window.onload = () => {
  // 오늘 날짜
  setOrderDate(new Date());

  // 달력 이벤트
  $calendar.addEventListener("change", onChange);
};

function onChange(event) {
  const date = new Date($calendar.value);
  setOrderDate(date);
}

function getOrderDays() {
  let arr = [];
  for (const [key, value] of Object.entries(DAYS_API)) {
    if (value === true) {
      arr.push(key);
    }
  }
  // console.log(arr);
  arr = arr.map((day) => {
    switch (day) {
      case "sunday":
        return 0;
      case "monday":
        return 1;
      case "tuesday":
        return 2;
      case "wednesday":
        return 3;
      case "thursday":
        return 4;
      case "friday":
        return 5;
      case "saturday":
        return 6;
    }
  });
  // console.log(arr);
  return arr;
}

function setOrderDate(date) {
  console.log("확인 날짜: ", date.toLocaleDateString());
  const day = date.getDay();
  if (ORDER_DAYS.includes(day)) {
    setDate(date);
    console.log("* 주문 가능 날짜: ", date.toLocaleDateString(), day);
  } else {
    const nextDate = new Date(date.setDate(date.getDate() + 1));
    const days = nextDate.getDay();
    setOrderDate(nextDate);
  }
}
function setDate(date) {
  $calendar.value = date.toISOString().substring(0, 10);
}
