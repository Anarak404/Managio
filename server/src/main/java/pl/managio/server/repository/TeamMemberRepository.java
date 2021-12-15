package pl.managio.server.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.managio.server.domain.Team;
import pl.managio.server.domain.TeamMember;
import pl.managio.server.domain.TeamMemberKey;
import pl.managio.server.domain.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamMemberRepository extends CrudRepository<TeamMember, TeamMemberKey> {

    Optional<TeamMember> findByTeamAndUser(Team team, User user);

    @Query("select t from team_member t join fetch t.user where t.team.id = :teamId")
    List<TeamMember> getUsersFromTeam(@Param("teamId") Long teamId);

}
