package pl.managio.server.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.managio.server.domain.Task;
import pl.managio.server.domain.User;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query("select t from task t where t.user = :user")
    List<Task> getTasksForUser(@Param("user") User user);

    @Query(value = "select t from task t left join fetch t.taskLabels left join fetch t.user where t.user = :user or t.reporter = :user or t.team.id in (:teamsId)",
            countQuery = "select count(t) from task t left join t.taskLabels left join t.user where t.user = :user or t.reporter = :user or t.team.id in (:teamsId)")
    Page<Task> getTasksVisibleForUser(@Param("user") User user, @Param("teamsId") List<Long> teamsId, Pageable pageable);

}
