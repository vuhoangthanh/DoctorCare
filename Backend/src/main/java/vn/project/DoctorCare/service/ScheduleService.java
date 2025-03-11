package vn.project.DoctorCare.service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import vn.project.DoctorCare.domain.AllCode;
import vn.project.DoctorCare.domain.Schedule;
import vn.project.DoctorCare.domain.User;
import vn.project.DoctorCare.domain.response.ResScheduleByDocIdAndDateDTO;
import vn.project.DoctorCare.domain.response.ResScheduleByDocIdAndDateDTO.DoctorDataDTO;
import vn.project.DoctorCare.repository.ScheduleRepository;
import vn.project.DoctorCare.util.constant.Constant;

@Service
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;

    public ScheduleService(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    public List<ResScheduleByDocIdAndDateDTO> fetchByDoctorIdAndDate(long doctorId, String date) {

        List<Schedule> schedules = scheduleRepository.findByDateAndDoctorId(date, doctorId);

        List<ResScheduleByDocIdAndDateDTO> result = new ArrayList<ResScheduleByDocIdAndDateDTO>();

        for (Schedule schedule : schedules) {
            ResScheduleByDocIdAndDateDTO resScheduleByDocIdAndDateDTO = new ResScheduleByDocIdAndDateDTO();
            resScheduleByDocIdAndDateDTO.setId(schedule.getId());
            resScheduleByDocIdAndDateDTO.setMaxNumber(schedule.getMaxNumber());
            resScheduleByDocIdAndDateDTO.setDate(schedule.getDate());
            resScheduleByDocIdAndDateDTO.setTimeType(schedule.getTimeType());
            resScheduleByDocIdAndDateDTO.setDoctorId(schedule.getDoctorId());
            resScheduleByDocIdAndDateDTO.setCreatedAt(schedule.getCreatedAt());
            resScheduleByDocIdAndDateDTO.setTimeTypeData(schedule.getTimeTypeData());

            User doctorData = schedule.getDoctorData();
            ResScheduleByDocIdAndDateDTO.DoctorDataDTO doctorDataDTO = new ResScheduleByDocIdAndDateDTO.DoctorDataDTO(
                    doctorData.getFirstName(), doctorData.getLastName());
            resScheduleByDocIdAndDateDTO.setDoctorData(doctorDataDTO);

            result.add(resScheduleByDocIdAndDateDTO);
        }
        return result;
    }

    public List<Schedule> handleAddSchedule(List<Schedule> schedules, long doctorId, String date) {

        List<Schedule> listSchedule = new ArrayList<Schedule>();

        List<Schedule> existingSchedules = scheduleRepository.findByDateAndDoctorId(date, doctorId);

        for (Schedule schedule : schedules) {
            if (existingSchedules.size() != 0) {

                // check timeType exist
                Set<String> existingTimeTypes = existingSchedules.stream()
                        .map(Schedule::getTimeType)
                        .collect(Collectors.toSet());

                if (!existingTimeTypes.contains(schedule.getTimeType())) {

                    schedule.setMaxNumber(Constant.MAX_NUMBER);
                    this.scheduleRepository.save(schedule);
                    listSchedule.add(schedule);
                }
            } else {

                schedule.setMaxNumber(Constant.MAX_NUMBER);
                this.scheduleRepository.save(schedule);
                listSchedule.add(schedule);
            }
        }
        return listSchedule;
    }

    public List<Schedule> fetchAllSchedule() {
        return this.scheduleRepository.findAll();
    }
}
