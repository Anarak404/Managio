package pl.managio.server.model;

import lombok.Value;
import pl.managio.server.domain.User;
import pl.managio.server.security.UserDetailsImpl;

@Value
public class UserModel {

    long id;
    String name;
    String email;
    String photo;

    public UserModel(User user) {
        id = user.getId();
        name = user.getName();
        email = user.getEmail();
        photo = user.getPhoto();
    }

    public UserModel(UserDetailsImpl userDetails) {
        this(userDetails.getUser());
    }

}
