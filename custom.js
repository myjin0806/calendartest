/* 현재 월, 연도 초기화 */
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth() + 1;

/* 달력 만들기 createCalendar */
function createCalendar(year, month){
  const today = new Date();
  const firstDay = new Date(year, month -1 ,1);
  const lastDay = new Date(year, month, 0);
  let html = "<tr>";

  //달력의 위에 현재 연도, 월 표시
  document.getElementById('currentMonth').innerHTML = `${year}<em>년</em> ${month}<em>월</em>`

  //첫 주 빈칸 채우기
  for (let i = 0; i < firstDay.getDay(); i++){
    html += "<td></td>";
  }
  //날짜 채우기
  for(let day = 1; day <=lastDay.getDate(); day++){
    const currentDay = new Date(year, month - 1, day).getDay();
    const isToday = today.getFullYear() === year&&(today.getMonth() + 1 ) === month && today.getDate() === day;
    html += `<td class="${isToday ? 'today' : ''}" onclick="selectDate(${year}, ${month}, ${day})">${day}</td>`;
    if (currentDay === 6) {html += "</tr><tr>"}
  }
  
  //마지막 주 빈칸 채우기
  const lastDayOfWeek = lastDay.getDay();
  for(let i = lastDayOfWeek + 1; i <=6; i++){
    html += "<td></td>"
  }
  html += "</tr>";
  document.getElementById("calendarBody").innerHTML = html;

  
}

function changeMonth(offset){
  currentMonth += offset;
  if(currentMonth>12){
    currentMonth = 1;
    currentYear++;
  }else if(currentMonth < 1){
    currentMonth =12;
    currentYear--;
  }
  createCalendar(currentYear,currentMonth);
}

createCalendar(currentYear, currentMonth);

let selectedDate = null; // 선택된 날짜를 저장할 변수

// 날짜 선택 함수
function selectDate(year, month, day) {
  selectedDate = new Date(year, month - 1, day);
  createCalendar(currentYear, currentMonth);
  updateSelectedDate();
}

// 선택된 날짜 업데이트 함수
function updateSelectedDate() {
  const selectedDateElement = document.querySelector(".clickedDate");
  if (selectedDate) {
    selectedDateElement.textContent = `${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`;
  }
}