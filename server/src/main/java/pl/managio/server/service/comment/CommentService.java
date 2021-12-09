package pl.managio.server.service.comment;

import pl.managio.server.model.CommentModel;

import java.util.Optional;

public interface CommentService {

    Optional<CommentModel> addComment(String description, Long id);

}
