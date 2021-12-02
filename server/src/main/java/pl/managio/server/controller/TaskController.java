package pl.managio.server.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.managio.server.domain.Task;
import pl.managio.server.dto.request.TaskDataRequest;
import pl.managio.server.dto.response.ConfigResponse;
import pl.managio.server.dto.response.ResultResponse;
import pl.managio.server.service.task.TaskService;

import javax.validation.Valid;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/app/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping("/create")
    public ResponseEntity<ResultResponse> createTask(@Valid @RequestBody TaskDataRequest request) {
        Optional<Task> task = taskService.createTask(request);
        return new ResponseEntity<>(new ResultResponse(task.isPresent()),
                task.isPresent() ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);
    }

    @GetMapping("/config")
    public ResponseEntity<ConfigResponse> getConfig() {
        ConfigResponse config = taskService.getConfig();
        return new ResponseEntity<>(config, HttpStatus.OK);
    }

}
