package vn.project.DoctorCare.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vn.project.DoctorCare.domain.DoctorInfo;
import vn.project.DoctorCare.domain.response.ResDoctorInfoByClinicDTO;

@Repository
public interface DoctorInfoRepository extends JpaRepository<DoctorInfo, Long> {
    Optional<DoctorInfo> findByDoctorId(long doctorId);

    boolean existsByDoctorId(long doctorId);

    List<DoctorInfo> findBySpecialtyId(long id);

    List<DoctorInfo> findBySpecialtyIdAndProvinceId(long specialtyId, String provinceId);

    List<ResDoctorInfoByClinicDTO> findByClinicId(long clinicId);
}
