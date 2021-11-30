package pl.managio.server.model;

import lombok.Value;
import org.springframework.http.MediaType;

@Value
public class Image {
    byte[] body;
    MediaType type;
}
