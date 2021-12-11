package pl.managio.server.dto.request;

import lombok.Data;
import pl.managio.server.model.FilterValue;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@Data
public class SearchTaskRequest {

    @NotEmpty
    List<@Valid FilterValue> filters;

}
