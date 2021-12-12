package pl.managio.server.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.managio.server.domain.Comment;
import pl.managio.server.domain.Task;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("select c from comment c where c.task = :task order by c.creationDateTime desc")
    Page<Comment> getCommentsForTask(@Param("task") Task task, Pageable pageable);

}
