package vn.project.DoctorCare.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.micrometer.core.ipc.http.HttpSender.Response;
import vn.project.DoctorCare.domain.Booking;
import vn.project.DoctorCare.domain.DoctorInfo;
import vn.project.DoctorCare.domain.Markdown;
import vn.project.DoctorCare.domain.request.ReqBookingRemedyDTO;
import vn.project.DoctorCare.domain.request.ReqEmailRemedyDTO;
import vn.project.DoctorCare.domain.response.ResBookingByDoctorDTO;
import vn.project.DoctorCare.domain.response.ResBookingDTO;
import vn.project.DoctorCare.service.BookingService;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1")
public class BookingController {
    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<ResBookingByDoctorDTO>> findBookingByDoctorIdAndDateAndStatusId(
            @RequestParam("doctorId") long doctorId,
            @RequestParam("date") String date) {

        List<ResBookingByDoctorDTO> resBookingByDoctorDTOs = this.bookingService
                .fetchBookingByDoctorAndDateAndStatusId(doctorId, date);

        return ResponseEntity.status(HttpStatus.OK).body(resBookingByDoctorDTOs);
    }

    @PostMapping("/remedies")
    public ResponseEntity<ResBookingDTO> updateDoneBooking(@RequestBody Map<String, Object> reqData) {

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        ReqBookingRemedyDTO reqBookingRemedyDTO = mapper.convertValue(reqData, ReqBookingRemedyDTO.class);
        ReqEmailRemedyDTO reqEmailRemedyDTO = mapper.convertValue(reqData, ReqEmailRemedyDTO.class);

        ResBookingDTO resBookingDTO = this.bookingService.handleUpdateDoneBooking(reqBookingRemedyDTO,
                reqEmailRemedyDTO);

        return ResponseEntity.status(HttpStatus.OK).body(resBookingDTO);
    }
}
