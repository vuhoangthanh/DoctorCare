package vn.project.DoctorCare.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.project.DoctorCare.domain.Schedule;
import vn.project.DoctorCare.domain.response.ResScheduleByDocIdAndDateDTO;
import vn.project.DoctorCare.domain.response.ResScheduleDTO;
import vn.project.DoctorCare.service.ScheduleService;
import vn.project.DoctorCare.util.annotation.ApiMessage;

import java.time.Instant;
import java.util.Date;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/v1")
public class ScheduleController {

    private final ScheduleService scheduleService;

    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @PostMapping("/schedules")
    @ApiMessage("add schedule")
    public ResponseEntity<List<Schedule>> addSchedule(@RequestBody ResScheduleDTO resScheduleDTO) {

        // long datedate = resScheduleDTO.getDate();

        // Instant date = Instant.ofEpochMilli(dateTimeStamp);
        // Date date = new Date(dateTimeStamp);

        String date = "" + resScheduleDTO.getDate();

        List<Schedule> listSchedules = this.scheduleService.handleAddSchedule(
                resScheduleDTO.getArrSchedule(),
                resScheduleDTO.getDoctorId(),
                date);
        return ResponseEntity.status(HttpStatus.CREATED).body(listSchedules);
    }

    @GetMapping("/schedules")
    @ApiMessage("fetch by doctorId and date")
    public ResponseEntity<List<ResScheduleByDocIdAndDateDTO>> getScheduleByDoctorIdAndDate(
            @RequestParam(name = "doctorId") long doctorId,
            @RequestParam(name = "date") String date) {

        List<ResScheduleByDocIdAndDateDTO> schedules = this.scheduleService.fetchByDoctorIdAndDate(doctorId, date);
        return ResponseEntity.status(HttpStatus.OK).body(schedules);
    }

    @GetMapping("/all-schedules")
    @ApiMessage("fetch all schedule")
    public List<Schedule> getAllSchedule() {
        return this.scheduleService.fetchAllSchedule();
    }

}
