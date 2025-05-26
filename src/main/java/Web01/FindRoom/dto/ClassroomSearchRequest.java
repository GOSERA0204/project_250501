//검색 조건(날짜, 건물)
package Web01.FindRoom.dto;

public class ClassroomSearchRequest {
    private String date;
    private String building;

    // 생성자
    public ClassroomSearchRequest(String date, String building) {
        this.date = date;
        this.building = building;
    }

    // getter / setter
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getBuilding() { return building; }
    public void setBuilding(String building) { this.building = building; }
}