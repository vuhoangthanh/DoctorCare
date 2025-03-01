package vn.project.DoctorCare.domain.response;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import vn.project.DoctorCare.domain.Schedule;

public class ResScheduleDTO {
    private Long doctorId;

    // @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss")
    // private LocalDateTime date;
    private long date;

    @JsonProperty("arrSchedule")
    private List<Schedule> arrSchedule;

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    // public void setArrSchedule(List<Schedule> arrSchedule) {
    // this.arrSchedule = arrSchedule;
    // }

    // public List<ScheduleDTO> getArrSchedule() {
    // return arrSchedule;
    // }

    // public void setArrSchedule(List<ScheduleDTO> arrSchedule) {
    // this.arrSchedule = arrSchedule;
    // }
    public static class ScheduleDTO {

        // @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss")
        // private long date;

        private long date;

        private String timeType;
        private long doctorId;

        public String getTimeType() {
            return timeType;
        }

        public void setTimeType(String timeType) {
            this.timeType = timeType;
        }

        public long getDoctorId() {
            return doctorId;
        }

        public void setDoctorId(long doctorId) {
            this.doctorId = doctorId;
        }

        public long getDate() {
            return date;
        }

        public void setDate(long date) {
            this.date = date;
        }

    }

    public List<Schedule> getArrSchedule() {
        return arrSchedule;
    }

    public void setArrSchedule(List<Schedule> arrSchedule) {
        this.arrSchedule = arrSchedule;
    }

    public long getDate() {
        return date;
    }

    public void setDate(long date) {
        this.date = date;
    }

}
