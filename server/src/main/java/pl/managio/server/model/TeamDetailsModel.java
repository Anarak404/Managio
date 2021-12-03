package pl.managio.server.model;

import lombok.EqualsAndHashCode;
import lombok.Value;
import pl.managio.server.domain.Team;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@EqualsAndHashCode(callSuper = true)
@Value
public class TeamDetailsModel extends TeamModel {

    List<UserModel> teamMembers;
    Set<TaskModel> todoTasks = new HashSet<>();
    Set<TaskModel> inProgressTasks = new HashSet<>();
    Set<TaskModel> doneTasks = new HashSet<>();

    public TeamDetailsModel(Team team) {
        super(team);
        this.teamMembers = team.getUsers().stream()
                .filter(teamMember -> !teamMember.isDeleted())
                .map(u -> new UserModel(u.getUser()))
                .collect(Collectors.toList());
        team.getTasks().forEach(task -> {
            if (task.getStatus() == TaskStatus.TO_DO) {
                todoTasks.add(new TaskModel(task));
            } else if (task.getStatus() == TaskStatus.IN_PROGRESS) {
                inProgressTasks.add(new TaskModel(task));
            } else {
                doneTasks.add(new TaskModel(task));
            }
        });
    }

}
