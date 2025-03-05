package vn.project.DoctorCare.service;

import java.util.List;

import org.springframework.stereotype.Service;

import vn.project.DoctorCare.domain.Specialty;
import vn.project.DoctorCare.repository.SpecialtyRepository;

@Service
public class SpecialtyService {

    private final SpecialtyRepository specialtyRepository;

    public SpecialtyService(SpecialtyRepository specialtyRepository) {
        this.specialtyRepository = specialtyRepository;
    }

    public List<Specialty> fetchAllSpecialty() {
        return this.specialtyRepository.findAll();
    }

    public Specialty handleAddSpecialty(Specialty specialty) {
        return this.specialtyRepository.save(specialty);
    }
}
