package pl.managio.server.model;

import lombok.Value;
import pl.managio.server.domain.User;
import pl.managio.server.security.UserDetailsImpl;

@Value
public class UserModel {

    String name;
    String email;

    public UserModel(User user) {
        name = user.getName();
        email = user.getEmail();
    }

    public UserModel(UserDetailsImpl userDetails) {
        this(userDetails.getUser());
    }

}
