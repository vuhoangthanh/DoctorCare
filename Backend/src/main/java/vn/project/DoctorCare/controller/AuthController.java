package vn.project.DoctorCare.controller;

import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import vn.project.DoctorCare.domain.User;
import vn.project.DoctorCare.domain.dto.ResLoginDTO;
import vn.project.DoctorCare.domain.dto.test;
import vn.project.DoctorCare.domain.request.ReqLoginDTO;
import vn.project.DoctorCare.service.UserService;
import vn.project.DoctorCare.util.SecurityUtil;
import vn.project.DoctorCare.util.annotation.ApiMessage;
import vn.project.DoctorCare.util.error.IdInvalidException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/v1")
public class AuthController {

        private final AuthenticationManagerBuilder authenticationManagerBuilder;
        private final SecurityUtil securityUtil;
        private final UserService userService;

        @Value("${tjd.jwt.refresh-token-validity-in-seconds}")
        private long refreshTokenExpiration;

        public AuthController(AuthenticationManagerBuilder authenticationManagerBuilder, SecurityUtil securityUtil,
                        UserService userService) {
                this.authenticationManagerBuilder = authenticationManagerBuilder;
                this.securityUtil = securityUtil;
                this.userService = userService;
        }

        @PostMapping("/auth/login")
        public ResponseEntity<ResLoginDTO> login(@Valid @RequestBody ReqLoginDTO loginDto) {

                // Nạp input gồm user/password vào Security
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                                loginDto.getUsername(),
                                loginDto.getPassword());

                // Xác thực người dùng => Cần viết hàm loadUserByUsername
                Authentication authentication = authenticationManagerBuilder.getObject()
                                .authenticate(authenticationToken);

                // set info to securityContext
                SecurityContextHolder.getContext().setAuthentication(authentication);

                // format form output
                ResLoginDTO res = new ResLoginDTO();

                User currentUserDB = this.userService.handleGetUserByUsername(loginDto.getUsername());
                if (currentUserDB != null) {
                        ResLoginDTO.UserLogin userLogin = new ResLoginDTO.UserLogin(
                                        currentUserDB.getId(),
                                        currentUserDB.getName(),
                                        currentUserDB.getEmail());
                        res.setUser(userLogin);
                }
                test te = new test(
                                currentUserDB.getId(),
                                currentUserDB.getName(),
                                currentUserDB.getEmail());
                // create access token
                String access_token = this.securityUtil.createAccessToken(authentication.getName(), res.getUser());
                res.setAccessToken(access_token);

                // create refresh token
                String refresh_token = this.securityUtil.createRefreshToken(loginDto.getUsername(), res);

                // update user
                this.userService.updateUserToken(refresh_token, loginDto.getUsername());

                // set cookies
                ResponseCookie resCookies = ResponseCookie
                                .from("refresh_token", refresh_token)
                                .httpOnly(true)
                                .secure(true) // chỉ cho phép https (localhost true or false đều được)
                                .path("/") // api bắt đầu bằng path mới gửi cookies
                                .maxAge(refreshTokenExpiration) // thời gian hết hạn của cookies (s)
                                .build();

                return ResponseEntity.ok()
                                .header(HttpHeaders.SET_COOKIE, resCookies.toString())
                                .body(res);
        }

        @GetMapping("/auth/account")
        @ApiMessage("Get Account Message")
        public ResponseEntity<ResLoginDTO.UserGetAccount> getMethodName() {
                String email = SecurityUtil.getCurrentUserLogin().isPresent() ? SecurityUtil.getCurrentUserLogin().get()
                                : "";

                User currentUserDB = this.userService.handleGetUserByUsername(email);
                ResLoginDTO.UserLogin userLogin = new ResLoginDTO.UserLogin();
                ResLoginDTO.UserGetAccount userGetAccount = new ResLoginDTO.UserGetAccount();
                if (currentUserDB != null) {
                        userLogin.setId(currentUserDB.getId());
                        userLogin.setName(currentUserDB.getName());
                        userLogin.setEmail(currentUserDB.getEmail());

                        userGetAccount.setUser(userLogin);
                }
                return ResponseEntity.ok().body(userGetAccount);

        }

        @GetMapping("/auth/refresh")
        @ApiMessage("refresh token")
        public ResponseEntity<ResLoginDTO> getRefreshToken(
                        @CookieValue(name = "refresh_token", defaultValue = "abc") String refresh_token)
                        throws IdInvalidException {

                if (refresh_token.equals("abc")) {
                        throw new IdInvalidException("Bạn không có refresh_token ở cookies");
                }

                // check valid
                Jwt decodedToken = this.securityUtil.checkValidRefreshToken(refresh_token);
                String email = decodedToken.getSubject();

                // check user by email + token
                User currentUser = this.userService.getUserByRefreshTokenAndEmail(refresh_token, email);
                if (currentUser == null) {
                        throw new IdInvalidException("RefreshToke  không hợp lệ!");
                }

                // issue new token/set refresh token as cookies
                ResLoginDTO res = new ResLoginDTO();
                User currentUserDB = this.userService.handleGetUserByUsername(email);
                if (currentUser != null) {
                        ResLoginDTO.UserLogin userLogin = new ResLoginDTO.UserLogin(
                                        currentUser.getId(),
                                        currentUser.getName(),
                                        currentUser.getEmail());
                        res.setUser(userLogin);
                }

                // create access token
                String access_token = this.securityUtil.createAccessToken(email, res.getUser());
                res.setAccessToken(access_token);

                // create refresh token
                String new_refresh_token = this.securityUtil.createRefreshToken(email, res);

                // update user
                this.userService.updateUserToken(new_refresh_token, email);

                // set cookies
                ResponseCookie resCookies = ResponseCookie
                                .from("refresh_token", new_refresh_token)
                                .httpOnly(true)
                                .secure(true) // chỉ cho phép https (localhost true or false đều được)
                                .path("/") // api bắt đầu bằng path mới gửi cookies
                                .maxAge(refreshTokenExpiration) // thời gian hết hạn của cookies (s)
                                .build();

                return ResponseEntity.ok()
                                .header(HttpHeaders.SET_COOKIE, resCookies.toString())
                                .body(res);
        }

        @PostMapping("/auth/logout")
        @ApiMessage("logout")
        public ResponseEntity<Void> logout() throws IdInvalidException {
                String email = SecurityUtil.getCurrentUserLogin().isPresent() ? SecurityUtil.getCurrentUserLogin().get()
                                : "";
                if (email.equals("")) {
                        throw new IdInvalidException("Access Token không hợp lệ!");
                }

                // remove refresh token = null
                this.userService.updateUserToken(null, email);

                // remove refresh token cookie
                ResponseCookie deleteCookie = ResponseCookie
                                .from("refresh_token", null)
                                .httpOnly(true)
                                .secure(true) // chỉ cho phép https (localhost true or false đều được)
                                .path("/") // api bắt đầu bằng path mới gửi cookies
                                .maxAge(0) // thời gian hết hạn của cookies (s)
                                .build();

                return ResponseEntity.ok()
                                .header(HttpHeaders.SET_COOKIE, deleteCookie.toString())
                                .body(null);
        }

}
