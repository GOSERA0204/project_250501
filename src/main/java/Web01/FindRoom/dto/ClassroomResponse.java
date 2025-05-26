//리스트 뷰에 필요한 정보만 유지(간략 정보)
package Web01.FindRoom.dto;

public class ClassroomResponse {
    private Long classId;
    private String building;
    private int floor;
    private String name;
    private int capacity;
    private String availableTime;

    // 생성자
    public ClassroomResponse(Long classId, String building, int floor, String name, int capacity, String availableTime) {
        this.classId = classId;
        this.building = building;
        this.floor = floor;
        this.name = name;
        this.capacity = capacity;
        this.availableTime = availableTime;
    }

    // getter / setter
    public Long getClassId() { return classId; }
    public void setClassId(Long classId) { this.classId = classId; }

    public String getBuilding() { return building; }
    public void setBuilding(String building) { this.building = building; }

    public int getFloor() { return floor; }
    public void setFloor(int floor) { this.floor = floor; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getCapacity() { return capacity; }
    public void setCapacity(int capacity) { this.capacity = capacity; }

    public String getAvailableTime() { return availableTime; }
    public void setAvailableTime(String availableTime) { this.availableTime = availableTime; }
}