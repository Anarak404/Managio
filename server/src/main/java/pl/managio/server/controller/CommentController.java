package pl.managio.server.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.managio.server.dto.request.CreateCommentRequest;
import pl.managio.server.model.CommentModel;
import pl.managio.server.service.comment.CommentService;

import java.util.Map;
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

    @GetMapping("/{id}/all")
    public ResponseEntity<Map<String, Object>> getAllComments(@PathVariable Long id,
                                                              @RequestParam(defaultValue = "0") int page,
                                                              @RequestParam(defaultValue = "5") int size) {
        var comments = commentService.getAllComments(id, page, size);
        return new ResponseEntity<>(comments, comments.isEmpty() ? HttpStatus.NOT_FOUND : HttpStatus.OK);
    }

}
