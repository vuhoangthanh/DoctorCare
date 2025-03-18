package vn.project.DoctorCare.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class PermissionInterceptorConfiguration implements WebMvcConfigurer {
    @Bean
    PermissionInterceptor getPermissionInterceptor() {
        return new PermissionInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        String[] whiteList = {
                "/", "/api/v1/auth/login", "/api/v1/auth/refresh", "api/v1/auth/logout",

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
                "/api/v1/all-schedules",

                // allcode
                "/api/v1/allcodes",

                // book-appointment
                "/api/v1/patient-book-appointment", "/api/v1/verify-book-appointment",

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
                "/api/v1/statistics"


        };
        registry.addInterceptor(getPermissionInterceptor())
                .excludePathPatterns(whiteList);
    }
}
