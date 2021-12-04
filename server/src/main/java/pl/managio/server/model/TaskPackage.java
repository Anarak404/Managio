package pl.managio.server.model;

import lombok.Value;
import pl.managio.server.domain.Task;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Value
public class TaskPackage {

    Set<TaskModel> todoTasks = new HashSet<>();
    Set<TaskModel> inProgressTasks = new HashSet<>();
    Set<TaskModel> doneTasks = new HashSet<>();

    public TaskPackage(List<Task> tasks) {
        tasks.forEach(task -> {
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
