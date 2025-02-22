package vn.project.DoctorCare.domain.response;

import java.time.Instant;

import vn.project.DoctorCare.util.constant.GenderEnum;

public interface ResTopDoctorsDTO {
    Long getId();

    String getEmail();

    String getPassword();

    String getFirstName();

    String getLastName();

    String getPhone();

    String getAddress();

    GenderEnum getGender();

    String getPositionId();

    String getAvatar();

    String getRoleId();

    Instant getCreatedAt();

    Instant getUpdatedAt();

    getValues getPositionData();

    getValues getGenderData();

    public interface getValues {
        String getValueVi();

        String getValueEn();
    }
}
