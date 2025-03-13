package vn.project.DoctorCare.domain.response;

import java.time.Instant;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import vn.project.DoctorCare.domain.DoctorInfo;

public class ResClinicByIdDTO {
    private long id;

    private String name;

    private String address;

    private String image;

    private String descriptionHtml;

    private String descriptionMarkdown;

    private List<ResDoctorInfoByClinicDTO> doctorInfos;

    private Instant createdAt;

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
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

    public List<ResDoctorInfoByClinicDTO> getDoctorInfos() {
        return doctorInfos;
    }

    public void setDoctorInfos(List<ResDoctorInfoByClinicDTO> doctorInfos) {
        this.doctorInfos = doctorInfos;
    }

}
