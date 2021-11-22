package pl.managio.server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.managio.server.domain.Team;

@Repository
public interface TeamRepository extends CrudRepository<Team, Long> {
}
