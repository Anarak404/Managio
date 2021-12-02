package pl.managio.server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.managio.server.domain.Label;

@Repository
public interface LabelRepository extends CrudRepository<Label, Long> {
}
