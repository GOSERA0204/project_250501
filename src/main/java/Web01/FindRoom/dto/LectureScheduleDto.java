//시간표 정보 표현용 DTO(요일, 시작/종료시간, 과목명)
package Web01.FindRoom.dto;

public class LectureScheduleDto {
    private String weekday;
    private String startTime;
    private String endTime;
    private String subject;

    // 생성자
    public LectureScheduleDto(String weekday, String startTime, String endTime, String subject) {
        this.weekday = weekday;
        this.startTime = startTime;
        this.endTime = endTime;
        this.subject = subject;
    }

    // getter / setter
    public String getWeekday() { return weekday; }
    public void setWeekday(String weekday) { this.weekday = weekday; }

    public String getStartTime() { return startTime; }
    public void setStartTime(String startTime) { this.startTime = startTime; }

    public String getEndTime() { return endTime; }
    public void setEndTime(String endTime) { this.endTime = endTime; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }
}