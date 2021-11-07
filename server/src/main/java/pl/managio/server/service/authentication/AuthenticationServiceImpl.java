package pl.managio.server.service.authentication;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.managio.server.domain.User;
import pl.managio.server.model.UserModel;
import pl.managio.server.repository.UserRepository;
import pl.managio.server.security.UserDetailsImpl;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Override
    public Optional<UserModel> register(String name, String email, String password) {
        User user = new User(email, name, passwordEncoder.encode(password));
        try {
            userRepository.save(user);
            return Optional.of(new UserModel(user));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @Override
    public User getCurrentUser() {
        return ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
    }

}
