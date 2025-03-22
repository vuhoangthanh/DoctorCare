package vn.project.DoctorCare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import vn.project.DoctorCare.domain.HandBook;

@Repository
public interface HandbookRepository extends JpaRepository<HandBook, Long>, JpaSpecificationExecutor<HandBook> {
}
