//템플릿 호출만 하면됨.
package Web01.FindRoom.restful;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class participatePageController {
    @GetMapping("/participate")
    public String participatePage(){
        return "pages/participate"; //기존 강의실 목록 페이지
    }

    @GetMapping("/content_detail")
    public String contentDetailPage() {
        return "product/content_detail"; // 상세 참여 페이지 이동
    }
}

