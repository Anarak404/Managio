package pl.managio.server.model;

import lombok.EqualsAndHashCode;
import lombok.Value;
import pl.managio.server.domain.Team;

import java.util.Set;
import java.util.stream.Collectors;

@EqualsAndHashCode(callSuper = true)
@Value
public class TeamDetailsModel extends TeamModel {

    Set<UserModel> teamMembers;
    TaskPackage tasks;

    public TeamDetailsModel(Team team) {
        super(team);
        this.teamMembers = team.getUsers().stream()
                .filter(teamMember -> !teamMember.isDeleted())
                .map(u -> new UserModel(u.getUser()))
                .collect(Collectors.toSet());
        this.tasks = new TaskPackage(team.getTasks());
    }

}
