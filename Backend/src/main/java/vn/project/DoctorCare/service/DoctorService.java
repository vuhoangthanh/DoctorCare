package vn.project.DoctorCare.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import vn.project.DoctorCare.domain.User;
import vn.project.DoctorCare.domain.response.ResTopDoctorsDTO;
import vn.project.DoctorCare.repository.DoctorRepository;

@Service
public class DoctorService {
    private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public List<ResTopDoctorsDTO> fetchTopDoctors(int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        List<ResTopDoctorsDTO> doctors = doctorRepository.findAllByRoleIdOrderByCreatedAtDesc("R2", pageable);

        return doctors;
    }
}
