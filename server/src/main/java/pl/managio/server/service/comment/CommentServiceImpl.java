package pl.managio.server.service.comment;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pl.managio.server.domain.Comment;
import pl.managio.server.domain.User;
import pl.managio.server.model.CommentModel;
import pl.managio.server.repository.CommentRepository;
import pl.managio.server.repository.TaskRepository;
import pl.managio.server.service.authentication.AuthenticationService;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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

    @Override
    public Map<String, Object> getAllComments(long id, int page, int size) {
        var task = taskRepository.findById(id);
        if (task.isEmpty()) {
            return Collections.emptyMap();
        }

        try {
            Pageable paging = PageRequest.of(page, size);
            Page<Comment> pageComments = commentRepository.getCommentsForTask(task.get(), paging);
            List<CommentModel> comments = pageComments.getContent().stream()
                    .map(CommentModel::new)
                    .collect(Collectors.toList());

            Map<String, Object> result = new HashMap<>();
            result.put("comments", comments);
            result.put("currentPage", pageComments.getNumber());
            result.put("totalItems", pageComments.getTotalElements());
            result.put("totalPages", pageComments.getTotalPages());

            return result;
        } catch (Exception e) {
            return Collections.emptyMap();
        }
    }

}
