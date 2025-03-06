package vn.project.DoctorCare.domain.response;

import java.util.List;

import vn.project.DoctorCare.domain.DoctorInfo;

public class ResSpecialtiesByIdDTO {
    private long id;
    private String descriptionHtml;
    private String descriptionMarkdown;
    private List<DoctorInfo> doctorInfos;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDescriptionHtml() {
        return descriptionHtml;
    }

    public void setDescriptionHtml(String descriptionHtml) {
        this.descriptionHtml = descriptionHtml;
    }

    public String getDescriptionMarkdown() {
        return descriptionMarkdown;
    }

    public void setDescriptionMarkdown(String descriptionMarkdown) {
        this.descriptionMarkdown = descriptionMarkdown;
    }

    public List<DoctorInfo> getDoctorInfos() {
        return doctorInfos;
    }

    public void setDoctorInfos(List<DoctorInfo> doctorInfos) {
        this.doctorInfos = doctorInfos;
    }

}
