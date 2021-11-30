package pl.managio.server.dto.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.Set;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TeamMembersRequest {

    @NotEmpty
    Set<@NotBlank String> emails;

}
