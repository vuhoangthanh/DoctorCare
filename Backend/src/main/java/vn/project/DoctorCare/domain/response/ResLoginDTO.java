package vn.project.DoctorCare.domain.response;

import vn.project.DoctorCare.domain.AllCode;

public class ResLoginDTO {
    private String accessToken;
    private UserLogin user;

    public static class UserLogin {
        private long id;
        private String firstName;
        private String lastName;
        private String email;
        private String roleId;
        private AllCode role;

        public UserLogin() {
        }

        public UserLogin(long id, String firstName, String lastName, String email, String roleId, AllCode role) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.roleId = roleId;
            this.role = role;
        }

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

        public String getRoleId() {
            return roleId;
        }

        public void setRoleId(String roleId) {
            this.roleId = roleId;
        }

        public AllCode getRole() {
            return role;
        }

        public void setRole(AllCode role) {
            this.role = role;
        }
    }

    public static class UserGetAccount {
        private UserLogin user;

        public UserGetAccount() {
        }

        public UserGetAccount(UserLogin user) {
            this.user = user;
        }

        public UserLogin getUser() {
            return user;
        }

        public void setUser(UserLogin user) {
            this.user = user;
        }
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public UserLogin getUser() {
        return user;
    }

    public void setUser(UserLogin user) {
        this.user = user;
    }

    public static class UserInsideToken {
        private long id;
        private String email;
        private String firstName;
        private String lastName;

        public long getId() {
            return id;
        }

        public void setId(long id) {
            this.id = id;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
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

    }

}
