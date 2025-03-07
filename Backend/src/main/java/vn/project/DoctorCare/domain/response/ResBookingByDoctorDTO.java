package vn.project.DoctorCare.domain.response;

import java.time.Instant;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import vn.project.DoctorCare.domain.AllCode;
import vn.project.DoctorCare.domain.Booking;
import vn.project.DoctorCare.domain.DoctorInfo;
import vn.project.DoctorCare.domain.Markdown;
import vn.project.DoctorCare.domain.Schedule;

public class ResBookingByDoctorDTO {

    private long id;

    private String statusId;
    private long doctorId;
    private long patientId;
    private String date;
    private String timeType;
    private String token;
    private AllCode timeTypeDataPatient;
    private UserDTO patient;

    public static class UserDTO {
        private String firstName;

        private String lastName;

        private String email;

        private String gender;

        private String address;

        private String positionId;

        private AllCode positionData;

        private AllCode genderData;

        public UserDTO(String firstName, String lastName, String email, String gender, String address,
                String positionId, AllCode positionData, AllCode genderData) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.gender = gender;
            this.address = address;
            this.positionId = positionId;
            this.positionData = positionData;
            this.genderData = genderData;
        }

        public String getFirstName() {
            return firstName;
        }

        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }

        public String getLastName() {
            return lastName;
        }

        public void setLastName(String lastName) {
            this.lastName = lastName;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getGender() {
            return gender;
        }

        public void setGender(String gender) {
            this.gender = gender;
        }

        public String getAddress() {
            return address;
        }

        public void setAddress(String address) {
            this.address = address;
        }

        public String getPositionId() {
            return positionId;
        }

        public void setPositionId(String positionId) {
            this.positionId = positionId;
        }

        public AllCode getPositionData() {
            return positionData;
        }

        public void setPositionData(AllCode positionData) {
            this.positionData = positionData;
        }

        public AllCode getGenderData() {
            return genderData;
        }

        public void setGenderData(AllCode genderData) {
            this.genderData = genderData;
        }
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getStatusId() {
        return statusId;
    }

    public void setStatusId(String statusId) {
        this.statusId = statusId;
    }

    public long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(long doctorId) {
        this.doctorId = doctorId;
    }

    public long getPatientId() {
        return patientId;
    }

    public void setPatientId(long patientId) {
        this.patientId = patientId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getTimeType() {
        return timeType;
    }

    public UserDTO getPatient() {
        return patient;
    }

    public void setPatient(UserDTO patient) {
        this.patient = patient;
    }

    public void setTimeType(String timeType) {
        this.timeType = timeType;
    }

    public AllCode getTimeTypeDataPatient() {
        return timeTypeDataPatient;
    }

    public void setTimeTypeDataPatient(AllCode timeTypeDataPatient) {
        this.timeTypeDataPatient = timeTypeDataPatient;
    }

}
