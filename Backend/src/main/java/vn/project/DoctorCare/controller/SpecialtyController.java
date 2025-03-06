package vn.project.DoctorCare.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.project.DoctorCare.domain.Specialty;
import vn.project.DoctorCare.domain.response.ResSpecialtiesByIdDTO;
import vn.project.DoctorCare.service.SpecialtyService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/v1")
public class SpecialtyController {

    private final SpecialtyService specialtyService;

    public SpecialtyController(SpecialtyService specialtyService) {
        this.specialtyService = specialtyService;
    }

    @GetMapping("/specialties")
    public ResponseEntity<List<Specialty>> getAllSpecialty() {

        List<Specialty> specialties = this.specialtyService.fetchAllSpecialty();
        return ResponseEntity.status(HttpStatus.OK).body(specialties);
    }

    @PostMapping("/specialties")
    public ResponseEntity<Specialty> addSpecialty(@RequestBody Specialty reqSpecialty) {
        Specialty specialty = this.specialtyService.handleAddSpecialty(reqSpecialty);

        return ResponseEntity.status(HttpStatus.CREATED).body(specialty);
    }

    @GetMapping("/get-specialties-by-id")
    public ResponseEntity<ResSpecialtiesByIdDTO> findSpecialtyById(
            @RequestParam("id") long id,
            @RequestParam("location") String location) {

        ResSpecialtiesByIdDTO resSpecialtiesByIdDTO = this.specialtyService.fetchSpecialtyById(id, location);
        return ResponseEntity.status(HttpStatus.OK).body(resSpecialtiesByIdDTO);
    }

}
