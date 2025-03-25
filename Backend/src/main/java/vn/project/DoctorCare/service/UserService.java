package vn.project.DoctorCare.service;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import vn.project.DoctorCare.domain.User;
import vn.project.DoctorCare.domain.response.ResCreateUserDTO;
import vn.project.DoctorCare.domain.response.ResUpdateUserDTO;
import vn.project.DoctorCare.domain.response.ResUserDTO;
import vn.project.DoctorCare.domain.response.ResultPaginationDTO;
import vn.project.DoctorCare.repository.UserRepository;
import vn.project.DoctorCare.util.constant.Constant;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, EmailService emailService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
    }

    private String code = "";

    public ResultPaginationDTO fetchAllUser(Specification<User> spec, Pageable pageable) {
        Page<User> pageUser = this.userRepository.findAll(spec, pageable);

        List<User> listUser = pageUser.getContent();

        ResultPaginationDTO resultPaginationDTO = new ResultPaginationDTO();
        ResultPaginationDTO.Meta meta = new ResultPaginationDTO.Meta();

        meta.setPage(pageable.getPageNumber());
        meta.setPageSize(pageable.getPageSize());
        meta.setPages(pageUser.getTotalPages());
        meta.setTotal(pageUser.getTotalElements());

        resultPaginationDTO.setMeta(meta);

        // remove sensitive data
        List<ResUserDTO> listResUserDTOs = new ArrayList<ResUserDTO>();

        for (User user : listUser) {
            ResUserDTO resUserDTO = new ResUserDTO();

            resUserDTO.setId(user.getId());
            resUserDTO.setEmail(user.getEmail());
            resUserDTO.setFirstName(user.getFirstName());
            resUserDTO.setLastName(user.getLastName());
            resUserDTO.setAvatar(user.getAvatar());
            resUserDTO.setGender(user.getGender());
            resUserDTO.setAddress(user.getAddress());
            resUserDTO.setPhone(user.getPhone());
            resUserDTO.setRoleId(user.getRoleId());
            resUserDTO.setRole(user.getRole());
            resUserDTO.setPositionId(user.getPositionId());
            resUserDTO.setCreatedAt(user.getCreatedAt());
            resUserDTO.setUpdatedAt(user.getUpdatedAt());
            resUserDTO.setUpdatedBy(user.getUpdatedBy());

            listResUserDTOs.add(resUserDTO);
        }

        resultPaginationDTO.setResult(listResUserDTOs);

        return resultPaginationDTO;
    }

    public User fetchUserById(long id) {
        Optional<User> currentUser = this.userRepository.findById(id);
        if (currentUser.isPresent()) {
            return currentUser.get();
        }
        return null;
    }

    public User handleAddUser(User user) {
        return this.userRepository.save(user);
    }

    public User handleUpdateUser(User user) {
        User currentUser = this.fetchUserById(user.getId());
        if (currentUser != null) {
            currentUser.setFirstName(user.getFirstName());
            currentUser.setLastName(user.getLastName());
            currentUser.setEmail(user.getEmail());
            currentUser.setGender(user.getGender());
            currentUser.setPhone(user.getPhone());
            currentUser.setAddress(user.getAddress());
            currentUser.setAvatar(user.getAvatar());
            currentUser.setRoleId(user.getRoleId());
            currentUser.setPositionId(user.getPositionId());

            this.userRepository.save(currentUser);
        }
        return currentUser;
    }

    public void handleDeleteUser(long id) {
        this.userRepository.deleteById(id);
    }

    public User handleGetUserByUsername(String email) {
        return this.userRepository.findByEmail(email);
    }

    public boolean isEmailExist(String email) {
        return this.userRepository.existsByEmail(email);
    }

    public ResUpdateUserDTO convertToResUpdateUserDTO(User user) {
        ResUpdateUserDTO res = new ResUpdateUserDTO();

        res.setId(user.getId());
        res.setAddress(user.getAddress());
        res.setAvatar(user.getAvatar());
        res.setGender(user.getGender());
        res.setFirstName(user.getFirstName());
        res.setLastName(user.getLastName());
        res.setPhone(user.getPhone());
        res.setRoleId(user.getRoleId());
        res.setPositionId(user.getPositionId());
        res.setUpdatedAt(user.getUpdatedAt());
        res.setUpdatedBy(user.getUpdatedBy());

        return res;
    }

    public ResCreateUserDTO convertToResCreateUserDTO(User user) {
        ResCreateUserDTO res = new ResCreateUserDTO();

        res.setId(user.getId());
        res.setEmail(user.getEmail());
        res.setAddress(user.getAddress());
        res.setAvatar(user.getAvatar());
        res.setGender(user.getGender());
        res.setFirstName(user.getFirstName());
        res.setLastName(user.getLastName());
        res.setPhone(user.getPhone());
        res.setRoleId(user.getRoleId());
        res.setPositionId(user.getPositionId());
        res.setCreatedAt(user.getCreatedAt());

        return res;
    }

    public void updateUserToken(String token, String email) {
        User currentUser = this.handleGetUserByUsername(email);
        if (currentUser != null) {
            currentUser.setRefreshToken(token);
            this.userRepository.save(currentUser);
        }
    }

    public User getUserByRefreshTokenAndEmail(String token, String email) {
        return this.userRepository.findByRefreshTokenAndEmail(token, email);
    }

    public User handleRegister(User user) {
        user.setRoleId(Constant.ROLE_ID_PATIENT);
        return this.userRepository.save(user);
    }

    public boolean verifyCode(String codeEmail, String codeUser){
        if(codeEmail.equals(codeUser)){
            return true;
        }
        return false;
    }

    public User handleSavePassword(String email, String password) {
        User user = this.handleGetUserByUsername(email);

        user.setPassword(password);
        this.userRepository.save(user);

        return user;
    }

    public SecureRandom handleSendEmail(String email) throws Exception {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[4];
        random.nextBytes(bytes);
        String codeEmail=Base64.getUrlEncoder().withoutPadding().encodeToString(bytes).substring(0, 6);
        code = codeEmail;
        this.emailService.sendCodeForgotPassword(codeEmail, email);

        return random;
    }

    public User handleForgotPassword(String email, String password, String codeUser) {

        if(verifyCode(code, codeUser)){

            String hashPassword = this.passwordEncoder.encode(password);
            User user = this.handleSavePassword(email, hashPassword);

            return user;
        }
        return null;
    }
}
