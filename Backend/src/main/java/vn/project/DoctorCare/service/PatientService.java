package vn.project.DoctorCare.service;

import org.springframework.stereotype.Service;

import vn.project.DoctorCare.domain.User;
import vn.project.DoctorCare.repository.PatientRepository;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    // public User fetchPatientById(long id){
    // O
    // }

    public User handleAddPatient(User patient) {

        return patient;
    }
}
