package vn.project.DoctorCare.util;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import com.nimbusds.jose.util.Base64;

@Service
public class SecurityUtil {
    private final JwtEncoder jwtEncoder;

    public SecurityUtil(JwtEncoder jwtEncoder) {
        this.jwtEncoder = jwtEncoder;
    }

    // algorithm
    public static final MacAlgorithm JWT_ALGORITHM = MacAlgorithm.HS512;

    @Value("${tjd.jwt.base64-secret}")
    private String jwtKey;

    @Value("${tjd.jwt.access-token-validity-in-seconds}")
    private long accessTokenExpiration;

    @Value("${tjd.jwt.refresh-token-validity-in-seconds}")
    private long refreshTokenExpiration;

    // take key after reverse hash
    private SecretKey getSecretkey() {
        byte[] keyBytes = Base64.from(jwtKey).decode();
        return new SecretKeySpec(keyBytes, 0, keyBytes.length, JWT_ALGORITHM.getName());
    }

    public String createAccessToken(Authentication authentication) {
        Instant now = Instant.now();
        Instant validity = now.plus(this.accessTokenExpiration, ChronoUnit.SECONDS);

        // hardcode Permission
        List<String> listAuthority = new ArrayList<String>();
        listAuthority.add("ROLE_USER_CREATE");
        listAuthority.add("ROLE_USER_UPDATE");

        // payload
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuedAt(now)
                .expiresAt(validity)
                .subject(authentication.getName())
                .claim("user", authentication)
                .claim("permission", listAuthority)
                .build();

        // header
        JwsHeader jwsHeader = JwsHeader.with(JWT_ALGORITHM).build();
        return this.jwtEncoder.encode(JwtEncoderParameters.from(jwsHeader, claims)).getTokenValue();
    }
}
