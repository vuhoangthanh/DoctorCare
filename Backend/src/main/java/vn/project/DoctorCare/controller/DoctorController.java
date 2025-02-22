package vn.project.DoctorCare.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.project.DoctorCare.domain.User;
import vn.project.DoctorCare.domain.response.ResTopDoctorsDTO;
import vn.project.DoctorCare.service.DoctorService;
import vn.project.DoctorCare.util.annotation.ApiMessage;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/v1")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @GetMapping("/top-doctors")
    @ApiMessage("get top doctors")
    public ResponseEntity<List<ResTopDoctorsDTO>> getTopDoctors(
            @RequestParam(value = "limit", defaultValue = "6") int limit) {

        List<ResTopDoctorsDTO> doctors = this.doctorService.fetchTopDoctors(limit);
        return ResponseEntity.status(HttpStatus.OK).body(doctors);
    }

}
