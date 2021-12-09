package pl.managio.server.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import pl.managio.server.model.Priority;
import pl.managio.server.model.TaskStatus;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.List;

@Getter
@Setter
@Entity(name = "task")
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false)
    String title;

    @Column(nullable = false, columnDefinition = "text")
    String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    Priority priority;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    TaskStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_person_id", nullable = false)
    User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", nullable = false)
    Team team;

    @OneToMany(mappedBy = "task")
    List<Attachment> attachments;

    @OneToMany(mappedBy = "task")
    List<TaskLabel> taskLabels;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reporter_id", nullable = false)
    User reporter;

    @OneToMany(mappedBy = "task")
    List<Comment> comment;

    public Task(String title, String description, Team team, User user, User reporter) {
        this.title = title;
        this.description = description;
        this.priority = Priority.MEDIUM;
        this.status = TaskStatus.TO_DO;
        this.team = team;
        this.user = user;
        this.reporter = reporter;
    }

}
