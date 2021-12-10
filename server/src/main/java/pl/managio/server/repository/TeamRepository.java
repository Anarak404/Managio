package pl.managio.server.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.managio.server.domain.Team;
import pl.managio.server.domain.User;

import java.util.Set;

@Repository
public interface TeamRepository extends CrudRepository<Team, Long> {

    @Query("select t from team t join fetch t.users u join fetch t.owner where u.user = :user")
    Set<Team> getTeamsForUser(@Param("user") User user);

    @Query("select t.id from team t join t.users u where u.user = :user")
    Set<Long> getTeamsIdForUser(@Param("user") User user);

}
