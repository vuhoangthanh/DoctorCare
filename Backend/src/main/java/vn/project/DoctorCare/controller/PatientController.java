package vn.project.DoctorCare.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import vn.project.DoctorCare.domain.DoctorInfo;
import vn.project.DoctorCare.domain.Markdown;
import vn.project.DoctorCare.domain.User;
import vn.project.DoctorCare.domain.request.ReqPatientBookingDTO;
import vn.project.DoctorCare.service.PatientService;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @PostMapping("/patient-book-appointment")
    public ResponseEntity<User> findOrAddPatient(@RequestBody Map<String, Object> reqData) {

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false); // Bỏ qua các thuộc tính không xác
                                                                                    // định

        User patient = mapper.convertValue(reqData, User.class);
        ReqPatientBookingDTO reqPatientBookingDTO = mapper.convertValue(reqData, ReqPatientBookingDTO.class);

        User resPatient = this.patientService.handleFindOrAddPatient(patient, reqPatientBookingDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(resPatient);
    }

}
