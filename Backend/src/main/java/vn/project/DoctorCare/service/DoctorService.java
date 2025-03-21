package vn.project.DoctorCare.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.boot.actuate.autoconfigure.metrics.SystemMetricsAutoConfiguration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import vn.project.DoctorCare.domain.User;
import vn.project.DoctorCare.domain.response.ResDoctorDTO;
import vn.project.DoctorCare.domain.response.ResDoctorDetailDTO;
import vn.project.DoctorCare.domain.response.ResTopDoctorsDTO;
import vn.project.DoctorCare.domain.response.ResultPaginationDTO;
import vn.project.DoctorCare.repository.DoctorRepository;

@Service
public class DoctorService {
    private final DoctorRepository doctorRepository;
    private final SystemMetricsAutoConfiguration systemMetricsAutoConfiguration;

    public DoctorService(DoctorRepository doctorRepository, SystemMetricsAutoConfiguration systemMetricsAutoConfiguration) {
        this.doctorRepository = doctorRepository;
        this.systemMetricsAutoConfiguration = systemMetricsAutoConfiguration;
    }

    public List<ResTopDoctorsDTO> fetchTopDoctors(int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        List<ResTopDoctorsDTO> doctors = doctorRepository.findAllByRoleIdOrderByCreatedAtDesc("R2", pageable);

        return doctors;
    }

    public ResultPaginationDTO fetchAllDoctors(Specification<User> spec, Pageable pageable) {
        Specification<User> statusCondition = (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("roleId"), "R2");

        Specification<User> finalSpec = Specification.where(spec).and(statusCondition);

        Page<User> pageDoctor = this.doctorRepository.findAll(finalSpec, pageable);

        List<User> listDoctor = pageDoctor.getContent();

        ResultPaginationDTO resultPaginationDTO = new ResultPaginationDTO();
        ResultPaginationDTO.Meta meta = new ResultPaginationDTO.Meta();

        meta.setPage(pageable.getPageNumber());
        meta.setPageSize(pageable.getPageSize());
        meta.setPages(pageDoctor.getTotalPages());
        meta.setTotal(pageDoctor.getTotalElements());

        resultPaginationDTO.setMeta(meta);


        List<ResDoctorDTO> listResDoctorDTOs = new ArrayList<ResDoctorDTO>();
        for (User user : listDoctor) {
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

        resultPaginationDTO.setResult(listResDoctorDTOs);
        return resultPaginationDTO;
    }

    public ResDoctorDetailDTO fetchDetailDoctorById(long id) {
        Optional<User> user = this.doctorRepository.findById(id);
        // Optional<ResDoctorDetailDTO> user = this.doctorRepository.findById(id);
        if (user.isPresent()) {

            ResDoctorDetailDTO resDoctorDetailDTO = new ResDoctorDetailDTO();

            resDoctorDetailDTO.setId(user.get().getId());
            resDoctorDetailDTO.setFirstName(user.get().getFirstName());
            resDoctorDetailDTO.setLastName(user.get().getLastName());
            resDoctorDetailDTO.setEmail(user.get().getEmail());
            resDoctorDetailDTO.setAddress(user.get().getAddress());
            resDoctorDetailDTO.setAvatar(user.get().getAvatar());
            resDoctorDetailDTO.setPhone(user.get().getPhone());
            resDoctorDetailDTO.setGender(user.get().getGender());
            resDoctorDetailDTO.setRoleId(user.get().getRoleId());
            resDoctorDetailDTO.setPositionId(user.get().getPositionId());
            resDoctorDetailDTO.setPositionData(user.get().getPositionData());
            resDoctorDetailDTO.setGenderData(user.get().getGenderData());
            resDoctorDetailDTO.setMarkdown(user.get().getMarkdown());
            resDoctorDetailDTO.setDoctorInfo(user.get().getDoctorInfo());
            resDoctorDetailDTO.setCreatedAt(user.get().getCreatedAt());
            resDoctorDetailDTO.setUpdatedAt(user.get().getUpdatedAt());
            resDoctorDetailDTO.setUpdatedBy(user.get().getUpdatedBy());

            return resDoctorDetailDTO;
        }

        return null;
    }

}
