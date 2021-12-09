package pl.managio.server.service.comment;

import pl.managio.server.model.CommentModel;

import java.util.Map;
import java.util.Optional;

public interface CommentService {

    Optional<CommentModel> addComment(String description, Long id);

    Map<String, Object> getAllComments(long id, int page, int size);

}
