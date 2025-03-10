package vn.project.DoctorCare.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.micrometer.core.ipc.http.HttpSender.Response;
import jakarta.validation.Valid;
import vn.project.DoctorCare.domain.AllCode;
import vn.project.DoctorCare.service.AllCodeService;
import vn.project.DoctorCare.util.annotation.ApiMessage;
import vn.project.DoctorCare.util.error.IdInvalidException;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

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

    @PostMapping("/roles")
    @ApiMessage("add role")
    public ResponseEntity<AllCode> postRole(@RequestBody AllCode reqAllCode) throws IdInvalidException {

        if (this.allCodeService.existByKeyMap(reqAllCode.getKeyMap())) {
            throw new IdInvalidException("Role is exist");
        }

        AllCode allCode = this.allCodeService.handleAddRole(reqAllCode);
        return ResponseEntity.status(HttpStatus.CREATED).body(allCode);
    }

    @PutMapping("/roles")
    @ApiMessage("update role")
    public ResponseEntity<AllCode> editRole(@RequestBody AllCode reqAllCode) throws IdInvalidException {
        if (this.allCodeService.fetchRoleByKeyMap(reqAllCode.getKeyMap()) == null) {
            throw new IdInvalidException("Role with keyMap = " + reqAllCode.getKeyMap() + " not exist");
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(this.allCodeService.handleUpdateRole(reqAllCode));
    }

    @DeleteMapping("/roles")
    @ApiMessage("delete role")
    public ResponseEntity<Void> deleteRole(@RequestParam("keyMap") String keyMap) throws IdInvalidException {

        if (this.allCodeService.fetchRoleByKeyMap(keyMap) == null) {
            throw new IdInvalidException("Role với keyMap = " + keyMap + " is not exist");
        }
        this.allCodeService.handleDeleteAllCode(keyMap);
        return ResponseEntity.ok().body(null);
    }

}
