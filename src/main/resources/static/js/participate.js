document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("searchBtn").addEventListener("click", function () {
        const dateInput = document.getElementById("date").value;
        const building = document.getElementById("facility").value;

        if (!dateInput || !building) {
            alert("날짜와 시설을 모두 선택해 주세요.");
            return;
        }

        const selectedDate = new Date(dateInput);
        const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][selectedDate.getDay()];
        const now = new Date();
        const currentHour = String(now.getHours()).padStart(2, "0") + ":00";

        const apiUrl = `/api/lectureroom/search?building=${building}&weekday=${weekday}&time=${currentHour}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log("📦 응답 데이터:", data);

                // ✅ 응답이 배열인지 확인
                const rooms = Array.isArray(data) ? data : data.classroomList || data.result || [];

                if (!Array.isArray(rooms)) {
                    throw new Error("응답 형식이 잘못되었습니다. 배열이 아닙니다.");
                }

                const tbody = document.querySelector("#resultTable tbody");
                tbody.innerHTML = "";

                rooms.forEach(room => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                                <td>${room.building}</td>
                                <td>${room.floor}</td>
                                <td>${room.name}</td>
                                <td>${room.capacity}</td>
                                <td>${room.availableTime}</td>
                            `;

                    // 팝업 이벤트 연결 (더미 시간표 사용)
                    tr.addEventListener("click", function () {
                        document.getElementById("popup-roomName").textContent = room.name;
                        document.getElementById("popup-building").textContent = room.building;
                        document.getElementById("popup-floor").textContent = room.floor + "층";
                        document.getElementById("popup-capacity").textContent = room.capacity + "명";
                        document.getElementById("popup-time").textContent = room.availableTime;

                        const testSchedule = [
                            { weekday: "MON", startTime: "09:00", endTime: "12:00", subject: "정보보호론" },
                            { weekday: "TUE", startTime: "13:00", endTime: "15:00", subject: "데이터베이스" },
                            { weekday: "WED", startTime: "10:00", endTime: "11:00", subject: "운영체제" },
                            { weekday: "FRI", startTime: "16:00", endTime: "18:00", subject: "AI개론" }
                        ];
                        renderTimetable(testSchedule);
                        openPopup("room-popup");
                    });

                    tbody.appendChild(tr);
                });
            })
            .catch(error => {
                console.error("강의실 검색 실패:", error);
                alert("검색 중 오류가 발생했습니다.");
            });
    });
});

// 팝업 열기 함수
function openPopup(id) {
    document.getElementById(id).style.display = "flex";
}

// 팝업 닫기 함수
function closePopup(id) {
    document.getElementById(id).style.display = "none";
}

// 시간표 함수
function renderTimetable(scheduleList) {
  const timetableGrid = document.getElementById("timetable-grid");
  timetableGrid.innerHTML = "";

  const hours = Array.from({ length: 13 }, (_, i) => i + 9); // 9~21시
  const dayIndexMap = {
    "MON": 1, "TUE": 2, "WED": 3, "THU": 4,
    "FRI": 5, "SAT": 6, "SUN": 7
  };

   // 줄 단위로 시간 + 요일 칸 생성
    for (let i = 0; i < hours.length; i++) {
      // 시간 레이블 (가장 왼쪽)
      const timeCell = document.createElement("div");
      timeCell.className = "timetable-cell timetable-time";
      timeCell.textContent = `${hours[i]}시`;
      timetableGrid.appendChild(timeCell);

      // 요일 셀 (7개)
      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("div");
        cell.className = "timetable-cell";
        timetableGrid.appendChild(cell);
      }
    }

  // 수업 데이터 렌더링
  scheduleList.forEach(schedule => {
    const col = dayIndexMap[schedule.weekday]; // 요일 위치
    const startHour = parseInt(schedule.startTime.split(":")[0]);
    const endHour = parseInt(schedule.endTime.split(":")[0]);

    for (let h = startHour; h < endHour; h++) {
      const row = h - 9;
      const cellIndex = row * 8 + col; // row * 전체열수 + col
      const cell = timetableGrid.children[cellIndex];
      cell.style.backgroundColor = "#d1e7ff";
      cell.textContent = schedule.course_id || "수업";
    }
  });
}

//실행여부 체크데이터임(삭제해야함!!!!!)
document.addEventListener("DOMContentLoaded", function () {
   const exampleSchedule = [
     { weekday: "MON", startTime: "09:00", endTime: "11:00", course_id: "자료구조" },
     { weekday: "TUE", startTime: "14:00", endTime: "15:00", course_id: "운영체제" },
     { weekday: "FRI", startTime: "10:00", endTime: "13:00", course_id: "알고리즘" }
   ];

   console.log("🟢 예시 시간표 렌더링 실행"); // 확인용
   renderTimetable(exampleSchedule);
 });



//----------------------participate-popup------

function switchToParticipatePopup() {
    closePopup('room-popup');

    // 강의실명과 건물명은 각각 span에서 가져와야 함
    document.getElementById("participate-building").textContent =
        document.getElementById("popup-building").textContent;

    document.getElementById("participate-roomName").textContent =
        document.getElementById("popup-lecture").textContent;

    openPopup("participate-popup");
}
function submitParticipation() {

    // participate-popup 열기
    const popup = document.getElementById('participate-popup');
    popup.style.display = 'flex'; // 여기서만 flex 적용
    const building = document.getElementById("participate-building").textContent;
    const roomName = document.getElementById("participate-roomName").textContent;
    const time = document.getElementById("participate-time").value;
    const count = document.getElementById("participate-count").value;

    const selectedTags = Array.from(document.querySelectorAll("#hashtags input:checked")).map(cb => cb.value);

    if (!time) {
        alert("참여 시간을 선택해주세요.");
        return;
    }

    console.log("📤 참여 정보 제출:", {
        building, roomName, time, count, selectedTags
    });

    alert("참여가 제출되었습니다!");

    closePopup("participate-popup");
}

function closePopup(id) {
    const popup = document.getElementById(id);
    if (popup) popup.style.display = 'none';
}



