package vn.project.DoctorCare.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import vn.project.DoctorCare.domain.AllCode;
import vn.project.DoctorCare.domain.Permission;
import vn.project.DoctorCare.repository.AllCodeRepository;
import vn.project.DoctorCare.repository.PermissionRepository;

@Service
public class AllCodeService {

    private final AllCodeRepository allCodeRepository;
    private final PermissionRepository permissionRepository;

    public AllCodeService(AllCodeRepository allCodeRepository, PermissionRepository permissionRepository) {
        this.allCodeRepository = allCodeRepository;
        this.permissionRepository = permissionRepository;
    }

    public List<AllCode> fetchAllCodeByType(String type) {

        List<AllCode> allCode = new ArrayList<AllCode>();
        allCode = this.allCodeRepository.findByType(type);
        return allCode;
    }

    public boolean existByKeyMap(String keyMap) {
        return this.allCodeRepository.existsByKeyMap(keyMap);
    }

    public AllCode fetchRoleByKeyMap(String keyMap) {
        Optional<AllCode> currentRole = this.allCodeRepository.findByKeyMap(keyMap);
        if (currentRole.isPresent()) {
            return currentRole.get();
        }
        return null;
    }

    public AllCode handleAddRole(AllCode allCode) {
        if (allCode.getPermissions() != null) {
            List<Long> reqPermissions = allCode.getPermissions()
                    .stream().map(x -> x.getId())
                    .collect(Collectors.toList());
            List<Permission> dbPermissions = this.permissionRepository.findByIdIn(reqPermissions);
            allCode.setPermissions(dbPermissions);
        }
        return this.allCodeRepository.save(allCode);
    }

    public AllCode handleUpdateRole(AllCode allCode) {
        AllCode allCodeDB = this.fetchRoleByKeyMap(allCode.getKeyMap());

        if (allCode.getPermissions() != null) {
            List<Long> reqPermissions = allCode.getPermissions()
                    .stream().map(x -> x.getId())
                    .collect(Collectors.toList());

            List<Permission> dbPermissions = this.permissionRepository.findByIdIn(reqPermissions);
            allCode.setPermissions(dbPermissions);
        }

        allCodeDB.setKeyMap(allCode.getKeyMap());
        allCodeDB.setType(allCode.getType());
        allCodeDB.setValueVi(allCode.getValueVi());
        allCodeDB.setValueEn(allCode.getValueEn());
        allCodeDB.setPermissions(allCode.getPermissions());

        allCodeDB = this.allCodeRepository.save(allCodeDB);

        return allCodeDB;
    }

    @Transactional
    public void handleDeleteAllCode(String keyMap) {
        this.allCodeRepository.deleteByKeyMap(keyMap);
    }
}
