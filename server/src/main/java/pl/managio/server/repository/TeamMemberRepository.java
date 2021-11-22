package pl.managio.server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.managio.server.domain.Team;
import pl.managio.server.domain.TeamMember;
import pl.managio.server.domain.TeamMemberKey;
import pl.managio.server.domain.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamMemberRepository extends CrudRepository<TeamMember, TeamMemberKey> {

    List<TeamMember> findAllByTeam(Team team);

    Optional<TeamMember> findByTeamAndUser(Team team, User user);

}
