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
        const endHour = String(now.getHours() + 1).padStart(2, "0") + ":00";

        const apiUrl = `/api/classrooms/search?date=${dateInput}&startTime=${currentHour}&endTime=${endHour}&building=${building}&weekday=${weekday}`;
        fetch(apiUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ date: dateInput, building: building })
                })
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

// 시간표 시각화 함수
const columnWidth = 80;
const rowHeight = 50;

const dayIndex = { MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6, SUN: 7 };

//시간표 블록 렌더링
function renderTimetable(scheduleList) {
    const grid = document.getElementById("timetable-grid");
    grid.innerHTML = "";

    // 격자 생성 (9AM ~ 9PM)
    for (let h = 9; h <= 21; h++) {
        const label = document.createElement("div");
        label.textContent = `${h}:00`;
        label.classList.add("time-label");
        grid.appendChild(label);
        for (let i = 0; i < 7; i++) {
            grid.appendChild(document.createElement("div"));
        }
    }

    // 블록 배치
    scheduleList.forEach(sch => {
        const dayCol = dayIndex[sch.weekday];
        const startH = parseInt(sch.startTime.split(":")[0]);
        const endH = parseInt(sch.endTime.split(":")[0]);

        const top = (startH - 9) * rowHeight;
        const height = (endH - startH) * rowHeight;
        const left = columnWidth + (dayCol - 1) * columnWidth;

        const block = document.createElement("div");
        block.classList.add("timetable-block");
        block.style.top = `${top}px`;
        block.style.left = `${left}px`;
        block.style.height = `${height}px`;
        block.style.width = `${columnWidth}px`;
        block.textContent = sch.subject;

        grid.appendChild(block);
    });
}