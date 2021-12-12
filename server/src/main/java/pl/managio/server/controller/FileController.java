package pl.managio.server.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import pl.managio.server.model.Image;
import pl.managio.server.service.file.FileService;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;
    public static final String UPLOAD_IMAGES_DIR = "images";
    public static final String UPLOAD_ATTACHMENTS_DIR = "attachments";

    @GetMapping(value = "/" + UPLOAD_IMAGES_DIR + "/{filename}")
    public ResponseEntity<byte[]> getImage(@PathVariable("filename") String filename) {
        Image image = fileService.getFile(filename, UPLOAD_IMAGES_DIR);
        if (image == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().contentType(image.getType()).body(image.getBody());
    }

}
