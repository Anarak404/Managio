package pl.managio.server.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.managio.server.dto.request.CreateCommentRequest;
import pl.managio.server.model.CommentModel;
import pl.managio.server.service.comment.CommentService;

import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/app/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/{id}/create")
    public ResponseEntity<CommentModel> addComment(@PathVariable Long id, @RequestBody CreateCommentRequest req) {
        Optional<CommentModel> comment = commentService.addComment(req.getDescription(), id);
        return comment.map(c -> new ResponseEntity<>(c, HttpStatus.CREATED))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.FORBIDDEN));
    }

}
