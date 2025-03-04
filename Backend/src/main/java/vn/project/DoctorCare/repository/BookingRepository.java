package vn.project.DoctorCare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vn.project.DoctorCare.domain.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

}
