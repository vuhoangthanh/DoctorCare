package vn.project.DoctorCare.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vn.project.DoctorCare.domain.Markdown;

@Repository
public interface MarkdownRepository extends JpaRepository<Markdown, Long> {

    Optional<Markdown> findByDoctorId(Long doctorId);
}
