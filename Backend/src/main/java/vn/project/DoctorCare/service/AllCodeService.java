package vn.project.DoctorCare.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import vn.project.DoctorCare.domain.AllCode;
import vn.project.DoctorCare.repository.AllCodeRepository;

@Service
public class AllCodeService {

    private final AllCodeRepository allCodeRepository;

    public AllCodeService(AllCodeRepository allCodeRepository) {
        this.allCodeRepository = allCodeRepository;
    }

    public List<AllCode> fetchAllCodeByType(String type) {

        List<AllCode> allCode = new ArrayList<AllCode>();
        allCode = this.allCodeRepository.findByType(type);
        return allCode;
    }

}
