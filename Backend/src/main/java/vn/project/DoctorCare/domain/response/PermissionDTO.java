package vn.project.DoctorCare.domain.response;

public class PermissionDTO {
    private long id;

    private String name;
    private String apiPath;
    private String method;
    private String module;

    public PermissionDTO(long id, String name, String apiPath, String method, String module) {
        this.id = id;
        this.name = name;
        this.apiPath = apiPath;
        this.method = method;
        this.module = module;
    }

    public PermissionDTO() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getApiPath() {
        return apiPath;
    }

    public void setApiPath(String apiPath) {
        this.apiPath = apiPath;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getModule() {
        return module;
    }

    public void setModule(String module) {
        this.module = module;
    }

}
