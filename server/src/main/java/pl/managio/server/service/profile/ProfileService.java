package pl.managio.server.service.profile;

import org.springframework.web.multipart.MultipartFile;
import pl.managio.server.model.UserModel;

import java.util.Optional;

public interface ProfileService {

    Optional<UserModel> changeName(String name);

    Optional<UserModel> changePhoto(MultipartFile photo);

    boolean changePassword(String currentPassword, String newPassword);

}
