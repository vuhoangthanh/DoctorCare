package vn.project.DoctorCare.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import vn.project.DoctorCare.domain.User;
import vn.project.DoctorCare.domain.response.ResCreateUserDTO;
import vn.project.DoctorCare.domain.response.ResUpdateUserDTO;
import vn.project.DoctorCare.domain.response.ResUserDTO;
import vn.project.DoctorCare.domain.response.ResultPaginationDTO;
import vn.project.DoctorCare.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

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
            resUserDTO.setName(user.getName());
            resUserDTO.setAvatar(user.getAvatar());
            resUserDTO.setGender(user.getGender());
            resUserDTO.setAge(user.getAge());
            resUserDTO.setAddress(user.getAddress());
            resUserDTO.setPhone(user.getPhone());
            resUserDTO.setIsActive(user.getIsActive());
            resUserDTO.setRoleId(user.getRoleId());
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
            currentUser.setName(user.getName());
            currentUser.setEmail(user.getEmail());
            currentUser.setGender(user.getGender());
            currentUser.setAge(user.getAge());
            currentUser.setPhone(user.getPhone());
            currentUser.setAddress(user.getAddress());
            currentUser.setAvatar(user.getAvatar());
            currentUser.setRoleId(user.getRoleId());
            currentUser.setPositionId(user.getPositionId());
            currentUser.setIsActive(user.getIsActive());

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
        res.setAge(user.getAge());
        res.setName(user.getName());
        res.setPhone(user.getPhone());
        res.setRoleId(user.getRoleId());
        res.setPositionId(user.getPositionId());
        res.setIsActive(user.getIsActive());
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
        res.setAge(user.getAge());
        res.setGender(user.getGender());
        res.setName(user.getName());
        res.setPhone(user.getPhone());
        res.setRoleId(user.getRoleId());
        res.setPositionId(user.getPositionId());
        res.setIsActive(user.getIsActive());
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
}
