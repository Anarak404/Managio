package pl.managio.server.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import pl.managio.server.dto.request.LoginRequest;
import pl.managio.server.model.UserModel;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.stream.Collectors;

@Component
@Configuration
public class JSONAuthFilter extends UsernamePasswordAuthenticationFilter {

    public JSONAuthFilter(SuccessAuthenticationHandler successHandler) {
        setAuthenticationSuccessHandler(successHandler);
    }

    @Override
    @Autowired
    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        super.setAuthenticationManager(authenticationManager);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        try {
            String loginData = request.getReader().lines().collect(Collectors.joining());
            ObjectMapper obj = new ObjectMapper();
            LoginRequest authRequest = obj.readValue(loginData, LoginRequest.class);
            UsernamePasswordAuthenticationToken authentication = getAuthRequest(authRequest);
            setDetails(request, authentication);
            return this.getAuthenticationManager().authenticate(authentication);

        } catch (Exception e) {
            throw new BadCredentialsException(e.getMessage());
        }

    }

    private UsernamePasswordAuthenticationToken getAuthRequest(LoginRequest request) {
        String email = request.getEmail();
        String password = request.getPassword();

        if (email == null || password == null) {
            throw new IllegalArgumentException("Email and Password can not be null!");
        }

        return new UsernamePasswordAuthenticationToken(email, password, Collections.emptyList());
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        super.successfulAuthentication(request, response, chain, authResult);
        response.setHeader("Content-Type", "application/json");
        ObjectMapper obj = new ObjectMapper();
        obj.writeValue(response.getOutputStream(), new UserModel((UserDetailsImpl) authResult.getPrincipal()));
    }

}
