package pl.managio.server.model;

import lombok.Data;
import pl.managio.server.domain.Task;

import java.util.Set;
import java.util.stream.Collectors;

@Data
public class TaskModel {

    long id;
    String title;
    String priority;
    String status;
    Set<LabelModel> labels;
    UserModel assignedUser;

    public TaskModel(Task task) {
        this.id = task.getId();
        this.title = task.getTitle();
        this.priority = task.getPriority().name();
        this.status = task.getStatus().name();
        this.labels = task.getTaskLabels().stream()
                .map(l -> new LabelModel(l.getLabel()))
                .collect(Collectors.toSet());
        this.assignedUser = new UserModel(task.getUser());
    }

}
