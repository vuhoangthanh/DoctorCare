package vn.project.DoctorCare.service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import vn.project.DoctorCare.domain.AllCode;
import vn.project.DoctorCare.domain.Booking;
import vn.project.DoctorCare.domain.Statistic;
import vn.project.DoctorCare.domain.User;
import vn.project.DoctorCare.domain.request.ReqBookingRemedyDTO;
import vn.project.DoctorCare.domain.request.ReqEmailRemedyDTO;
import vn.project.DoctorCare.domain.request.ReqPatientBookingDTO;
import vn.project.DoctorCare.domain.response.ResBookingByDoctorDTO;
import vn.project.DoctorCare.domain.response.ResBookingDTO;
import vn.project.DoctorCare.domain.response.ResDoctorDetailDTO;
import vn.project.DoctorCare.repository.BookingRepository;
import vn.project.DoctorCare.util.constant.Constant;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final EmailService emailService;
    private final StatisticService statisticService;
    private final DoctorService doctorService;

    public BookingService(BookingRepository bookingRepository, EmailService emailService, StatisticService statisticService, DoctorService doctorService) {
        this.bookingRepository = bookingRepository;
        this.emailService = emailService;
        this.statisticService = statisticService;
        this.doctorService = doctorService;
    }

    public Booking handleAddBooking(ReqPatientBookingDTO reqPatientBookingDTO) {

//        Optional<Booking> currentBooking = this.bookingRepository.findById(reqPatientBookingDTO.getPatientId());
//        if (currentBooking.isPresent()) {
//            return currentBooking.get();
//        }

        Booking reqBooking = new Booking();
        reqBooking.setStatusId(Constant.STATUS_NEW);
        reqBooking.setDoctorId(reqPatientBookingDTO.getDoctorId());
        reqBooking.setPatientId(reqPatientBookingDTO.getPatientId());
        reqBooking.setDate(reqPatientBookingDTO.getDate());
        reqBooking.setTimeType(reqPatientBookingDTO.getTimeType());
        reqBooking.setToken(reqPatientBookingDTO.getToken());

        Booking booking = this.bookingRepository.save(reqBooking);

        return booking;
    }

    public ResBookingByDoctorDTO findBookingByPatientIdAndDateAndTimeType(long patientId, String date,
            String timeType) {
        Optional<Booking> booking = this.bookingRepository.findByPatientIdAndDateAndTimeType(patientId, date, timeType);

        if (booking.isPresent()) {
            ResBookingByDoctorDTO resPatientFromBookingDTO = new ResBookingByDoctorDTO();

            resPatientFromBookingDTO.setId(booking.get().getId());
            resPatientFromBookingDTO.setStatusId(booking.get().getStatusId());
            resPatientFromBookingDTO.setDoctorId(booking.get().getDoctorId());
            resPatientFromBookingDTO.setPatientId(booking.get().getPatientId());
            resPatientFromBookingDTO.setDate(booking.get().getDate());
            resPatientFromBookingDTO.setTimeType(booking.get().getTimeType());
            resPatientFromBookingDTO.setToken(booking.get().getToken());
            resPatientFromBookingDTO.setTimeTypeDataPatient(booking.get().getTimeTypeDataPatient());

            if (booking.get().getPatientData() != null) {
                User currentPatient = booking.get().getPatientData();
                ResBookingByDoctorDTO.UserDTO patient = new ResBookingByDoctorDTO.UserDTO(currentPatient.getFirstName(),
                        currentPatient.getLastName(),
                        currentPatient.getEmail(),
                        currentPatient.getGender(),
                        currentPatient.getAddress(),
                        currentPatient.getPositionId(),
                        currentPatient.getPositionData(),
                        currentPatient.getGenderData());
                resPatientFromBookingDTO.setPatient(patient);
            }
            return resPatientFromBookingDTO;
        }
        return null;
    }

    public Booking handleVerifyBooking(String token, long doctorId) {

        Optional<Booking> booking = this.bookingRepository.findByDoctorIdAndTokenAndStatusId(doctorId, token,
                Constant.STATUS_NEW);

        if (booking.isPresent()) {
            booking.get().setStatusId(Constant.STATUS_CONFIRMED);
            Booking resBooking = booking.get();

            Statistic statistic = this.statisticService.fetchStatisticByDate(booking.get().getDate());

            if(statistic != null){
                statistic.setTotalBookings(statistic.getTotalBookings() + 1);
                this.statisticService.handleUpdateStatistic(statistic);
            }else{
                Statistic newStatistic = new Statistic();
                newStatistic.setDate(booking.get().getDate());
                newStatistic.setTotalBookings(1);
                this.statisticService.handleAddStatistic(newStatistic);
            }

            return this.bookingRepository.save(resBooking);
        }

        return null;
    }

    public List<ResBookingByDoctorDTO> fetchBookingByDoctorAndDateAndStatusId(long doctorId, String date) {

        List<Optional<Booking>> bookings = this.bookingRepository.findByDoctorIdAndDateAndStatusId(doctorId, date,
                Constant.STATUS_CONFIRMED);

        List<ResBookingByDoctorDTO> result = new ArrayList<ResBookingByDoctorDTO>();

        for (Optional<Booking> booking : bookings) {
            if (booking.isPresent()) {
                ResBookingByDoctorDTO resPatientFromBookingDTO = new ResBookingByDoctorDTO();

                resPatientFromBookingDTO.setId(booking.get().getId());
                resPatientFromBookingDTO.setStatusId(booking.get().getStatusId());
                resPatientFromBookingDTO.setDoctorId(booking.get().getDoctorId());
                resPatientFromBookingDTO.setPatientId(booking.get().getPatientId());
                resPatientFromBookingDTO.setDate(booking.get().getDate());
                resPatientFromBookingDTO.setTimeType(booking.get().getTimeType());
                resPatientFromBookingDTO.setToken(booking.get().getToken());
                resPatientFromBookingDTO.setTimeTypeDataPatient(booking.get().getTimeTypeDataPatient());

                if (booking.get().getPatientData() != null) {
                    User currentPatient = booking.get().getPatientData();
                    ResBookingByDoctorDTO.UserDTO patient = new ResBookingByDoctorDTO.UserDTO(
                            currentPatient.getFirstName(),
                            currentPatient.getLastName(),
                            currentPatient.getEmail(),
                            currentPatient.getGender(),
                            currentPatient.getAddress(),
                            currentPatient.getPositionId(),
                            currentPatient.getPositionData(),
                            currentPatient.getGenderData());
                    resPatientFromBookingDTO.setPatient(patient);
                }
                result.add(resPatientFromBookingDTO);
            }
        }
        return result;
    }

    public List<ResBookingByDoctorDTO> fetchBookingByDateAndStatusId(String date) {

        List<Optional<Booking>> bookings = this.bookingRepository.findByDateAndStatusId(date, Constant.STATUS_CONFIRMED);

        List<ResBookingByDoctorDTO> result = new ArrayList<ResBookingByDoctorDTO>();

        for (Optional<Booking> booking : bookings) {
            if (booking.isPresent()) {
                ResBookingByDoctorDTO resPatientFromBookingDTO = new ResBookingByDoctorDTO();

                resPatientFromBookingDTO.setId(booking.get().getId());
                resPatientFromBookingDTO.setStatusId(booking.get().getStatusId());
                resPatientFromBookingDTO.setDoctorId(booking.get().getDoctorId());
                resPatientFromBookingDTO.setPatientId(booking.get().getPatientId());
                resPatientFromBookingDTO.setDate(booking.get().getDate());
                resPatientFromBookingDTO.setTimeType(booking.get().getTimeType());
                resPatientFromBookingDTO.setToken(booking.get().getToken());
                resPatientFromBookingDTO.setTimeTypeDataPatient(booking.get().getTimeTypeDataPatient());

                if (booking.get().getPatientData() != null) {
                    User currentPatient = booking.get().getPatientData();
                    ResBookingByDoctorDTO.UserDTO patient = new ResBookingByDoctorDTO.UserDTO(
                            currentPatient.getFirstName(),
                            currentPatient.getLastName(),
                            currentPatient.getEmail(),
                            currentPatient.getGender(),
                            currentPatient.getAddress(),
                            currentPatient.getPositionId(),
                            currentPatient.getPositionData(),
                            currentPatient.getGenderData());
                    resPatientFromBookingDTO.setPatient(patient);
                }
                result.add(resPatientFromBookingDTO);
            }
        }
        return result;
    }



    public Booking fetchBookingForRemedy(long doctorId, long patientId, String timeType,String date) {
        Optional<Booking> booking = this.bookingRepository.findByDoctorIdAndPatientIdAndTimeTypeAndStatusIdAndDate(doctorId,
                patientId, timeType, Constant.STATUS_CONFIRMED, date);
        if (booking.isPresent()) {

            return booking.get();
        }
        return null;
    }

    public ResBookingDTO handleUpdateDoneBooking(ReqBookingRemedyDTO reqBookingRemedyDTO,
            ReqEmailRemedyDTO reqEmailRemedyDTO) {
        Booking booking = this.fetchBookingForRemedy(reqBookingRemedyDTO.getDoctorId(),
                reqBookingRemedyDTO.getPatientId(), reqBookingRemedyDTO.getTimeType(), reqBookingRemedyDTO.getDate());

        if (booking != null) {

            booking.setStatusId(Constant.STATUS_DONE);
            Booking currentBooking = this.bookingRepository.save(booking);

            ResBookingDTO resBookingDTO = new ResBookingDTO(currentBooking.getId(), currentBooking.getStatusId(),
                    currentBooking.getDoctorId(), currentBooking.getPatientId(), currentBooking.getDate(),
                    currentBooking.getTimeType(),
                    currentBooking.getToken(), currentBooking.getCreatedAt(), currentBooking.getUpdatedAt(),
                    currentBooking.getCreatedBy(), currentBooking.getUpdatedBy());

            Statistic statistic = this.statisticService.fetchStatisticByDate(booking.getDate());
            if(statistic != null){
                ResDoctorDetailDTO resDoctorDetailDTO = this.doctorService.fetchDetailDoctorById(booking.getDoctorId());

                statistic.setRevenueVi(statistic.getRevenueVi() + Double.parseDouble(resDoctorDetailDTO.getDoctorInfo().getPriceTypeData().getValueVi()));
                statistic.setRevenueEn(statistic.getRevenueEn() + Double.parseDouble(resDoctorDetailDTO.getDoctorInfo().getPriceTypeData().getValueEn()));
                statistic.setCompletedBookings(statistic.getCompletedBookings() + 1);
                this.statisticService.handleUpdateStatistic(statistic);
            }else{
                Statistic newStatistic = new Statistic();
                newStatistic.setCompletedBookings(1);
                newStatistic.setDate(booking.getDate());

                this.statisticService.handleAddStatistic(newStatistic);
            }

            try {
                this.emailService.sendRemedyMessage(reqEmailRemedyDTO.getEmail(), reqEmailRemedyDTO.getImgBase64(),
                        reqEmailRemedyDTO.getLanguage(),
                        reqEmailRemedyDTO.getPatientId());
            } catch (Exception e) {
                e.printStackTrace();
            }
            return resBookingDTO;
        }
        return null;
    }

    public void handleDeleteBooking(long id){
        Booking booking = this.bookingRepository.findById(id).get();
        Statistic statistic = this.statisticService.fetchStatisticByDate(booking.getDate());
        if(statistic != null){
            statistic.setCancelledBookings(statistic.getCancelledBookings() + 1);
            this.statisticService.handleUpdateStatistic(statistic);
        }else{
            Statistic newStatistic = new Statistic();
            newStatistic.setCancelledBookings(1);
            newStatistic.setDate(booking.getDate());

            this.statisticService.handleAddStatistic(newStatistic);
        }
        this.bookingRepository.deleteById(id);
    }
}