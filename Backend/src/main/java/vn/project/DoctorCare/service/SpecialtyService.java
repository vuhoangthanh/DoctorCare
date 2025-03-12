package vn.project.DoctorCare.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import vn.project.DoctorCare.domain.Specialty;
import vn.project.DoctorCare.domain.User;
import vn.project.DoctorCare.domain.response.ResSpecialtiesByIdDTO;
import vn.project.DoctorCare.domain.response.ResultPaginationDTO;
import vn.project.DoctorCare.domain.response.speicalty.ResSpecialtyDTO;
import vn.project.DoctorCare.repository.SpecialtyRepository;

@Service
public class SpecialtyService {

    private final SpecialtyRepository specialtyRepository;
    private final DoctorInfoService doctorInfoService;

    public SpecialtyService(SpecialtyRepository specialtyRepository, DoctorInfoService doctorInfoService) {
        this.specialtyRepository = specialtyRepository;
        this.doctorInfoService = doctorInfoService;
    }

    public ResultPaginationDTO fetchAllSpecialty(Specification<Specialty> spec, Pageable pageable) {
        Page<Specialty> pageSpecialty = this.specialtyRepository.findAll(spec, pageable);

        List<Specialty> specialtyList = pageSpecialty.getContent();

        ResultPaginationDTO resultPaginationDTO = new ResultPaginationDTO();
        ResultPaginationDTO.Meta meta = new ResultPaginationDTO.Meta();

        meta.setPage(pageable.getPageNumber());
        meta.setPageSize(pageable.getPageSize());
        meta.setPages(pageSpecialty.getTotalPages());
        meta.setTotal(pageSpecialty.getTotalElements());

        resultPaginationDTO.setMeta(meta);
        List<ResSpecialtyDTO> listResSpecialtyDTOs = new ArrayList<ResSpecialtyDTO>();

        for (Specialty specialty : specialtyList) {
            ResSpecialtyDTO resSpecialtyDTO = new ResSpecialtyDTO();

            resSpecialtyDTO.setId(specialty.getId());
            resSpecialtyDTO.setName(specialty.getName());
            resSpecialtyDTO.setImage(specialty.getImage());
            resSpecialtyDTO.setDescriptionHtml(specialty.getDescriptionHtml());
            resSpecialtyDTO.setDescriptionMarkdown(specialty.getDescriptionMarkdown());
            resSpecialtyDTO.setCreatedAt(specialty.getCreatedAt());

            listResSpecialtyDTOs.add(resSpecialtyDTO);
        }

        resultPaginationDTO.setResult(listResSpecialtyDTOs);

        return resultPaginationDTO;
    }

    public Specialty handleAddSpecialty(Specialty specialty) {
        return this.specialtyRepository.save(specialty);
    }

    public ResSpecialtiesByIdDTO fetchSpecialtyById(long id, String location) {

        Optional<Specialty> specialty = this.specialtyRepository.findById(id);
        if (specialty.isPresent()) {

            ResSpecialtiesByIdDTO resSpecialtiesByIdDTO = new ResSpecialtiesByIdDTO();

            resSpecialtiesByIdDTO.setId(specialty.get().getId());
            resSpecialtiesByIdDTO.setDescriptionHtml(specialty.get().getDescriptionHtml());
            resSpecialtiesByIdDTO.setDescriptionMarkdown(specialty.get().getDescriptionMarkdown());
            resSpecialtiesByIdDTO.setName(specialty.get().getName());
            if ("ALL".equals(location)) {
                resSpecialtiesByIdDTO.setDoctorInfos(this.doctorInfoService
                        .fetchDoctorInfoBySpecialtyId(specialty.get().getId()));

                return resSpecialtiesByIdDTO;
            } else {
                resSpecialtiesByIdDTO.setDoctorInfos(this.doctorInfoService
                        .findBySpecialtyIdAndProvinceId(specialty.get().getId(), location));

                return resSpecialtiesByIdDTO;
            }
        }
        return null;
    }
}
