package pl.managio.server.service.task;

import pl.managio.server.domain.Task;
import pl.managio.server.dto.request.TaskDataRequest;
import pl.managio.server.dto.response.ConfigResponse;
import pl.managio.server.model.TaskPackage;

import java.util.Optional;

public interface TaskService {

    Optional<Task> createTask(TaskDataRequest data);

    TaskPackage getTasksAssignedToUser();

    boolean changeTaskStatus(long id, String newStatus);

    ConfigResponse getConfig();

}
