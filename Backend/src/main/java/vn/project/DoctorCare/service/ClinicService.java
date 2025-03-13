package vn.project.DoctorCare.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import vn.project.DoctorCare.domain.Clinic;
import vn.project.DoctorCare.domain.User;
import vn.project.DoctorCare.domain.response.ResClinicByIdDTO;
import vn.project.DoctorCare.domain.response.ResUserDTO;
import vn.project.DoctorCare.domain.response.ResultPaginationDTO;
import vn.project.DoctorCare.domain.response.clinic.ResClinicDTO;
import vn.project.DoctorCare.repository.ClinicRepository;

@Service
public class ClinicService {

    private final ClinicRepository clinicRepository;
    private final DoctorInfoService doctorInfoService;

    public ClinicService(ClinicRepository clinicRepository, DoctorInfoService doctorInfoService) {
        this.clinicRepository = clinicRepository;
        this.doctorInfoService = doctorInfoService;
    }

    public ResultPaginationDTO fetchAllClinic(Specification<Clinic> spec, Pageable pageable) {
        Page<Clinic> pageClinic = this.clinicRepository.findAll(spec, pageable);

        List<Clinic> listClinic = pageClinic.getContent();

        ResultPaginationDTO resultPaginationDTO = new ResultPaginationDTO();
        ResultPaginationDTO.Meta meta = new ResultPaginationDTO.Meta();

        meta.setPage(pageable.getPageNumber());
        meta.setPageSize(pageable.getPageSize());
        meta.setPages(pageClinic.getTotalPages());
        meta.setTotal(pageClinic.getTotalElements());

        resultPaginationDTO.setMeta(meta);

        List<ResClinicDTO> listResClinicDTOs = new ArrayList<ResClinicDTO>();

        for (Clinic clinic : listClinic) {
            ResClinicDTO resClinicDTO = new ResClinicDTO();

            resClinicDTO.setId(clinic.getId());
            resClinicDTO.setName(clinic.getName());
            resClinicDTO.setAddress(clinic.getAddress());
            resClinicDTO.setCreatedAt(clinic.getCreatedAt());
            resClinicDTO.setDescriptionHtml(clinic.getDescriptionHtml());
            resClinicDTO.setDescriptionMarkdown(clinic.getDescriptionMarkdown());
            resClinicDTO.setImage(clinic.getImage());

            listResClinicDTOs.add(resClinicDTO);
        }

    resultPaginationDTO.setResult(listResClinicDTOs);


        return resultPaginationDTO;
    }

    public ResClinicByIdDTO fetchClinicById(long id) {
        Optional<Clinic> clinic = this.clinicRepository.findById(id);

        if (clinic.isPresent()) {
            ResClinicByIdDTO resClinicByIdDTO = new ResClinicByIdDTO();

            resClinicByIdDTO.setId(clinic.get().getId());
            resClinicByIdDTO.setAddress(clinic.get().getAddress());
            resClinicByIdDTO.setDescriptionHtml(clinic.get().getDescriptionHtml());
            resClinicByIdDTO.setDescriptionMarkdown(clinic.get().getDescriptionMarkdown());
            resClinicByIdDTO.setName(clinic.get().getName());
            resClinicByIdDTO.setImage(clinic.get().getImage());
            resClinicByIdDTO.setCreatedAt(clinic.get().getCreatedAt());
            resClinicByIdDTO.setDoctorInfos(this.doctorInfoService.findByClinicId(clinic.get().getId()));

            return resClinicByIdDTO;
        }
        return null;
    }

    public Clinic handleAddClinic(Clinic clinic) {

        return this.clinicRepository.save(clinic);
    }

    public Clinic findById(long id) {
        Optional<Clinic> clinic = this.clinicRepository.findById(id);
        if (clinic.isPresent()) {
            return clinic.get();
        }
        return null;
    }
    public Clinic handleUpdateClinic(Clinic reqClinic){
        Clinic clinic = this.findById(reqClinic.getId());

        if(clinic != null){
            clinic.setId(reqClinic.getId());
            clinic.setAddress(reqClinic.getAddress());
            clinic.setDescriptionHtml(reqClinic.getDescriptionHtml());
            clinic.setDescriptionMarkdown(reqClinic.getDescriptionMarkdown());
            clinic.setName(reqClinic.getName());
            clinic.setImage(reqClinic.getImage());

            return this.clinicRepository.save(clinic);
        }
        return clinic;
    }

    public void HandleDeleteClinic(long id) {
        this.clinicRepository.deleteById(id);
    }
}
