package pl.managio.server.service.file;


import org.springframework.web.multipart.MultipartFile;
import pl.managio.server.model.Image;

public interface FileService {

    Image getFile(String filename, String directory);

    String saveFile(MultipartFile file, String directory);

}
