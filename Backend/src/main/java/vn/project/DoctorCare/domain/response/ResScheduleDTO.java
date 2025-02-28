package vn.project.DoctorCare.domain.response;

import java.time.Instant;
import java.util.List;

import vn.project.DoctorCare.domain.Schedule;

public class ResScheduleDTO {
    private Long doctorId;
    private Instant date;
    private List<Schedule> schedules;

    // Getters và Setters
    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Long date) {
        this.date = Instant.ofEpochMilli(date);
    }

    public List<Schedule> getSchedules() {
        return schedules;
    }

    public void setSchedules(List<Schedule> schedules) {
        this.schedules = schedules;
    }

}
