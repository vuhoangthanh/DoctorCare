package vn.project.DoctorCare.domain.response.handbook;

import jakarta.persistence.Column;

import java.time.Instant;

public class ResHandBookDTO {
    private long id;

    private String title;

    private String thumbnail;

    private String contentMarkdown;

    private String contentHtml;

    private long specialtyId;

    private ResSpecialtyDTO specialtyData;

    private Instant createdAt;

    private String createdBy;


    public static  class ResSpecialtyDTO{
        private long id;
        private String name;

        public ResSpecialtyDTO(String name, long id) {
            this.name = name;
            this.id = id;
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
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public String getContentMarkdown() {
        return contentMarkdown;
    }

    public void setContentMarkdown(String contentMarkdown) {
        this.contentMarkdown = contentMarkdown;
    }

    public String getContentHtml() {
        return contentHtml;
    }

    public void setContentHtml(String contentHtml) {
        this.contentHtml = contentHtml;
    }

    public long getSpecialtyId() {
        return specialtyId;
    }

    public void setSpecialtyId(long specialtyId) {
        this.specialtyId = specialtyId;
    }

    public ResSpecialtyDTO getSpecialtyData() {
        return specialtyData;
    }

    public void setSpecialtyData(ResSpecialtyDTO specialtyData) {
        this.specialtyData = specialtyData;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }



    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }


}
