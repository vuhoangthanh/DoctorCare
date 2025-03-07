package vn.project.DoctorCare.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vn.project.DoctorCare.domain.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findByDoctorIdAndTokenAndStatusId(long doctorId, String token, String statusId);

    Optional<Booking> findByDoctorIdAndDateAndStatusId(long doctorId, String date, String statusId);
}
