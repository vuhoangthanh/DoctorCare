package vn.project.DoctorCare.controller;

import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import vn.project.DoctorCare.domain.User;
import vn.project.DoctorCare.domain.dto.LoginDTO;
import vn.project.DoctorCare.domain.dto.ResLoginDTO;
import vn.project.DoctorCare.service.UserService;
import vn.project.DoctorCare.util.SecurityUtil;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/v1")
public class AuthController {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final SecurityUtil securityUtil;
    private final UserService userService;

    public AuthController(AuthenticationManagerBuilder authenticationManagerBuilder, SecurityUtil securityUtil,
            UserService userService) {
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.securityUtil = securityUtil;
        this.userService = userService;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<ResLoginDTO> postMethodName(@Valid @RequestBody LoginDTO loginDto) {

        // Nạp input gồm user/password vào Security
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginDto.getUsername(),
                loginDto.getPassword());

        // Xác thực người dùng => Cần viết hàm loadUserByUsername
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // set info to securityContext
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // format form output
        ResLoginDTO res = new ResLoginDTO();
        User currentUserDB = this.userService.handleGetUserByUsername(authentication.getName());
        if (currentUserDB != null) {
            ResLoginDTO.UserLogin userLogin = new ResLoginDTO.UserLogin(
                    currentUserDB.getId(),
                    currentUserDB.getName(),
                    currentUserDB.getEmail());
            res.setUser(userLogin);
        }

        // createToken
        String access_token = this.securityUtil.createAccessToken(authentication);
        res.setAccessToken(access_token);

        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }
}
