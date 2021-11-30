package pl.managio.server.service.team;

import org.springframework.web.multipart.MultipartFile;
import pl.managio.server.domain.User;
import pl.managio.server.model.TeamDetailsModel;
import pl.managio.server.model.TeamModel;
import pl.managio.server.model.UserModel;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface TeamService {

    Optional<TeamModel> createTeam(String name, MultipartFile photo);

    Optional<TeamModel> createTeam(String name, String photo, List<User> users);

    boolean deleteTeam(Long id);

    Optional<TeamDetailsModel> addMembers(Long id, Set<String> ids);

    List<UserModel> getMembers(Long id);

    boolean deleteMember(Long teamId, Long userId);

    List<TeamModel> getTeams();

    Optional<TeamDetailsModel> getTeam(Long id);

    Optional<TeamModel> updateTeam(Long id, String name, MultipartFile photo);

}
