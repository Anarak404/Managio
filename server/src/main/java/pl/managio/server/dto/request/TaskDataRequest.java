package pl.managio.server.dto.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import pl.managio.server.model.LabelModel;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TaskDataRequest {

    @NotBlank
    String title;

    @NotBlank
    String description;

    long userId;

    long teamId;

    String priority;

    List<LabelModel> labels;

}
