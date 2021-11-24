package pl.managio.server.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.managio.server.dto.request.RegisterRequest;
import pl.managio.server.model.UserModel;
import pl.managio.server.security.UserDetailsImpl;
import pl.managio.server.service.authentication.AuthenticationService;

import javax.validation.Valid;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<UserModel> register(@Valid @RequestBody RegisterRequest request) {
        String email = request.getEmail();
        String name = request.getName();
        String password = request.getPassword();

        Optional<UserModel> user = authenticationService.register(name, email, password);
        return user.map(u -> new ResponseEntity<>(u, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.CONFLICT));
    }

    @GetMapping("/checkLogin")
    public ResponseEntity<UserModel> checkLogin(Authentication authentication) {
        return new ResponseEntity<>(new UserModel((UserDetailsImpl) authentication.getPrincipal()), HttpStatus.OK);
    }

}
