package vn.project.DoctorCare.controller;

import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import vn.project.DoctorCare.domain.User;
import vn.project.DoctorCare.service.UserService;
import vn.project.DoctorCare.util.annotation.ApiMessage;

import java.util.List;

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
    @ApiMessage("get all user")
    public ResponseEntity<List<User>> getAllUser() {

        List<User> user = this.userService.fetchAllUser();
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
    public ResponseEntity<User> addUser(@Valid @RequestBody User reqUser) {

        // hash password
        String hashPassword = this.passwordEncoder.encode(reqUser.getPassword());
        reqUser.setPassword(hashPassword);

        User user = this.userService.handleAddUser(reqUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @PutMapping("/users")
    @ApiMessage("update user")
    public ResponseEntity<User> updateUser(@RequestBody User user) {

        User currentUser = this.userService.handleUpdateUser(user);
        return ResponseEntity.status(HttpStatus.OK).body(currentUser);
    }

    @DeleteMapping("/users/{id}")
    @ApiMessage("delete user")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") long id) {

        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}
