package vn.project.DoctorCare.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import vn.project.DoctorCare.domain.Booking;
import vn.project.DoctorCare.domain.request.ReqPatientBookingDTO;
import vn.project.DoctorCare.repository.BookingRepository;
import vn.project.DoctorCare.util.constant.Constant;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public Booking handleAddBooking(ReqPatientBookingDTO reqPatientBookingDTO) {

        Optional<Booking> currentBooking = this.bookingRepository.findById(reqPatientBookingDTO.getPatientId());
        if (currentBooking.isPresent()) {
            return currentBooking.get();
        }

        Booking reqBooking = new Booking();
        reqBooking.setStatusId(Constant.STATUS_NEW);
        reqBooking.setDoctorId(reqPatientBookingDTO.getDoctorId());
        reqBooking.setPatientId(reqPatientBookingDTO.getPatientId());
        reqBooking.setDate(reqPatientBookingDTO.getDate());
        reqBooking.setTimeType(reqPatientBookingDTO.getTimeString());
        reqBooking.setToken(reqPatientBookingDTO.getToken());

        Booking booking = this.bookingRepository.save(reqBooking);

        return booking;
    }

    public Booking handleVerifyBooking(String token, long doctorId) {

        Optional<Booking> booking = this.bookingRepository.findByDoctorIdAndTokenAndStatusId(doctorId, token,
                Constant.STATUS_NEW);

        if (booking.isPresent()) {
            booking.get().setStatusId(Constant.STATUS_CONFIRMED);
            Booking resBooking = booking.get();
            return this.bookingRepository.save(resBooking);
        }

        return null;
    }
}
