package pl.managio.server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.managio.server.domain.TaskLabel;

@Repository
public interface TaskLabelRepository extends CrudRepository<TaskLabel, Long> {
}
