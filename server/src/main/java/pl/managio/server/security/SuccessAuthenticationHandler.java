package pl.managio.server.security;

import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Service;

@Service
public class SuccessAuthenticationHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    public SuccessAuthenticationHandler() {
        super();
        setRedirectStrategy((request, response, url) -> {
        });
    }

}