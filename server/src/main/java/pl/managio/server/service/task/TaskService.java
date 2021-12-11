package pl.managio.server.service.task;

import pl.managio.server.domain.Task;
import pl.managio.server.dto.request.SearchTaskRequest;
import pl.managio.server.dto.request.TaskDataRequest;
import pl.managio.server.dto.response.ConfigResponse;
import pl.managio.server.model.TaskDetailsModel;
import pl.managio.server.model.TaskPackage;

import java.util.Map;
import java.util.Optional;

public interface TaskService {

    Optional<Task> createTask(TaskDataRequest data);

    Optional<TaskDetailsModel> getTask(long id);

    TaskPackage getTasksAssignedToUser();

    Map<String, Object> getSearchResults(SearchTaskRequest data, int page, int size);

    Map<String, Object> getTasksVisibleForUser(int page, int size);

    boolean changeTaskStatus(long id, String newStatus);

    ConfigResponse getConfig();

}
