package pl.managio.server.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import pl.managio.server.dto.request.NameRequest;
import pl.managio.server.dto.request.PasswordRequest;
import pl.managio.server.dto.response.ResultResponse;
import pl.managio.server.model.UserModel;
import pl.managio.server.service.profile.ProfileService;

import javax.validation.Valid;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/app/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @PutMapping("/name")
    public ResponseEntity<UserModel> changeName(@Valid @RequestBody NameRequest req) {
        var response = profileService.changeName(req.getName());
        return response.map(r -> new ResponseEntity<>(r, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.FORBIDDEN));
    }

    @PutMapping("/photo")
    public ResponseEntity<UserModel> changePhoto(@RequestParam(value = "photo", required = false) MultipartFile file) {
        var response = profileService.changePhoto(file);
        return response.map(r -> new ResponseEntity<>(r, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.FORBIDDEN));
    }

    @PutMapping("/password")
    public ResponseEntity<ResultResponse> changePassword(@Valid @RequestBody PasswordRequest req) {
        var result = profileService.changePassword(req.getCurrentPassword(), req.getNewPassword());
        return new ResponseEntity<>(new ResultResponse(result), result ? HttpStatus.OK : HttpStatus.CONFLICT);
    }

}
