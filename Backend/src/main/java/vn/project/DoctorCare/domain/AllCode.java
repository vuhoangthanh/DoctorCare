package vn.project.DoctorCare.domain;

import java.time.Instant;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import vn.project.DoctorCare.util.SecurityUtil;

@Entity
@Table(name = "allcodes")
public class AllCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String keyMap;

    private String type;
    private String valueEn;
    private String valueVi;

    private Instant createdAt;
    private Instant updatedAt;
    private String createdBy;
    private String updatedBy;

    @OneToMany(mappedBy = "positionData")
    private List<User> usersByPosition;

    @OneToMany(mappedBy = "genderData")
    private List<User> usersByGender;

    @OneToMany(mappedBy = "timeTypeData")
    private List<Schedule> scheduleByTimeType;

    @OneToMany(mappedBy = "priceTypeData")
    private List<DoctorInfo> doctorInfoByPrice;

    @OneToMany(mappedBy = "paymentTypeData")
    private List<DoctorInfo> doctorInfoByPayment;

    @OneToMany(mappedBy = "provinceTypeData")
    private List<DoctorInfo> doctorInfoByProvince;

    @OneToMany(mappedBy = "timeTypeDataPatient")
    private List<Booking> bookingByTimeType;

    @ManyToMany(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "roles" })
    @JoinTable(name = "permission_role", joinColumns = @JoinColumn(name = "role_id"), inverseJoinColumns = @JoinColumn(name = "permission_id"))
    private List<Permission> permissions;

    @OneToMany(mappedBy = "role", fetch = FetchType.LAZY)
    @JsonIgnore
    List<User> users;

    @PrePersist
    public void handleBeforeCreateAt() {
        this.createdBy = SecurityUtil.getCurrentUserLogin().isPresent() == true
                ? SecurityUtil.getCurrentUserLogin().get()
                : "";
        this.createdAt = Instant.now();
    }

    @PreUpdate
    public void handleAfterUpdateAt() {
        this.updatedBy = SecurityUtil.getCurrentUserLogin().isPresent() == true
                ? SecurityUtil.getCurrentUserLogin().get()
                : "";
        this.updatedAt = Instant.now();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public List<Permission> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<Permission> permissions) {
        this.permissions = permissions;
    }

    public void setValueVi(String valueVi) {
        this.valueVi = valueVi;
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

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public String getKeyMap() {
        return keyMap;
    }

    public void setKeyMap(String keyMap) {
        this.keyMap = keyMap;
    }

}
