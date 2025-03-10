package vn.project.DoctorCare.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import vn.project.DoctorCare.domain.Permission;
import vn.project.DoctorCare.domain.response.ResUserDTO;
import vn.project.DoctorCare.domain.response.ResultPaginationDTO;
import vn.project.DoctorCare.repository.PermissionRepository;

@Service
public class PermissionService {

    private final PermissionRepository permissionRepository;

    public PermissionService(PermissionRepository permissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    public ResultPaginationDTO fetchAllPermission(Pageable pageable) {
        Page<Permission> pagePermission = this.permissionRepository.findAll(pageable);

        List<Permission> listPermissions = pagePermission.getContent();

        ResultPaginationDTO resultPaginationDTO = new ResultPaginationDTO();
        ResultPaginationDTO.Meta meta = new ResultPaginationDTO.Meta();

        meta.setPage(pageable.getPageNumber());
        meta.setPageSize(pageable.getPageSize());
        meta.setPages(pagePermission.getTotalPages());
        meta.setTotal(pagePermission.getTotalElements());

        resultPaginationDTO.setMeta(meta);

        resultPaginationDTO.setResult(listPermissions);

        return resultPaginationDTO;

    }

    public boolean isPermissionExist(Permission permission) {
        return this.permissionRepository.existsByModuleAndApiPathAndMethod(
                permission.getModule(), permission.getApiPath(), permission.getMethod());
    }

    public Permission handleAddPermission(Permission permission) {
        return this.permissionRepository.save(permission);
    }

    public Permission findPermissionById(long id) {
        Optional<Permission> currentPermission = this.permissionRepository.findById(id);

        if (currentPermission.isPresent()) {
            return currentPermission.get();
        }
        return null;
    }

    public Permission handleUpdatePermission(Permission reqPermission) {
        Permission currentPermission = findPermissionById(reqPermission.getId());
        if (currentPermission != null) {
            currentPermission.setApiPath(reqPermission.getApiPath());
            currentPermission.setId(reqPermission.getId());
            currentPermission.setMethod(reqPermission.getMethod());
            currentPermission.setName(reqPermission.getName());
            currentPermission.setModule(reqPermission.getModule());

            return this.permissionRepository.save(currentPermission);
        }

        return currentPermission;
    }

    public void handleDeletePermission(long id) {

        // delete permission_role
        Optional<Permission> permissionOptional = this.permissionRepository.findById(id);
        Permission currentPermission = permissionOptional.get();
        currentPermission.getRoles().forEach(role -> role.getPermissions().remove(currentPermission));

        this.permissionRepository.deleteById(id);
    }
}
