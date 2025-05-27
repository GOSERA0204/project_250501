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
            .then(res => {
                if (!res.success) throw new Error(res.message);
                const rooms = res.data;

                const tbody = document.querySelector("#resultTable tbody");
                tbody.innerHTML = "";

                rooms.forEach(room => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${room.building}</td>
                        <td>${room.floor}</td>
                        <td>${room.room}</td>
                        <td>${room.capacity}</td>
                        <td>${room.availableTime}</td>
                    `;

                    tr.addEventListener("click", function () {
                        fetch(`/api/lectureroom/select?building=${room.building}&classId=${room.classId}`)
                            .then(response => response.json())
                            .then(detailRes => {
                                if (!detailRes.success) throw new Error(detailRes.message);
                                const detail = detailRes.data;

                                document.getElementById("popup-roomName").textContent = detail.room;
                                document.getElementById("popup-building").textContent = detail.building;
                                document.getElementById("popup-floor").textContent = detail.floor + "층";
                                document.getElementById("popup-capacity").textContent = detail.capacity + "명";
                                document.getElementById("popup-time").textContent = detail.availableTime;

                                // 해시태그 렌더링
                                const hashtagContainer = document.getElementById("popup-hashtags");
                                hashtagContainer.innerHTML = ""; // 초기화

                                (detail.top3Hashtags || []).forEach(tag => {
                                    const btn = document.createElement("button");
                                    btn.className = "hashtag-btn";
                                    btn.textContent = `# ${tag}`;
                                    hashtagContainer.appendChild(btn);
                                });

                                renderTimetable(detail.schedule, detail.availableTime, weekday);
                                openPopup("room-popup");
                            });
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

function openPopup(id) {
    document.getElementById(id).style.display = "flex";
}

function closePopup(id) {
    document.getElementById(id).style.display = "none";
}

const columnWidth = 80;
const rowHeight = 50;
const dayIndex = { MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6, SUN: 7 };

function renderTimetable(scheduleList, availableTime, weekday) {
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

    // 강의 시간표 블록
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
        block.textContent = sch.subject || "수업";

        grid.appendChild(block);
    });

    // 참여 가능 시간 블록 (현재 요일에만 표시)
    if (availableTime && dayIndex[weekday]) {
        const [start, end] = availableTime.split(" ~ ");
        const startH = parseInt(start.split(":")[0]);
        const endH = parseInt(end.split(":")[0]);

        const top = (startH - 9) * rowHeight;
        const height = (endH - startH) * rowHeight;
        const left = columnWidth + (dayIndex[weekday] - 1) * columnWidth;

        const block = document.createElement("div");
        block.classList.add("available-block"); // ❗ CSS 따로 스타일 필요
        block.style.top = `${top}px`;
        block.style.left = `${left}px`;
        block.style.height = `${height}px`;
        block.style.width = `${columnWidth}px`;
        block.textContent = "참여 가능";

        grid.appendChild(block);
    }
}