package vn.project.DoctorCare.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.project.DoctorCare.domain.Clinic;
import vn.project.DoctorCare.domain.response.ResClinicByIdDTO;
import vn.project.DoctorCare.service.ClinicService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/v1")
public class ClinicController {

    private final ClinicService clinicService;

    public ClinicController(ClinicService clinicService) {
        this.clinicService = clinicService;
    }

    @GetMapping("/clinics")
    public ResponseEntity<List<Clinic>> findAllClinic() {
        List<Clinic> clinics = this.clinicService.fetchAllClinic();
        return ResponseEntity.status(HttpStatus.OK).body(clinics);
    }

    @GetMapping("/clinic-by-id")
    public ResponseEntity<ResClinicByIdDTO> findClinicById(@RequestParam("id") long id) {

        ResClinicByIdDTO resClinicByIdDTO = this.clinicService.fetchClinicById(id);
        return ResponseEntity.status(HttpStatus.OK).body(resClinicByIdDTO);
    }

    @PostMapping("/clinics")
    public ResponseEntity<Clinic> addClinic(@RequestBody Clinic reqClinic) {

        Clinic clinic = this.clinicService.handleAddClinic(reqClinic);

        return ResponseEntity.status(HttpStatus.CREATED).body(clinic);
    }

}
