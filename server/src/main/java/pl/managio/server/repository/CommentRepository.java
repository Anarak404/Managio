package pl.managio.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.managio.server.domain.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
}
