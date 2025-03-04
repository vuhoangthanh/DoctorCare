package vn.project.DoctorCare.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vn.project.DoctorCare.domain.User;

@Repository
public interface PatientRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}
