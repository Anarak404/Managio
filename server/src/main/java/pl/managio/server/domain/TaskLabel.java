package pl.managio.server.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

@Getter
@Setter
@Entity(name = "task_label")
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TaskLabel {

    @EmbeddedId
    TaskLabelKey id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("task")
    @JoinColumn(name = "task_id")
    Task task;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("label")
    @JoinColumn(name = "label_id")
    Label label;

    public TaskLabel(Task task, Label label) {
        this.task = task;
        this.label = label;
    }

}
