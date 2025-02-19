package vn.project.DoctorCare.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import vn.project.DoctorCare.domain.AllCode;
import vn.project.DoctorCare.service.AllCodeService;
import vn.project.DoctorCare.util.annotation.ApiMessage;
import vn.project.DoctorCare.util.error.IdInvalidException;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1")
public class AllCodeController {

    private final AllCodeService allCodeService;

    public AllCodeController(AllCodeService allCodeService) {
        this.allCodeService = allCodeService;
    }

    @GetMapping("/allcodes")
    @ApiMessage("fetch allCode by type")
    public ResponseEntity<?> getAllCode(@RequestParam(name = "type") String type) throws IdInvalidException {
        // Kiểm tra nếu request body rỗng
        if (type == null || type.trim().isEmpty()) {
            throw new IdInvalidException("need type to fetch allcode");
        }

        List<AllCode> allCode = this.allCodeService.fetchAllCodeByType(type);
        return ResponseEntity.status(HttpStatus.OK).body(allCode);
    }
}
