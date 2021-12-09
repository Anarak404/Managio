package pl.managio.server.service.comment;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.managio.server.domain.Comment;
import pl.managio.server.domain.User;
import pl.managio.server.model.CommentModel;
import pl.managio.server.repository.CommentRepository;
import pl.managio.server.repository.TaskRepository;
import pl.managio.server.service.authentication.AuthenticationService;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final AuthenticationService authenticationService;
    private final CommentRepository commentRepository;
    private final TaskRepository taskRepository;

    @Override
    public Optional<CommentModel> addComment(String description, Long id) {
        User user = authenticationService.getCurrentUser();
        var task = taskRepository.findById(id);
        if (task.isEmpty()) {
            return Optional.empty();
        }

        Comment comment = new Comment(description, user, task.get());
        try {
            commentRepository.save(comment);
            return Optional.of(new CommentModel(comment));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

}
