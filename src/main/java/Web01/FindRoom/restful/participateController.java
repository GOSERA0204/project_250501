//템플릿 호출만 하면됨.
package Web01.FindRoom.restful;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class participateController {
    @GetMapping("/participate")
    public String showParticipatePage(){
        return "pages/participate"; //강의실 목록 페이지
    }
}

