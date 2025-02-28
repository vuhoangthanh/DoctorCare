package vn.project.DoctorCare.service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import vn.project.DoctorCare.domain.Schedule;
import vn.project.DoctorCare.repository.ScheduleRepository;

@Service
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;

    public ScheduleService(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    public List<Schedule> handleAddSchedule(List<Schedule> schedules, long doctorId, Instant date) {

        List<Schedule> listSchedule = new ArrayList<Schedule>();
        List<Schedule> existingSchedules = scheduleRepository.findByDateAndDoctorId(date, doctorId);

        for (Schedule schedule : schedules) {

            if (existingSchedules != null) {
                // check timeType exist
                Set<String> existingTimeTypes = existingSchedules.stream()
                        .map(Schedule::getTimeType)
                        .collect(Collectors.toSet());

                if (!existingTimeTypes.contains(schedule.getTimeType())) {
                    this.scheduleRepository.save(schedule);
                    listSchedule.add(schedule);
                }
            } else {
                this.scheduleRepository.save(schedule);
                listSchedule.add(schedule);
            }

        }

        return listSchedule;
    }

}
