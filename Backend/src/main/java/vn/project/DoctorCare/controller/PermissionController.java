package vn.project.DoctorCare.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.project.DoctorCare.domain.Permission;
import vn.project.DoctorCare.domain.response.ResultPaginationDTO;
import vn.project.DoctorCare.service.PermissionService;
import vn.project.DoctorCare.util.annotation.ApiMessage;
import vn.project.DoctorCare.util.error.IdInvalidException;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/v1")
public class PermissionController {

    private final PermissionService permissionService;

    public PermissionController(PermissionService permissionService) {
        this.permissionService = permissionService;
    }

    @GetMapping("/permissions")
    public ResponseEntity<ResultPaginationDTO> getAllPermission(Pageable pageable) {

        ResultPaginationDTO resultPaginationDTO = this.permissionService.fetchAllPermission(pageable);
        return ResponseEntity.status(HttpStatus.OK).body(resultPaginationDTO);
    }

    @PostMapping("/permissions")
    @ApiMessage("add permission")
    public ResponseEntity<Permission> addPermission(@RequestBody Permission reqPermission) throws IdInvalidException {
        if (this.permissionService.isPermissionExist(reqPermission)) {
            throw new IdInvalidException(
                    "Permission is exist");
        }
        Permission permission = this.permissionService.handleAddPermission(reqPermission);
        return ResponseEntity.status(HttpStatus.CREATED).body(permission);
    }

    @PutMapping("/permissions")
    public ResponseEntity<Permission> editPermission(@RequestBody Permission reqPermission) throws IdInvalidException {
        if (this.permissionService.findPermissionById(reqPermission.getId()) == null) {
            throw new IdInvalidException("Permission id = " + reqPermission.getId() + " not found");
        }

        if (this.permissionService.isPermissionExist(reqPermission)) {
            throw new IdInvalidException(
                    "Permission is exist");
        }

        Permission permission = this.permissionService.handleUpdatePermission(reqPermission);
        return ResponseEntity.status(HttpStatus.OK).body(permission);
    }

    @DeleteMapping("/permissions")
    @ApiMessage("delete permission")
    public ResponseEntity<Void> deletePermission(@RequestParam("id") long id) throws IdInvalidException {

        if (this.permissionService.findPermissionById(id) == null) {
            throw new IdInvalidException("Permission id = " + id + " not found");
        }
        this.permissionService.handleDeletePermission(id);
        return ResponseEntity.ok().body(null);
    }

}
