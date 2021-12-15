package pl.managio.server.service.task;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.managio.server.domain.Attachment;
import pl.managio.server.domain.Label;
import pl.managio.server.domain.Task;
import pl.managio.server.domain.TaskLabel;
import pl.managio.server.domain.User;
import pl.managio.server.dto.request.SearchTaskRequest;
import pl.managio.server.dto.request.TaskDataRequest;
import pl.managio.server.dto.response.ConfigResponse;
import pl.managio.server.model.FilterValue;
import pl.managio.server.model.LabelModel;
import pl.managio.server.model.Priority;
import pl.managio.server.model.TaskDetailsModel;
import pl.managio.server.model.TaskModel;
import pl.managio.server.model.TaskPackage;
import pl.managio.server.model.TaskStatus;
import pl.managio.server.repository.AttachmentRepository;
import pl.managio.server.repository.LabelRepository;
import pl.managio.server.repository.TaskRepository;
import pl.managio.server.repository.TeamRepository;
import pl.managio.server.repository.UserRepository;
import pl.managio.server.service.authentication.AuthenticationService;
import pl.managio.server.service.file.FileService;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static pl.managio.server.controller.FileController.UPLOAD_ATTACHMENTS_DIR;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TeamRepository teamRepository;
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final LabelRepository labelRepository;
    private final AttachmentRepository attachmentRepository;
    private final FileService fileService;
    private final AuthenticationService authenticationService;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<TaskModel> createTask(TaskDataRequest data) {
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
            addLabelsToTask(task, data.getLabels());
            return Optional.of(new TaskModel(task));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @Override
    public Optional<TaskDetailsModel> getTask(long id) {
        return taskRepository.findById(id).map(TaskDetailsModel::new);
    }

    @Override
    public TaskPackage getTasksAssignedToUser() {
        User user = authenticationService.getCurrentUser();
        return new TaskPackage(taskRepository.getTasksForUser(user));
    }

    @Override
    public Map<String, Object> getSearchResults(SearchTaskRequest data, int page, int size) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Task> criteriaQuery = criteriaBuilder.createQuery(Task.class);
        Root<Task> root = criteriaQuery.from(Task.class);
        root.fetch("taskLabels", JoinType.LEFT);
        root.fetch("user", JoinType.LEFT);

        List<Predicate> userPredicates = getUserPredicate(criteriaBuilder, root);
        List<Predicate> taskPredicates = new ArrayList<>();

        data.getFilters().forEach((f) -> taskPredicates.add(createPredicate(criteriaBuilder, root, f)));

        Predicate taskPredicate = criteriaBuilder.and(taskPredicates.toArray(new Predicate[]{}));
        Predicate userPredicate = criteriaBuilder.or(userPredicates.toArray(new Predicate[]{}));
        var finalPredicate = criteriaBuilder.and(taskPredicate, userPredicate);

        criteriaQuery.where(finalPredicate);

        var allTasks = entityManager.createQuery(criteriaQuery);

        Pageable paging = PageRequest.of(page, size);
        allTasks.setFirstResult(paging.getPageNumber() * paging.getPageSize());
        allTasks.setMaxResults(paging.getPageSize());

        CriteriaQuery<Long> cq = criteriaBuilder.createQuery(Long.class);
        cq.select(criteriaBuilder.count(cq.from(Task.class)));
        entityManager.createQuery(cq);
        cq.where(finalPredicate);
        Long count = entityManager.createQuery(cq).getSingleResult();

        Page<Task> pageTasks = new PageImpl<>(allTasks.getResultList(), paging, count);

        return mapToPageResponse(pageTasks);
    }

    @Override
    public Map<String, Object> getTasksVisibleForUser(int page, int size) {
        User user = authenticationService.getCurrentUser();
        Set<Long> teamIds = teamRepository.getTeamsIdForUser(user);
        try {
            Pageable paging = PageRequest.of(page, size);
            Page<Task> pageTasks = taskRepository.getTasksVisibleForUser(user, teamIds, paging);
            return mapToPageResponse(pageTasks);
        } catch (Exception e) {
            return Collections.emptyMap();
        }
    }

    @Override
    public boolean changeTaskStatus(long id, String newStatus) {
        User user = authenticationService.getCurrentUser();
        var task = taskRepository.findById(id);
        if (task.isEmpty() || !canModify(task.get(), user)) {
            return false;
        }
        Task t = task.get();
        t.setStatus(TaskStatus.valueOf(newStatus));
        try {
            taskRepository.save(t);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Optional<TaskDetailsModel> editTask(long id, TaskDataRequest data) {
        User me = authenticationService.getCurrentUser();
        var task = taskRepository.findById(id);
        if (task.isEmpty() || !isReporter(task.get(), me)) {
            return Optional.empty();
        }

        Task t = task.get();
        var team = teamRepository.findById(data.getTeamId());
        var assignedUser = userRepository.findById(data.getUserId());

        if (team.isEmpty() || assignedUser.isEmpty()) {
            return Optional.empty();
        }

        try {
            t.setTitle(data.getTitle());
            t.setDescription(data.getDescription());
            t.setTeam(team.get());
            t.setUser(assignedUser.get());
            t.setPriority(Priority.valueOf(data.getPriority()));
            taskRepository.save(t);
            addLabelsToTask(t, data.getLabels());
            return Optional.of(new TaskDetailsModel(t));
        } catch (IllegalArgumentException e) {
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

    @Override
    public void addAttachments(long id, MultipartFile[] files) {
        var task = taskRepository.findById(id);
        if (task.isEmpty()) {
            return;
        }
        Task t = task.get();
        Arrays.asList(files).forEach(file -> {
            if (file == null) {
                return;
            }
            var path = fileService.saveFile(file, UPLOAD_ATTACHMENTS_DIR);
            Attachment attachment = new Attachment(t, path, file.getOriginalFilename());
            try {
                attachmentRepository.save(attachment);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    private boolean canModify(Task task, User user) {
        return task.getUser().getId().equals(user.getId()) || isReporter(task, user);
    }

    private boolean isReporter(Task task, User user) {
        return task.getReporter().getId().equals(user.getId());
    }

    private void addLabelsToTask(Task task, List<LabelModel> labels) {
        var x = labels.stream().map(l -> {
            Label label;
            if (l.isExist()) {
                label = labelRepository.getLabelByName(l.getLabel());
            } else {
                label = new Label(l.getLabel());
                labelRepository.save(label);
            }
            return new TaskLabel(task, label);
        }).collect(Collectors.toList());

        task.setTaskLabels(x);
        taskRepository.save(task);
    }

    private Map<String, Object> mapToPageResponse(Page<Task> pageTasks) {
        Map<String, Object> result = new HashMap<>();
        result.put("tasks", pageTasks.getContent().stream()
                .map(TaskModel::new)
                .collect(Collectors.toList()));
        result.put("currentPage", pageTasks.getNumber());
        result.put("totalItems", pageTasks.getTotalElements());
        result.put("totalPages", pageTasks.getTotalPages());

        return result;
    }

    private List<Predicate> getUserPredicate(CriteriaBuilder criteriaBuilder, Root<Task> root) {
        User u = authenticationService.getCurrentUser();
        Set<Long> teamIds = teamRepository.getTeamsIdForUser(u);

        List<Predicate> predicates = new ArrayList<>();
        predicates.add(criteriaBuilder.and(root.get("team").get("id").in(teamIds)));
        predicates.add(criteriaBuilder.equal(root.get("user").get("id").as(Long.class), u.getId()));
        predicates.add(criteriaBuilder.equal(root.get("reporter").get("id").as(Long.class), u.getId()));

        return predicates;
    }

    private Predicate createPredicate(CriteriaBuilder criteriaBuilder, Root<Task> root, FilterValue filterValue) {
        switch (filterValue.getField()) {
            case TITLE:
                switch (filterValue.getOperator()) {
                    case EQ:
                        return criteriaBuilder.like(criteriaBuilder.lower(root.get("title")),
                                "%" + filterValue.getValue().toLowerCase() + "%");
                    case NOT_EQ:
                        return criteriaBuilder.not(criteriaBuilder.like(criteriaBuilder.lower(root.get("title")),
                                "%" + filterValue.getValue().toLowerCase() + "%"));
                    default:
                        return null;
                }

            case PRIORITY:
                switch (filterValue.getOperator()) {
                    case EQ:
                        return criteriaBuilder.equal(root.<Priority>get("priority"),
                                Priority.valueOf(filterValue.getValue()));
                    case NOT_EQ:
                        return criteriaBuilder.notEqual(root.<Priority>get("priority"),
                                Priority.valueOf(filterValue.getValue()));
                    default:
                        return null;
                }

            case STATUS:
                switch (filterValue.getOperator()) {
                    case EQ:
                        return criteriaBuilder.equal(root.<TaskStatus>get("status"),
                                TaskStatus.valueOf(filterValue.getValue()));
                    case NOT_EQ:
                        return criteriaBuilder.notEqual(root.<TaskStatus>get("status"),
                                TaskStatus.valueOf(filterValue.getValue()));
                    default:
                        return null;
                }
        }
        return null;
    }

}
