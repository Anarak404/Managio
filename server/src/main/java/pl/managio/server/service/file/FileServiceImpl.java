package pl.managio.server.service.file;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pl.managio.server.model.Image;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.Objects;
import java.util.UUID;

import static pl.managio.server.controller.FileController.UPLOAD_DIR;

@Service
public class FileServiceImpl implements FileService {

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(Path.of(UPLOAD_DIR));
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    @Override
    public Image getFile(String filename, String directory) {
        if (filename == null || filename.isBlank()) {
            return null;
        }
        Path filePath = Path.of(directory, filename);
        if (!Files.exists(filePath)) {
            return null;
        }

        try {
            byte[] bytes = Files.readAllBytes(filePath);
            String mediaType = Files.probeContentType(filePath);
            MediaType type = MediaType.valueOf(mediaType);
            return new Image(bytes, type);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public String saveFile(MultipartFile file, String directory) {
        try {
            Path path = Paths.get(directory, getFilename(Objects.requireNonNull(file.getOriginalFilename())));
            Files.write(path, file.getBytes(), StandardOpenOption.CREATE_NEW);
            return getFilePath(path);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private String getFilePath(Path path) {
        return ServletUriComponentsBuilder.fromCurrentRequest()
                .replacePath(path.toString().replaceAll("\\\\", "/"))
                .build()
                .toString();
    }

    private String getFilename(String originalName) {
        int index = originalName.lastIndexOf('.');
        String extension = index < 0 || index + 1 >= originalName.length()
                ? "" : originalName.substring(index);
        return UUID.randomUUID() + extension;
    }

}
