package pl.managio.server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.managio.server.domain.Task;

@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {
}
