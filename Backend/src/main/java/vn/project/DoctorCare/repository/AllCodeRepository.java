package vn.project.DoctorCare.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.project.DoctorCare.domain.AllCode;

public interface AllCodeRepository extends JpaRepository<AllCode, Long> {

    List<AllCode> findByType(String type);

}
