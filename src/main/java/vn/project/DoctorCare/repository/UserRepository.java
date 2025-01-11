package vn.project.DoctorCare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vn.project.DoctorCare.domain.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}
