package pl.managio.server.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import pl.managio.server.dto.request.TeamMembersRequest;
import pl.managio.server.dto.response.ResultResponse;
import pl.managio.server.model.TeamDetailsModel;
import pl.managio.server.model.TeamModel;
import pl.managio.server.model.UserModel;
import pl.managio.server.service.team.TeamService;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/app/teams")
@RequiredArgsConstructor
public class TeamController {

    private final TeamService teamService;

    @GetMapping("/getTeams")
    public ResponseEntity<List<TeamModel>> getTeams() {
        return new ResponseEntity<>(teamService.getTeams(), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<TeamModel> createTeam(@RequestParam(value = "name") String name,
                                                @RequestParam(value = "photo", required = false) MultipartFile file) {
        Optional<TeamModel> team = teamService.createTeam(name, file);
        return team.map(t -> new ResponseEntity<>(t, HttpStatus.CREATED))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.FORBIDDEN));
    }

    //    TODO: add tasks (related to team) to response
    @GetMapping("/{id}")
    public ResponseEntity<TeamDetailsModel> getTeam(@PathVariable Long id) {
        Optional<TeamDetailsModel> team = teamService.getTeam(id);
        return team.map(t -> new ResponseEntity<>(t, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResultResponse> deleteTeam(@PathVariable Long id) {
        boolean result = teamService.deleteTeam(id);
        return new ResponseEntity<>(new ResultResponse(result),
                result ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    }

    @GetMapping("/{id}/members")
    public ResponseEntity<List<UserModel>> getMembers(@PathVariable Long id) {
        List<UserModel> members = teamService.getMembers(id);
        return new ResponseEntity<>(members, HttpStatus.OK);
    }

    @PostMapping("/{id}/members")
    public ResponseEntity<TeamDetailsModel> addMembers(@PathVariable Long id, @Valid @RequestBody TeamMembersRequest request) {
        Set<String> emails = request.getEmails();

        Optional<TeamDetailsModel> team = teamService.addMembers(id, emails);
        return team.map(t -> new ResponseEntity<>(t, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.FORBIDDEN));
    }

    @GetMapping("/{teamId}/members/{userId}")
    public ResponseEntity<ResultResponse> deleteMember(@PathVariable Long teamId, @PathVariable Long userId) {
        boolean result = teamService.deleteMember(teamId, userId);
        return new ResponseEntity<>(new ResultResponse(result),
                result ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    }

    @PutMapping(value = "/{id}/update")
    public ResponseEntity<TeamModel> updateTeam(@RequestParam(value = "name") String name,
                                                @PathVariable Long id,
                                                @RequestParam(value = "photo", required = false) MultipartFile file) {
        Optional<TeamModel> team = teamService.updateTeam(id, name, file);
        return team.map(t -> new ResponseEntity<>(t, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.FORBIDDEN));
    }

}
