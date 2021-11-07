package pl.managio.server.model;

import lombok.Value;
import pl.managio.server.domain.User;

@Value
public class UserModel {

    String name;
    String email;

    public UserModel(User user) {
        name = user.getName();
        email = user.getEmail();
    }

}
