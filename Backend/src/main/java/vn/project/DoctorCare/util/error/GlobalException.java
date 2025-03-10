package vn.project.DoctorCare.util.error;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import vn.project.DoctorCare.domain.RestResponse;

@RestControllerAdvice
public class GlobalException {

    // bắt idinvalid, not token
    @ExceptionHandler(value = {
            UsernameNotFoundException.class,
            BadCredentialsException.class,
            IdInvalidException.class
    })
    public ResponseEntity<RestResponse<Object>> handleIdException(Exception ex) {

        RestResponse<Object> res = new RestResponse<Object>();
        // res.setStatusCode(HttpStatus.BAD_REQUEST.value());
        res.setStatusCode(HttpStatus.OK.value());
        res.setError(ex.getMessage());
        res.setMessage("Exception occurs...");

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }

    // bắt permission endpoint
    @ExceptionHandler(value = { PermissionException.class })
    public ResponseEntity<RestResponse<Object>> handlePermissionEndpoint(Exception ex) {

        RestResponse<Object> res = new RestResponse<Object>();
        // res.setStatusCode(HttpStatus.BAD_REQUEST.value());
        res.setStatusCode(HttpStatus.UNAUTHORIZED.value());
        res.setError(ex.getMessage());
        res.setMessage("You do not have access to this endpoint.");

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(res);
    }

    // bắt url 404
    @ExceptionHandler(value = { NoResourceFoundException.class })
    public ResponseEntity<RestResponse<Object>> handleNotFoundException(Exception ex) {
        RestResponse<Object> res = new RestResponse<Object>();
        res.setStatusCode((HttpStatus.NOT_FOUND.value()));
        res.setError(ex.getMessage());
        res.setMessage("404 Not Found. URL may not exist...");

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }

    // bắt validation
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<RestResponse<Object>> validationError(
            MethodArgumentNotValidException ex) {

        BindingResult result = ex.getBindingResult();
        final List<FieldError> fieldErrors = result.getFieldErrors();

        RestResponse<Object> res = new RestResponse<Object>();
        res.setStatusCode(HttpStatus.BAD_REQUEST.value());
        res.setError(ex.getBody().getDetail());

        List<String> errors = fieldErrors.stream().map(f -> f.getDefaultMessage()).collect(Collectors.toList());
        res.setMessage(errors.size() > 1 ? errors : errors.get(0));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }
}