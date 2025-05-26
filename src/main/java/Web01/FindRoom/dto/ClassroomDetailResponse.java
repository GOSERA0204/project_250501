//강의실 상세 팝업에 필요한 모든 정보를 포함함(건물명, 층수, 이름, 정원, 시간표 등)
package Web01.FindRoom.dto;

import java.util.List;

public class ClassroomDetailResponse {
    private String building;
    private String name;
    private int floor;
    private int capacity;
    private String availableTime;
    private List<LectureScheduleDto> weeklySchedule;

    // 생성자
    public ClassroomDetailResponse(String building, String name, int floor, int capacity,
                                   String availableTime, List<LectureScheduleDto> weeklySchedule) {
        this.building = building;
        this.name = name;
        this.floor = floor;
        this.capacity = capacity;
        this.availableTime = availableTime;
        this.weeklySchedule = weeklySchedule;
    }

    // getter / setter
    public String getBuilding() { return building; }
    public void setBuilding(String building) { this.building = building; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getFloor() { return floor; }
    public void setFloor(int floor) { this.floor = floor; }

    public int getCapacity() { return capacity; }
    public void setCapacity(int capacity) { this.capacity = capacity; }

    public String getAvailableTime() { return availableTime; }
    public void setAvailableTime(String availableTime) { this.availableTime = availableTime; }

    public List<LectureScheduleDto> getWeeklySchedule() { return weeklySchedule; }
    public void setWeeklySchedule(List<LectureScheduleDto> weeklySchedule) { this.weeklySchedule = weeklySchedule; }
}
