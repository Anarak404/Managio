package pl.managio.server.service.authentication;

import pl.managio.server.domain.User;
import pl.managio.server.model.UserModel;

import java.util.Optional;

public interface AuthenticationService {

    Optional<UserModel> register(String name, String email, String password);

    User getCurrentUser();

}
