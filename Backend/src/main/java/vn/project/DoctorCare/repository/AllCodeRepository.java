package vn.project.DoctorCare.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.project.DoctorCare.domain.AllCode;

public interface AllCodeRepository extends JpaRepository<AllCode, Long> {

    List<AllCode> findByType(String type);

    boolean existsByKeyMap(String keyMap);

    Optional<AllCode> findByKeyMap(String keyMap);

    void deleteByKeyMap(String keyMap);
}
