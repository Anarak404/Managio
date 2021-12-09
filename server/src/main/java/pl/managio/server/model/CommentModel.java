package pl.managio.server.model;

import lombok.Value;
import pl.managio.server.domain.Comment;

import java.time.LocalDateTime;

@Value
public class CommentModel {

    long id;
    String description;
    UserModel user;
    LocalDateTime time;

    public CommentModel(Comment comment) {
        id = comment.getId();
        description = comment.getDescription();
        user = new UserModel(comment.getUser());
        time = comment.getCreationDateTime().toLocalDateTime();
    }

}
