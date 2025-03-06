package vn.project.DoctorCare.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import vn.project.DoctorCare.domain.Specialty;
import vn.project.DoctorCare.domain.response.ResSpecialtiesByIdDTO;
import vn.project.DoctorCare.repository.SpecialtyRepository;

@Service
public class SpecialtyService {

    private final SpecialtyRepository specialtyRepository;
    private final DoctorInfoService doctorInfoService;

    public SpecialtyService(SpecialtyRepository specialtyRepository, DoctorInfoService doctorInfoService) {
        this.specialtyRepository = specialtyRepository;
        this.doctorInfoService = doctorInfoService;
    }

    public List<Specialty> fetchAllSpecialty() {
        return this.specialtyRepository.findAll();
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
