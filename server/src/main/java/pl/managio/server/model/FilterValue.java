package pl.managio.server.model;

import lombok.Value;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Value
public class FilterValue {

    @NotNull
    AcceptedFields field;

    @NotBlank
    String value;

    @NotNull
    AllowedOperators operator;

}
