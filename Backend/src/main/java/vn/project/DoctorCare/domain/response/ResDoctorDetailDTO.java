package vn.project.DoctorCare.domain.response;

import java.time.Instant;

import vn.project.DoctorCare.domain.AllCode;
import vn.project.DoctorCare.domain.Markdown;
import vn.project.DoctorCare.util.constant.GenderEnum;

public class ResDoctorDetailDTO {
    private long id;
    private String firstName;
    private String lastName;
    private String email;
    private String gender;
    private int phone;
    private String address;
    private String avatar;
    private String roleId;
    private String positionId;
    private Instant createdAt;
    private Instant updatedAt;
    private String updatedBy;

    private AllCode positionData;
    private AllCode genderData;
    private Markdown markdown;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getPhone() {
        return phone;
    }

    public void setPhone(int phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public String getPositionId() {
        return positionId;
    }

    public void setPositionId(String positionId) {
        this.positionId = positionId;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public AllCode getPositionData() {
        return positionData;
    }

    public void setPositionData(AllCode positionData) {
        this.positionData = positionData;
    }

    public AllCode getGenderData() {
        return genderData;
    }

    public void setGenderData(AllCode genderData) {
        this.genderData = genderData;
    }

    public Markdown getMarkdown() {
        return markdown;
    }

    public void setMarkdown(Markdown markdown) {
        this.markdown = markdown;
    }

}
