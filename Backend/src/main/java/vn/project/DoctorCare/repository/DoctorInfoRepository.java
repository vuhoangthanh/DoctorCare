package vn.project.DoctorCare.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vn.project.DoctorCare.domain.DoctorInfo;

@Repository
public interface DoctorInfoRepository extends JpaRepository<DoctorInfo, Long> {
    Optional<DoctorInfo> findByDoctorId(long doctorId);

    boolean existsByDoctorId(long doctorId);
}
