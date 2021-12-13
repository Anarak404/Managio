package pl.managio.server.dto.request;

import lombok.Value;

import javax.validation.constraints.NotBlank;

@Value
public class PasswordRequest {

    @NotBlank
    String currentPassword;

    @NotBlank
    String newPassword;

}
