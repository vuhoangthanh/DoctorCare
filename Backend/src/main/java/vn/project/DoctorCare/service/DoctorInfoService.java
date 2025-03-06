package vn.project.DoctorCare.service;

import java.util.List;

import org.springframework.stereotype.Service;

import vn.project.DoctorCare.domain.DoctorInfo;
import vn.project.DoctorCare.domain.response.ResDoctorInfoByClinicDTO;
import vn.project.DoctorCare.repository.DoctorInfoRepository;
import vn.project.DoctorCare.repository.SpecialtyRepository;

@Service
public class DoctorInfoService {

    private final DoctorInfoRepository doctorInfoRepository;

    public DoctorInfoService(DoctorInfoRepository doctorInfoRepository) {
        this.doctorInfoRepository = doctorInfoRepository;
    }

    public List<DoctorInfo> fetchAllDoctorInfo() {
        return this.doctorInfoRepository.findAll();
    }

    public List<DoctorInfo> fetchDoctorInfoBySpecialtyId(long specialtyId) {
        return this.doctorInfoRepository.findBySpecialtyId(specialtyId);
    }

    public List<DoctorInfo> findBySpecialtyIdAndProvinceId(long specialtyId, String provinceId) {
        return this.doctorInfoRepository.findBySpecialtyIdAndProvinceId(specialtyId, provinceId);
    }

    public List<ResDoctorInfoByClinicDTO> findByClinicId(long clinicId) {
        return this.doctorInfoRepository.findByClinicId(clinicId);
    }
}
