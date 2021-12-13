package pl.managio.server.service.profile;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.managio.server.domain.User;
import pl.managio.server.model.UserModel;
import pl.managio.server.repository.UserRepository;
import pl.managio.server.service.authentication.AuthenticationService;
import pl.managio.server.service.file.FileService;

import java.util.Optional;

import static pl.managio.server.controller.FileController.UPLOAD_IMAGES_DIR;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final UserRepository userRepository;
    private final AuthenticationService authenticationService;
    private final FileService fileService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Optional<UserModel> changeName(String name) {
        User user = authenticationService.getCurrentUser();
        user.setName(name);
        try {
            userRepository.save(user);
            return Optional.of(new UserModel(user));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @Override
    public Optional<UserModel> changePhoto(MultipartFile photo) {
        User user = authenticationService.getCurrentUser();
        String file;
        if (photo == null) {
            file = null;
        } else {
            file = fileService.saveFile(photo, UPLOAD_IMAGES_DIR);
        }
        user.setPhoto(file);
        try {
            userRepository.save(user);
            return Optional.of(new UserModel(user));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @Override
    public boolean changePassword(String currentPassword, String newPassword) {
        User user = authenticationService.getCurrentUser();
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            return false;
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        try {
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
