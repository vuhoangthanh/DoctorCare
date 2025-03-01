package vn.project.DoctorCare.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.project.DoctorCare.domain.Schedule;
import vn.project.DoctorCare.domain.response.ResScheduleDTO;
import vn.project.DoctorCare.service.ScheduleService;

import java.time.Instant;
import java.util.Date;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1")
public class ScheduleController {

    private final ScheduleService scheduleService;

    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @PostMapping("/schedules")
    public ResponseEntity<List<Schedule>> addSchedule(@RequestBody ResScheduleDTO resScheduleDTO) {

        // long datedate = resScheduleDTO.getDate();

        // Instant date = Instant.ofEpochMilli(dateTimeStamp);
        // Date date = new Date(dateTimeStamp);

        List<Schedule> listSchedules = this.scheduleService.handleAddSchedule(
                resScheduleDTO.getArrSchedule(),
                resScheduleDTO.getDoctorId(),
                resScheduleDTO.getDate());
        return ResponseEntity.status(HttpStatus.CREATED).body(listSchedules);
    }
}
