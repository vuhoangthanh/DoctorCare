package vn.project.DoctorCare.domain.response;

import java.time.Instant;

import vn.project.DoctorCare.domain.Markdown;
import vn.project.DoctorCare.util.constant.GenderEnum;

public interface ResTopDoctorsDTO {
    Long getId();

    String getEmail();

    String getFirstName();

    String getLastName();

    String getPhone();

    String getAddress();

    String getGender();

    String getPositionId();

    String getAvatar();

    String getRoleId();

    Instant getCreatedAt();

    Instant getUpdatedAt();

    getValues getPositionData();

    getValues getGenderData();

    Markdown getMarkdown();

    public interface getValues {
        String getValueVi();

        String getValueEn();
    }
}
