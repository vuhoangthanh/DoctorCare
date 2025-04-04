package vn.project.DoctorCare.config;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationEntryPoint;
import org.springframework.security.oauth2.server.resource.web.access.BearerTokenAccessDeniedHandler;
import org.springframework.security.web.SecurityFilterChain;

import com.nimbusds.jose.jwk.source.ImmutableSecret;
import com.nimbusds.jose.util.Base64;

import vn.project.DoctorCare.util.SecurityUtil;

@Configuration
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfiguration {

        @Value("${tjd.jwt.base64-secret}")
        private String jwtKey;

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }


        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http,
                        CustomAuthenticationEntryPoint customAuthenticationEntryPoint) throws Exception {

                String[] whiteList = {
                                "/", "/api/v1/auth/login", "/api/v1/auth/refresh", "/api/v1/auth/logout",

                                //forgot password
                                "/api/v1/forgot-password",
                                "/api/v1/send-code-forgot-password",

                                // clinic
                                "/api/v1/clinics", "/api/v1/clinic-by-id",

                                // specialty
                                "/api/v1/get-specialties-by-id", "/api/v1/specialties",

                                // doctor
                                "/api/v1/top-doctors", "/api/v1/doctors",
                                "/api/v1/doctors-infor", "/api/v1/doctors-extra-info", "/api/v1/doctors-profile",
                                "/api/v1/doctors-detail/{id}",

                                // schedule
                                "/api/v1/schedules",
                                //new
                                "/api/v1/all-schedules",

                                // allcode
                                "/api/v1/allcodes",

                                // book-appointment
                                "/api/v1/patient-book-appointment",
                                "/api/v1/verify-book-appointment",

                                //swagger
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html",

                                //register
                                "/api/v1/register",

                                //booking
                                "/api/v1/bookings",
                                "/api/v1/date-bookings",

                                //statistic
                                "/api/v1/statistics",

                                //handbooks
                                "/api/v1/handbooks",
                                "/api/v1/handbook-by-id",
                                "/api/v1/handbook-by-specialty"
                };
                http
                                .csrf(c -> c.disable())
                                .cors(Customizer.withDefaults())
                                .authorizeHttpRequests(
                                                authz -> authz
                                                                .requestMatchers(whiteList).permitAll()
//                                                                 .requestMatchers(HttpMethod.GET, "/api/v1/users")
//                                                                 .permitAll()
                                                                .anyRequest().authenticated())
                                .oauth2ResourceServer((oauth2) -> oauth2.jwt(Customizer.withDefaults())
                                                .authenticationEntryPoint(customAuthenticationEntryPoint))
                                // .exceptionHandling(
                                // exceptions -> exceptions
                                // .authenticationEntryPoint(new BearerTokenAuthenticationEntryPoint()) // 401
                                // .accessDeniedHandler(new BearerTokenAccessDeniedHandler())) // 403
                                .formLogin(f -> f.disable())
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

                return http.build();
        }

        // jwt configuration
        @Bean
        public JwtEncoder jwtEncoder() {
                return new NimbusJwtEncoder(new ImmutableSecret<>(getSecretkey()));
        }

        @Bean
        public JwtAuthenticationConverter jwtAuthenticationConverter() {
                JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
                grantedAuthoritiesConverter.setAuthorityPrefix("");
                grantedAuthoritiesConverter.setAuthoritiesClaimName("permission");

                JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
                jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);
                return jwtAuthenticationConverter;
        }

        @Bean
        public JwtDecoder jwtDecoder() {
                NimbusJwtDecoder jwtDecoder = NimbusJwtDecoder.withSecretKey(
                                getSecretkey()).macAlgorithm(SecurityUtil.JWT_ALGORITHM).build();
                return token -> {
                        try {
                                return jwtDecoder.decode(token);
                        } catch (Exception e) {
                                System.out.println(">>> JWT error: " + e.getMessage());
                                throw e;
                        }
                };
        }

        private SecretKey getSecretkey() {
                byte[] keyBytes = Base64.from(jwtKey).decode();
                return new SecretKeySpec(keyBytes, 0, keyBytes.length, SecurityUtil.JWT_ALGORITHM.getName());
        }

}
