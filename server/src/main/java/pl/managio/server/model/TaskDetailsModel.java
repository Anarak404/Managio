package pl.managio.server.model;

import lombok.EqualsAndHashCode;
import lombok.Value;
import pl.managio.server.domain.Task;

@EqualsAndHashCode(callSuper = true)
@Value
public class TaskDetailsModel extends TaskModel {

    String description;
    UserModel reporter;
    TeamModel assignedTeam;

    public TaskDetailsModel(Task task) {
        super(task);
        this.description = task.getDescription();
        this.reporter = new UserModel(task.getReporter());
        this.assignedTeam = new TeamModel(task.getTeam());
    }

}
