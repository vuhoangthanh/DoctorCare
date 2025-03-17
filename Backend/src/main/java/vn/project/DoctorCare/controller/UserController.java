package vn.project.DoctorCare.controller;

import org.springframework.web.bind.annotation.RestController;

import com.turkraft.springfilter.boot.Filter;

import jakarta.validation.Valid;
import vn.project.DoctorCare.domain.User;
import vn.project.DoctorCare.domain.response.ResCreateUserDTO;
import vn.project.DoctorCare.domain.response.ResUpdateUserDTO;
import vn.project.DoctorCare.domain.response.ResultPaginationDTO;
import vn.project.DoctorCare.service.UserService;
import vn.project.DoctorCare.util.annotation.ApiMessage;
import vn.project.DoctorCare.util.error.IdInvalidException;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    private UserService userService;
    private PasswordEncoder passwordEncoder;

    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/users")
    @ApiMessage("fetch all user")
    public ResponseEntity<ResultPaginationDTO> getAllUser(
            @Filter Specification<User> spec,
            Pageable pageable) {

        // String sPage = pageOptional.isPresent() ? pageOptional.get() : "";
        // String sSize = sizeOptional.isPresent() ? sizeOptional.get() : "";
        // int page = Integer.parseInt(sPage);
        // int size = Integer.parseInt(sSize);

        // Pageable pageable = PageRequest.of(page - 1, size);

        ResultPaginationDTO user = this.userService.fetchAllUser(spec, pageable);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    @GetMapping("/users/{id}")
    @ApiMessage("get user by id")
    public ResponseEntity<User> getUserById(@PathVariable("id") long id) {

        User user = this.userService.fetchUserById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/users")
    @ApiMessage("add user")
    public ResponseEntity<ResCreateUserDTO> addUser(@Valid @RequestBody User reqUser) throws IdInvalidException {

        boolean isEmailExist = this.userService.isEmailExist(reqUser.getEmail());
        if (isEmailExist) {
            throw new IdInvalidException(
                    "Email " + reqUser.getEmail() + " đã tồn tại, vui lòng sử dụng email khác");
        }

        // hash password
        String hashPassword = this.passwordEncoder.encode(reqUser.getPassword());
        reqUser.setPassword(hashPassword);

        User user = this.userService.handleAddUser(reqUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(this.userService.convertToResCreateUserDTO(user));
    }

    @PutMapping("/users")
    @ApiMessage("update user")
    public ResponseEntity<ResUpdateUserDTO> editUser(@Valid @RequestBody User reqUser) throws IdInvalidException {

        if (this.userService.fetchUserById(reqUser.getId()) == null) {
            throw new IdInvalidException("User với id = " + reqUser.getId() + " không tồn tại!");
        }
        User currentUser = this.userService.handleUpdateUser(reqUser);
        return ResponseEntity.status(HttpStatus.OK).body(this.userService.convertToResUpdateUserDTO(currentUser));
    }

    @DeleteMapping("/users/{id}")
    @ApiMessage("delete user")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") long id) throws IdInvalidException {
        if (this.userService.fetchUserById(id) == null) {
            throw new IdInvalidException("User với id = " + id + " không tồn tại!");
        }
        this.userService.handleDeleteUser(id);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @PostMapping("/register")
    @ApiMessage("register")
    public ResponseEntity<ResCreateUserDTO> register(@Valid @RequestBody User reqUser) throws IdInvalidException {

        boolean isEmailExist = this.userService.isEmailExist(reqUser.getEmail());
        if (isEmailExist) {
            throw new IdInvalidException(
                    "Email " + reqUser.getEmail() + " đã tồn tại, vui lòng sử dụng email khác");
        }

        // hash password
        String hashPassword = this.passwordEncoder.encode(reqUser.getPassword());
        reqUser.setPassword(hashPassword);

        User user = this.userService.handleRegister(reqUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(this.userService.convertToResCreateUserDTO(user));
    }
}
