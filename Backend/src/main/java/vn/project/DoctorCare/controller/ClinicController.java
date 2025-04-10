package vn.project.DoctorCare.controller;

import com.turkraft.springfilter.boot.Filter;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.*;

import vn.project.DoctorCare.domain.Clinic;
import vn.project.DoctorCare.domain.User;
import vn.project.DoctorCare.domain.response.ResClinicByIdDTO;
import vn.project.DoctorCare.domain.response.ResultPaginationDTO;
import vn.project.DoctorCare.service.ClinicService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/v1")
public class ClinicController {

    private final ClinicService clinicService;

    public ClinicController(ClinicService clinicService) {
        this.clinicService = clinicService;
    }

    @GetMapping("/clinics")
    public ResponseEntity<ResultPaginationDTO> findAllClinic(
            @Filter Specification<Clinic> spec,
            Pageable pageable
    ) {
        ResultPaginationDTO clinics = this.clinicService.fetchAllClinic(spec,pageable);
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

    @PutMapping("/clinics")
    public ResponseEntity<Clinic> updateClinic(@RequestBody Clinic reqClinic) {

        Clinic clinic = this.clinicService.handleUpdateClinic(reqClinic);
        return ResponseEntity.status(HttpStatus.OK).body(clinic);
    }

    @DeleteMapping("/clinics")
    public ResponseEntity<Void> deleteClinic(@RequestParam("id") long id) {

        this.clinicService.HandleDeleteClinic(id);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

}
