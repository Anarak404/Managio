package pl.managio.server.service.task;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
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
import pl.managio.server.repository.LabelRepository;
import pl.managio.server.repository.TaskLabelRepository;
import pl.managio.server.repository.TaskRepository;
import pl.managio.server.repository.TeamRepository;
import pl.managio.server.repository.UserRepository;
import pl.managio.server.service.authentication.AuthenticationService;

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

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TeamRepository teamRepository;
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final LabelRepository labelRepository;
    private final TaskLabelRepository taskLabelRepository;
    private final AuthenticationService authenticationService;

    @PersistenceContext
    private EntityManager entityManager;

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
            addLabelsToTask(task, data.getLabels());
            return Optional.of(task);
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

    private boolean canModify(Task task, User user) {
        return task.getUser().getId().equals(user.getId()) || task.getReporter().getId().equals(user.getId());
    }

    private void addLabelsToTask(Task task, List<LabelModel> labels) {
        labels.forEach(l -> {
            Label label;
            if (l.isExist()) {
                label = labelRepository.getLabelByName(l.getLabel());
            } else {
                label = new Label(l.getLabel());
                labelRepository.save(label);
            }
            TaskLabel taskLabel = new TaskLabel(task, label);
            taskLabelRepository.save(taskLabel);
        });
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
                        return criteriaBuilder.like(root.get("title"),
                                "%" + filterValue.getValue() + "%");
                    case NOT_EQ:
                        return criteriaBuilder.not(criteriaBuilder.like(root.get("title"),
                                "%" + filterValue.getValue() + "%"));
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
