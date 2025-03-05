package vn.project.DoctorCare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vn.project.DoctorCare.domain.Specialty;

@Repository
public interface SpecialtyRepository extends JpaRepository<Specialty, Long> {

}
