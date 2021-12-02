package pl.managio.server.dto.response;

import lombok.Value;
import pl.managio.server.model.LabelModel;

import java.util.Set;

@Value
public class ConfigResponse {

    Set<LabelModel> labels;
    Set<String> priorities;

}
