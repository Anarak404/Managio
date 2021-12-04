package pl.managio.server.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.managio.server.domain.Task;
import pl.managio.server.domain.User;

import java.util.List;

@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {

    @Query("select t from task t where t.user = :user")
    List<Task> getTasksForUser(@Param("user") User user);

}
