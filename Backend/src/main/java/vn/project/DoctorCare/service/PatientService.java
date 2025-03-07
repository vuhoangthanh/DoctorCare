package vn.project.DoctorCare.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
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

    public String buildUrlEmail(long doctorId, String token) {

        String result = Constant.URL_FRONTEND + "/verify-booking?token=" + token + "&doctorId=" + doctorId;

        return result;
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

        String name = reqPatientBookingDTO.getFullName();
        String time = reqPatientBookingDTO.getTimeString();
        String doctorName = reqPatientBookingDTO.getDoctorName();
        String address = reqPatientBookingDTO.getAddress();
        String language = reqPatientBookingDTO.getLanguage();

        String token = UUID.randomUUID().toString();
        String redirectLink = buildUrlEmail(reqPatientBookingDTO.getDoctorId(), token);

        if (currentPatient.isPresent()) {
            if (this.bookingService.findBookingByPatientIdAndDateAndTimeType(currentPatient.get().getId(),
                    reqPatientBookingDTO.getDate(), reqPatientBookingDTO.getTimeType()) == null) {

                // handle add booking
                reqPatientBookingDTO.setPatientId(currentPatient.get().getId());
                reqPatientBookingDTO.setToken(token);
                this.bookingService.handleAddBooking(reqPatientBookingDTO);
                try {
                    emailService.sendSimpleMessage(currentPatient.get().getEmail(), name, time, doctorName, address,
                            redirectLink, language);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                return currentPatient.get();
            }

            return currentPatient.get();
        }

        reqPatient.setRoleId(Constant.ROLE_ID_PATIENT);
        // reqPatient.setPassword(Constant.PASSWORD_DEFAULT);
        reqPatient.setFirstName(Constant.FIRST_NAME_DEFAULT);

        User patient = this.patientRepository.save(reqPatient);

        // handle add booking
        reqPatientBookingDTO.setPatientId(patient.getId());
        reqPatientBookingDTO.setToken(token);
        this.bookingService.handleAddBooking(reqPatientBookingDTO);

        try {
            emailService.sendSimpleMessage(reqPatient.getEmail(), name, time, doctorName, address, redirectLink,
                    language);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return patient;
    }

}
