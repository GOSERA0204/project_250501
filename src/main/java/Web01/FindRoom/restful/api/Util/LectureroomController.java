package Web01.FindRoom.restful.api.Util;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LectureroomController {
    @GetMapping("/lectureroom")
    public String participatePage(){
        return "pages/lectureroom";
    }

}

