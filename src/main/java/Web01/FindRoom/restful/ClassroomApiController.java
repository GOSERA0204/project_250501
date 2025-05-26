//search, select api 응답을 dto에 맞게 구성
package Web01.FindRoom.restful;

import Web01.FindRoom.dto.ClassroomResponse;
import Web01.FindRoom.dto.ClassroomSearchRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/classrooms")
public class ClassroomApiController {

    @PostMapping("/search")
    public ResponseEntity<List<ClassroomResponse>> search(@RequestBody ClassroomSearchRequest request) {
        String building = request.getBuilding();
        String date = request.getDate();

        // 현재 시각 기준 시간 계산 (예: 13:00 ~ 14:00)
        LocalTime now = LocalTime.now();
        String startTime = now.format(DateTimeFormatter.ofPattern("HH:00"));
        String endTime = now.plusHours(1).format(DateTimeFormatter.ofPattern("HH:00"));

        // ✅ 여기서는 실제 DB가 없으므로 더미 데이터 생성
        List<ClassroomResponse> result = List.of(
                new ClassroomResponse(101L, building, 1, "101호", 40, startTime + " ~ " + endTime),
                new ClassroomResponse(202L, building, 2, "202호", 50, startTime + " ~ " + endTime)
        );

        return ResponseEntity.ok(result);
    }
}