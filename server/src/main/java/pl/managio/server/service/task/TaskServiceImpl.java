package pl.managio.server.service.task;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.managio.server.domain.Task;
import pl.managio.server.domain.User;
import pl.managio.server.dto.request.TaskDataRequest;
import pl.managio.server.dto.response.ConfigResponse;
import pl.managio.server.model.LabelModel;
import pl.managio.server.model.Priority;
import pl.managio.server.repository.LabelRepository;
import pl.managio.server.repository.TaskRepository;
import pl.managio.server.repository.TeamRepository;
import pl.managio.server.repository.UserRepository;
import pl.managio.server.service.authentication.AuthenticationService;

import java.util.Arrays;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TeamRepository teamRepository;
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final LabelRepository labelRepository;
    private final AuthenticationService authenticationService;

//    TODO: add labels to task
    @Override
    public Optional<Task> createTask(TaskDataRequest data) {
        var team = teamRepository.findById(data.getTeamId());
        var user = userRepository.findById(data.getUserId());
        if (team.isEmpty() || user.isEmpty()) {
            return Optional.empty();
        }

        User reporter = authenticationService.getCurrentUser();
        Task task = new Task(data.getTitle(), data.getDescription(), team.get(), user.get(), reporter);
        task.setPriority(data.getPriority() == null ? Priority.MEDIUM : Priority.valueOf(data.getPriority()));

        try {
            taskRepository.save(task);
            return Optional.of(task);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @Override
    public ConfigResponse getConfig() {
        var iterable = labelRepository.findAll();

       var labels = StreamSupport.stream(iterable.spliterator(), false)
                .map(LabelModel::new)
                .collect(Collectors.toSet());

        Set<String> priorities = Arrays.stream(Priority.values())
                .map(Enum::toString)
                .collect(Collectors.toSet());

        return new ConfigResponse(labels, priorities);
    }

}
