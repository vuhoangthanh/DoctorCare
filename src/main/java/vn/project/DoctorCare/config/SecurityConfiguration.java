package vn.project.DoctorCare.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfiguration {

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
                http
                                .csrf(csrf -> csrf.disable())
                                .authorizeHttpRequests(
                                                authz -> authz
                                                                .requestMatchers("/").permitAll()
                                                                .anyRequest().permitAll())
                                // .sessionManagement(session ->
                                // session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                // .exceptionHandling(
                                // exceptions -> exceptions
                                // .authenticationEntryPoint(new BearerTokenAuthenticationEntryPoint())
                                // .accessDeniedHandler(new BearerTokenAccessDeniedHandler()))
                                // .oauth2ResourceServer(oauth2 -> oauth2.jwt(withDefaults()));
                                .formLogin(f -> f.disable())
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

                return http.build();
        }

}