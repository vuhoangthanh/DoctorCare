package vn.project.DoctorCare.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import vn.project.DoctorCare.domain.Clinic;
import vn.project.DoctorCare.domain.response.ResClinicByIdDTO;
import vn.project.DoctorCare.repository.ClinicRepository;

@Service
public class ClinicService {

    private final ClinicRepository clinicRepository;
    private final DoctorInfoService doctorInfoService;

    public ClinicService(ClinicRepository clinicRepository, DoctorInfoService doctorInfoService) {
        this.clinicRepository = clinicRepository;
        this.doctorInfoService = doctorInfoService;
    }

    public List<Clinic> fetchAllClinic() {
        return this.clinicRepository.findAll();
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
            resClinicByIdDTO.setDoctorInfos(this.doctorInfoService.findByClinicId(clinic.get().getId()));
            return resClinicByIdDTO;
        }
        return null;
    }

    public Clinic handleAddClinic(Clinic clinic) {

        return this.clinicRepository.save(clinic);
    }
}
