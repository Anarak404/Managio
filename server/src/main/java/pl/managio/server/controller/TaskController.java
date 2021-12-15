package pl.managio.server.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import pl.managio.server.dto.request.NameRequest;
import pl.managio.server.dto.request.SearchTaskRequest;
import pl.managio.server.dto.request.TaskDataRequest;
import pl.managio.server.dto.response.ConfigResponse;
import pl.managio.server.dto.response.ResultResponse;
import pl.managio.server.model.TaskDetailsModel;
import pl.managio.server.model.TaskModel;
import pl.managio.server.model.TaskPackage;
import pl.managio.server.service.task.TaskService;

import javax.validation.Valid;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/app/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public ResponseEntity<TaskPackage> getTasksAssignedToUser() {
        return new ResponseEntity<>(taskService.getTasksAssignedToUser(), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<TaskModel> createTask(@Valid @RequestBody TaskDataRequest request) {
        Optional<TaskModel> task = taskService.createTask(request);
        return task.map(t -> new ResponseEntity<>(t, HttpStatus.CREATED))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.FORBIDDEN));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDetailsModel> getTask(@PathVariable Long id) {
        Optional<TaskDetailsModel> task = taskService.getTask(id);
        return task.map(t -> new ResponseEntity<>(t, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/filter")
    public ResponseEntity<Map<String, Object>> getFilteredTasks(@RequestParam(defaultValue = "0") int page,
                                                                @RequestParam(defaultValue = "15") int size,
                                                                @Valid @RequestBody SearchTaskRequest req) {
        var tasks = taskService.getSearchResults(req, page, size);
        return new ResponseEntity<>(tasks, tasks.isEmpty() ? HttpStatus.NOT_FOUND : HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAllTasks(@RequestParam(defaultValue = "0") int page,
                                                           @RequestParam(defaultValue = "15") int size) {
        var tasks = taskService.getTasksVisibleForUser(page, size);
        return new ResponseEntity<>(tasks, tasks.isEmpty() ? HttpStatus.NOT_FOUND : HttpStatus.OK);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ResultResponse> changeTaskStatus(@PathVariable Long id, @RequestBody NameRequest req) {
        boolean result = taskService.changeTaskStatus(id, req.getName());
        return new ResponseEntity<>(new ResultResponse(result), result ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    }

    @PutMapping("/{id}/edit")
    public ResponseEntity<TaskDetailsModel> editTask(@PathVariable Long id, @RequestBody TaskDataRequest req) {
        var task = taskService.editTask(id, req);
        return task.map(t -> new ResponseEntity<>(t, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.FORBIDDEN));
    }

    @GetMapping("/config")
    public ResponseEntity<ConfigResponse> getConfig() {
        ConfigResponse config = taskService.getConfig();
        return new ResponseEntity<>(config, HttpStatus.OK);
    }

    @PostMapping("/{id}/attachments")
    public ResponseEntity<ResultResponse> saveAttachments(@PathVariable Long id,
                                                          @RequestParam(value = "files", required = false) MultipartFile[] files) {
        taskService.addAttachments(id, files);
        return new ResponseEntity<>(new ResultResponse(true), HttpStatus.OK);
    }

}
