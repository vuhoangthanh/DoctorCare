package vn.project.DoctorCare.domain.response.schedule;

import java.time.Instant;

import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import vn.project.DoctorCare.domain.AllCode;

public class ResScheduleDTO {
    private long id;

    private String date;

    private String timeType;
    private long doctorId;

    private Instant createdAt;
    // private TimeDTO timeTypeData;

    // private User doctorData;

    // public static class TimeDTO{
    // private
    // }
}
