package pl.managio.server.service.task;

import org.springframework.web.multipart.MultipartFile;
import pl.managio.server.dto.request.SearchTaskRequest;
import pl.managio.server.dto.request.TaskDataRequest;
import pl.managio.server.dto.response.ConfigResponse;
import pl.managio.server.model.TaskDetailsModel;
import pl.managio.server.model.TaskModel;
import pl.managio.server.model.TaskPackage;

import java.util.Map;
import java.util.Optional;

public interface TaskService {

    Optional<TaskModel> createTask(TaskDataRequest data);

    Optional<TaskDetailsModel> getTask(long id);

    TaskPackage getTasksAssignedToUser();

    Map<String, Object> getSearchResults(SearchTaskRequest data, int page, int size);

    Map<String, Object> getTasksVisibleForUser(int page, int size);

    boolean changeTaskStatus(long id, String newStatus);

    ConfigResponse getConfig();

    void addAttachments(long id, MultipartFile[] files);

}
