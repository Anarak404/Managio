package pl.managio.server.model;

import lombok.Value;
import pl.managio.server.domain.Attachment;

@Value
public class AttachmentModel {

    String name;
    String path;

    public AttachmentModel(Attachment attachment) {
        this.name = attachment.getName();
        this.path = attachment.getPath();
    }

}
