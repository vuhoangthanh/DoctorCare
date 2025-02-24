package vn.project.DoctorCare.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vn.project.DoctorCare.domain.User;
import vn.project.DoctorCare.domain.response.ResDoctorDetailDTO;
import vn.project.DoctorCare.domain.response.ResTopDoctorsDTO;

@Repository
public interface DoctorRepository extends JpaRepository<User, Long> {
    // @EntityGraph(attributePaths = { "positionData.valueVi", "genderData" })
    // @EntityGraph(attributePaths = {"markdown.valueVi"})
    List<ResTopDoctorsDTO> findAllByRoleIdOrderByCreatedAtDesc(String roleId, Pageable pageable);

    List<User> findAllByRoleId(String roleId);

    Optional<User> findById(long id);
}
