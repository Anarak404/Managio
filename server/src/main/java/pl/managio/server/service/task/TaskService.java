package pl.managio.server.service.task;

import pl.managio.server.domain.Task;
import pl.managio.server.dto.request.TaskDataRequest;
import pl.managio.server.dto.response.ConfigResponse;

import java.util.Optional;

public interface TaskService {

    Optional<Task> createTask(TaskDataRequest data);

    ConfigResponse getConfig();

}
