package vn.project.DoctorCare.domain.response;

import java.util.List;

import vn.project.DoctorCare.domain.Permission;

public class RoleDTO {
    private long id;

    private String keyMap;

    private String type;
    private String valueEn;
    private String valueVi;

    private List<Permission> permissions;

    public RoleDTO() {
    }

    public RoleDTO(long id, String keyMap, String type, String valueEn, String valueVi, List<Permission> permissions) {
        this.id = id;
        this.keyMap = keyMap;
        this.type = type;
        this.valueEn = valueEn;
        this.valueVi = valueVi;
        this.permissions = permissions;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getKeyMap() {
        return keyMap;
    }

    public void setKeyMap(String keyMap) {
        this.keyMap = keyMap;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getValueEn() {
        return valueEn;
    }

    public void setValueEn(String valueEn) {
        this.valueEn = valueEn;
    }

    public String getValueVi() {
        return valueVi;
    }

    public void setValueVi(String valueVi) {
        this.valueVi = valueVi;
    }

    public List<Permission> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<Permission> permissions) {
        this.permissions = permissions;
    }

}
