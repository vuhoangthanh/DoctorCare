package vn.project.DoctorCare.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.project.DoctorCare.domain.Booking;
import vn.project.DoctorCare.domain.response.ResBookingByDoctorDTO;
import vn.project.DoctorCare.service.BookingService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/v1")
public class BookingController {
    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/bookings")
    public ResponseEntity<ResBookingByDoctorDTO> findBookingByDoctorIdAndDateAndStatusId(
            @RequestParam("doctorId") long doctorId,
            @RequestParam("date") String date) {

        ResBookingByDoctorDTO resBookingByDoctorDTO = this.bookingService
                .fetchBookingByDoctorAndDateAndStatusId(doctorId, date);

        return ResponseEntity.status(HttpStatus.OK).body(resBookingByDoctorDTO);
    }

}
