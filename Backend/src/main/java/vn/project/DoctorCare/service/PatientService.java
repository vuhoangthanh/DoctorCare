package vn.project.DoctorCare.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import vn.project.DoctorCare.domain.User;
import vn.project.DoctorCare.domain.request.ReqPatientBookingDTO;
import vn.project.DoctorCare.repository.PatientRepository;
import vn.project.DoctorCare.util.constant.Constant;

@Service
public class PatientService {

    private final PatientRepository patientRepository;
    private final BookingService bookingService;
    private final EmailService emailService;

    public PatientService(PatientRepository patientRepository, BookingService bookingService,
            EmailService emailService) {
        this.patientRepository = patientRepository;
        this.bookingService = bookingService;
        this.emailService = emailService;
    }

    // public User fetchPatientById(long id) {
    // Optional<User> currentPatient = this.patientRepository.findById(id);
    // if (currentPatient.isPresent()) {
    // return currentPatient.get();
    // }
    // return null;
    // }

    public User handleFindOrAddPatient(User reqPatient, ReqPatientBookingDTO reqPatientBookingDTO) {
        Optional<User> currentPatient = this.patientRepository.findByEmail(reqPatient.getEmail());

        String name = "ThanhTjd";
        String time = "9:00 - 10:00";
        String doctorName = "Tề Tĩnh Xuân";
        String address = "Ly Châu Động Thiên";
        String redirectLink = "#";
        if (currentPatient.isPresent()) {
            try {
                emailService.sendSimpleMessage(currentPatient.get().getEmail(), name, time, doctorName, address,
                        redirectLink);
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            return currentPatient.get();
        }

        reqPatient.setRoleId(Constant.ROLE_ID_PATIENT);
        // reqPatient.setPassword(Constant.PASSWORD_DEFAULT);
        reqPatient.setFirstName(Constant.FIRST_NAME_DEFAULT);

        User patient = this.patientRepository.save(reqPatient);

        // handle add booking
        reqPatientBookingDTO.setPatientId(patient.getId());
        this.bookingService.handleAddBooking(reqPatientBookingDTO);

        try {
            emailService.sendSimpleMessage(reqPatient.getEmail(), name, time, doctorName, address, redirectLink);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return patient;
    }
}
