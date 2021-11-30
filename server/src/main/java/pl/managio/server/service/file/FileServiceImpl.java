package pl.managio.server.service.file;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import pl.managio.server.model.Image;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import static pl.managio.server.controller.FileController.UPLOAD_DIR;

@Service
public class FileServiceImpl implements FileService {

    @Override
    public Image getImage(String filename) {
        if (filename == null || filename.isBlank()) {
            return null;
        }
        Path filePath = Path.of(UPLOAD_DIR, filename);
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

}
