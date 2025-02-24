package vn.project.DoctorCare.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import vn.project.DoctorCare.domain.User;
import vn.project.DoctorCare.domain.response.ResDoctorDTO;
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

    public List<ResDoctorDTO> fetchAllDoctors() {
        List<User> users = this.doctorRepository.findAllByRoleId("R2");

        List<ResDoctorDTO> listResDoctorDTOs = new ArrayList<ResDoctorDTO>();
        for (User user : users) {
            ResDoctorDTO resDoctorDTO = new ResDoctorDTO();

            resDoctorDTO.setId(user.getId());
            resDoctorDTO.setEmail(user.getEmail());
            resDoctorDTO.setFirstName(user.getFirstName());
            resDoctorDTO.setLastName(user.getLastName());
            resDoctorDTO.setGender(user.getGender());
            resDoctorDTO.setAddress(user.getAddress());
            resDoctorDTO.setPhone(user.getPhone());
            resDoctorDTO.setRoleId(user.getRoleId());
            resDoctorDTO.setPositionId(user.getPositionId());
            resDoctorDTO.setCreatedAt(user.getCreatedAt());
            resDoctorDTO.setUpdatedAt(user.getUpdatedAt());
            resDoctorDTO.setUpdatedBy(user.getUpdatedBy());

            listResDoctorDTOs.add(resDoctorDTO);
        }
        return listResDoctorDTOs;
    }
}
